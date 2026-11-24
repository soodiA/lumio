package api

import (
	"net/http"
	"strings"

	"github.com/soodia/lumio/backend/internal/httpx"
)

func (s *Server) searchProfiles(w http.ResponseWriter, r *http.Request, uid string) {
	q := strings.TrimSpace(r.URL.Query().Get("q"))
	if q == "" {
		httpx.JSON(w, 200, []profile{})
		return
	}
	esc := strings.NewReplacer(`\`, `\\`, `%`, `\%`, `_`, `\_`).Replace(q)
	rows, err := s.DB.Query(r.Context(),
		`SELECT id::text, username, display_name FROM users
		 WHERE is_deleted=FALSE AND id<>$1 AND (display_name ILIKE $2 OR username ILIKE $2)
		 ORDER BY display_name LIMIT 10`, uid, "%"+esc+"%")
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "search failed")
		return
	}
	defer rows.Close()
	out := []profile{}
	for rows.Next() {
		var p profile
		if rows.Scan(&p.ID, &p.Username, &p.DisplayName) == nil {
			out = append(out, p)
		}
	}
	httpx.JSON(w, 200, out)
}

func (s *Server) listFollows(w http.ResponseWriter, r *http.Request, uid string) {
	rows, err := s.DB.Query(r.Context(),
		`SELECT u.id::text, u.username, u.display_name FROM follows f
		 JOIN users u ON u.id=f.following_id AND u.is_deleted=FALSE
		 WHERE f.follower_id=$1 ORDER BY f.created_at`, uid)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "list failed")
		return
	}
	defer rows.Close()
	out := []profile{}
	for rows.Next() {
		var p profile
		if rows.Scan(&p.ID, &p.Username, &p.DisplayName) == nil {
			out = append(out, p)
		}
	}
	httpx.JSON(w, 200, out)
}

func (s *Server) follow(w http.ResponseWriter, r *http.Request, uid string) {
	target := r.PathValue("id")
	if target == uid {
		httpx.Error(w, 400, "VALIDATION_ERROR", "cannot follow yourself")
		return
	}
	tag, err := s.DB.Exec(r.Context(),
		`INSERT INTO follows (follower_id, following_id)
		 SELECT $1, id FROM users WHERE id::text=$2 AND is_deleted=FALSE
		 ON CONFLICT DO NOTHING`, uid, target)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "follow failed")
		return
	}
	_ = tag
	httpx.JSON(w, 200, map[string]bool{"ok": true})
}

func (s *Server) unfollow(w http.ResponseWriter, r *http.Request, uid string) {
	if _, err := s.DB.Exec(r.Context(),
		`DELETE FROM follows WHERE follower_id=$1 AND following_id::text=$2`, uid, r.PathValue("id")); err != nil {
		httpx.Error(w, 500, "INTERNAL", "unfollow failed")
		return
	}
	httpx.JSON(w, 200, map[string]bool{"ok": true})
}

type scoreReq struct {
	GradeGroup string `json:"grade_group"`
	Stage      int    `json:"stage"`
	Correct    int    `json:"correct"`
	Stars      int    `json:"stars"`
	Points     int    `json:"points"`
}

// saveScore keeps the best result per (user, grade, stage).
func (s *Server) saveScore(w http.ResponseWriter, r *http.Request, uid string) {
	var in scoreReq
	if !httpx.Decode(w, r, &in) {
		return
	}
	if in.GradeGroup == "" || in.Stage < 1 || in.Correct < 0 || in.Points < 0 || in.Points > 1000 || in.Stars < 0 || in.Stars > 3 {
		httpx.Error(w, 400, "VALIDATION_ERROR", "bad score")
		return
	}
	_, err := s.DB.Exec(r.Context(),
		`INSERT INTO stage_scores (user_id, grade_group, stage, best_correct, stars, points)
		 VALUES ($1,$2,$3,$4,$5,$6)
		 ON CONFLICT (user_id, grade_group, stage) DO UPDATE SET
		   best_correct=GREATEST(stage_scores.best_correct, EXCLUDED.best_correct),
		   stars=GREATEST(stage_scores.stars, EXCLUDED.stars),
		   points=GREATEST(stage_scores.points, EXCLUDED.points),
		   updated_at=now()`, uid, in.GradeGroup, in.Stage, in.Correct, in.Stars, in.Points)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not save score")
		return
	}
	httpx.JSON(w, 200, map[string]bool{"ok": true})
}

func (s *Server) leaderboard(w http.ResponseWriter, r *http.Request) {
	rows, err := s.DB.Query(r.Context(),
		`SELECT u.id::text, u.display_name, COALESCE(SUM(s.points),0), COALESCE(SUM(s.stars),0), COUNT(s.user_id)
		 FROM users u JOIN stage_scores s ON s.user_id=u.id
		 WHERE u.is_deleted=FALSE GROUP BY u.id, u.display_name
		 ORDER BY 3 DESC, 4 DESC LIMIT 50`)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "leaderboard failed")
		return
	}
	defer rows.Close()
	type row struct {
		UserID          string `json:"user_id"`
		DisplayName     string `json:"display_name"`
		TotalPoints     int    `json:"total_points"`
		TotalStars      int    `json:"total_stars"`
		StagesCompleted int    `json:"stages_completed"`
	}
	out := []row{}
	for rows.Next() {
		var x row
		if rows.Scan(&x.UserID, &x.DisplayName, &x.TotalPoints, &x.TotalStars, &x.StagesCompleted) == nil {
			out = append(out, x)
		}
	}
	httpx.JSON(w, 200, out)
}
