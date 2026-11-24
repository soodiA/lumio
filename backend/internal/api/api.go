// Package api wires the HTTP routes of the Lumio backend.
package api

import (
	"crypto/subtle"
	"net/http"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/soodia/lumio/backend/internal/config"
	"github.com/soodia/lumio/backend/internal/httpx"
)

type Server struct {
	DB  *pgxpool.Pool
	Cfg config.Config
}

func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		if err := s.DB.Ping(r.Context()); err != nil {
			httpx.Error(w, http.StatusServiceUnavailable, "DB_DOWN", "database unreachable")
			return
		}
		httpx.JSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	// public content
	mux.HandleFunc("GET /api/v1/questions", s.listQuestions)

	// accounts
	mux.HandleFunc("POST /api/v1/auth/register", s.register)
	mux.HandleFunc("POST /api/v1/auth/login", s.login)
	mux.HandleFunc("GET /api/v1/me", s.authed(s.getMe))
	mux.HandleFunc("POST /api/v1/me/scores", s.authed(s.saveScore))
	mux.HandleFunc("GET /api/v1/me/follows", s.authed(s.listFollows))
	mux.HandleFunc("PUT /api/v1/me/follows/{id}", s.authed(s.follow))
	mux.HandleFunc("DELETE /api/v1/me/follows/{id}", s.authed(s.unfollow))
	mux.HandleFunc("GET /api/v1/profiles", s.authed(s.searchProfiles))
	mux.HandleFunc("GET /api/v1/leaderboard", s.leaderboard)

	// admin (X-Admin-Key)
	a := s.admin
	mux.HandleFunc("GET /api/v1/admin/questions", a(s.adminList))
	mux.HandleFunc("GET /api/v1/admin/questions/{id}", a(s.adminGet))
	mux.HandleFunc("POST /api/v1/admin/questions", a(s.adminCreate))
	mux.HandleFunc("PUT /api/v1/admin/questions/{id}", a(s.adminUpdate))
	mux.HandleFunc("DELETE /api/v1/admin/questions/{id}", a(s.adminDelete))

	return s.cors(mux)
}

func (s *Server) admin(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if subtle.ConstantTimeCompare([]byte(r.Header.Get("X-Admin-Key")), []byte(s.Cfg.AdminKey)) != 1 {
			httpx.Error(w, http.StatusForbidden, "FORBIDDEN", "bad admin key")
			return
		}
		next(w, r)
	}
}

func (s *Server) cors(next http.Handler) http.Handler {
	allowed := map[string]bool{}
	for _, o := range strings.Split(s.Cfg.CORSOrigins, ",") {
		if o = strings.TrimSpace(o); o != "" {
			allowed[o] = true
		}
	}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if o := r.Header.Get("Origin"); o != "" && allowed[o] {
			h := w.Header()
			h.Set("Access-Control-Allow-Origin", o)
			h.Set("Vary", "Origin")
			h.Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Key")
			h.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}
