package api

import (
	"errors"
	"net/http"
	"regexp"
	"strings"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/crypto/bcrypt"

	"github.com/soodia/lumio/backend/internal/httpx"
)

var usernameRe = regexp.MustCompile(`^[A-Za-z0-9_]{3,20}$`)

type authReq struct {
	Username    string `json:"username"`
	Password    string `json:"password"`
	Phone       string `json:"phone"`
	DisplayName string `json:"display_name"`
}

type profile struct {
	ID          string `json:"id"`
	Username    string `json:"username"`
	DisplayName string `json:"display_name"`
	Phone       string `json:"phone,omitempty"`
}

func (s *Server) register(w http.ResponseWriter, r *http.Request) {
	var in authReq
	if !httpx.Decode(w, r, &in) {
		return
	}
	in.Username = strings.TrimSpace(in.Username)
	switch {
	case !usernameRe.MatchString(in.Username):
		httpx.Error(w, 400, "INVALID_USERNAME", "username must be 3-20 letters, digits or _")
		return
	case len(in.Password) < 6 || len(in.Password) > 72:
		httpx.Error(w, 400, "INVALID_PASSWORD", "password must be 6-72 characters")
		return
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(in.Password), 12)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not hash password")
		return
	}
	name := strings.TrimSpace(in.DisplayName)
	if name == "" {
		name = in.Username
	}
	p := profile{ID: uuid.NewString(), Username: in.Username, DisplayName: name, Phone: strings.TrimSpace(in.Phone)}
	_, err = s.DB.Exec(r.Context(),
		`INSERT INTO users (id, username, display_name, phone, password_hash) VALUES ($1,$2,$3,$4,$5)`,
		p.ID, p.Username, p.DisplayName, p.Phone, string(hash))
	var pe *pgconn.PgError
	if errors.As(err, &pe) && pe.Code == "23505" {
		httpx.Error(w, 409, "DUPLICATE_USERNAME", "username already taken")
		return
	}
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not create account")
		return
	}
	httpx.JSON(w, 201, map[string]any{"token": s.signToken(p.ID), "user": p})
}

func (s *Server) login(w http.ResponseWriter, r *http.Request) {
	var in authReq
	if !httpx.Decode(w, r, &in) {
		return
	}
	var p profile
	var hash string
	err := s.DB.QueryRow(r.Context(),
		`SELECT id::text, username, display_name, phone, password_hash FROM users
		 WHERE lower(username)=lower($1) AND is_deleted=FALSE`, strings.TrimSpace(in.Username)).
		Scan(&p.ID, &p.Username, &p.DisplayName, &p.Phone, &hash)
	// same error for unknown user and wrong password
	if err != nil || bcrypt.CompareHashAndPassword([]byte(hash), []byte(in.Password)) != nil {
		httpx.Error(w, 401, "BAD_CREDENTIALS", "wrong username or password")
		return
	}
	httpx.JSON(w, 200, map[string]any{"token": s.signToken(p.ID), "user": p})
}

func (s *Server) getMe(w http.ResponseWriter, r *http.Request, uid string) {
	var p profile
	err := s.DB.QueryRow(r.Context(),
		`SELECT id::text, username, display_name, phone FROM users WHERE id=$1 AND is_deleted=FALSE`, uid).
		Scan(&p.ID, &p.Username, &p.DisplayName, &p.Phone)
	if errors.Is(err, pgx.ErrNoRows) {
		httpx.Error(w, 401, "UNAUTHORIZED", "login required")
		return
	}
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "lookup failed")
		return
	}
	httpx.JSON(w, 200, p)
}
