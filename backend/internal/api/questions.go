package api

import (
	"context"
	"errors"
	"net/http"
	"strconv"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/soodia/lumio/backend/internal/httpx"
)

type Option struct {
	OptionKey string  `json:"option_key"`
	TextFa    *string `json:"text_fa"`
	TextEn    *string `json:"text_en"`
	ImageURL  *string `json:"image_url"`
	SortOrder int     `json:"sort_order"`
}

// Question uses the same field names as the old Supabase rows so the frontend maps 1:1.
type Question struct {
	ID                      int64    `json:"id"`
	Stage                   int      `json:"stage"`
	Level                   string   `json:"level"`
	Year                    *int     `json:"year"`
	GradeGroup              *string  `json:"grade_group"`
	TextFa                  string   `json:"text_fa"`
	TextEn                  *string  `json:"text_en"`
	TextFa2                 *string  `json:"text_fa_2"`
	TextEn2                 *string  `json:"text_en_2"`
	TextFa3                 *string  `json:"text_fa_3"`
	TextEn3                 *string  `json:"text_en_3"`
	QuestionImageURL        *string  `json:"question_image_url"`
	QuestionImageSmall      bool     `json:"question_image_small"`
	QuestionImageStrip      bool     `json:"question_image_strip"`
	QuestionExtraImages     []string `json:"question_extra_images"`
	QuestionExtraImagesFull bool     `json:"question_extra_images_full"`
	HintFa                  *string  `json:"hint_fa"`
	HintEn                  *string  `json:"hint_en"`
	Correct                 string   `json:"correct"`
	Skills                  []string `json:"skills"`
	Options                 []Option `json:"options"`
}

const qCols = `id, stage, level, year, grade_group, text_fa, text_en, text_fa_2, text_en_2, text_fa_3, text_en_3,
 question_image_url, question_image_small, question_image_strip, question_extra_images, question_extra_images_full,
 hint_fa, hint_en, correct, skills`

func scanQ(row pgx.Row) (Question, error) {
	var q Question
	err := row.Scan(&q.ID, &q.Stage, &q.Level, &q.Year, &q.GradeGroup, &q.TextFa, &q.TextEn, &q.TextFa2, &q.TextEn2,
		&q.TextFa3, &q.TextEn3, &q.QuestionImageURL, &q.QuestionImageSmall, &q.QuestionImageStrip,
		&q.QuestionExtraImages, &q.QuestionExtraImagesFull, &q.HintFa, &q.HintEn, &q.Correct, &q.Skills)
	q.Options = []Option{}
	return q, err
}

// loadQuestions returns live questions (optionally filtered) with their options attached.
func loadQuestions(ctx context.Context, db *pgxpool.Pool, where string, args ...any) ([]Question, error) {
	rows, err := db.Query(ctx, `SELECT `+qCols+` FROM questions WHERE is_deleted=FALSE `+where+` ORDER BY stage, id`, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	qs := []Question{}
	idx := map[int64]int{}
	for rows.Next() {
		q, err := scanQ(rows)
		if err != nil {
			return nil, err
		}
		idx[q.ID] = len(qs)
		qs = append(qs, q)
	}
	if rows.Err() != nil || len(qs) == 0 {
		return qs, rows.Err()
	}
	ids := make([]int64, 0, len(qs))
	for id := range idx {
		ids = append(ids, id)
	}
	orows, err := db.Query(ctx, `SELECT question_id, option_key, text_fa, text_en, image_url, sort_order
		FROM question_options WHERE question_id = ANY($1) ORDER BY sort_order, id`, ids)
	if err != nil {
		return nil, err
	}
	defer orows.Close()
	for orows.Next() {
		var qid int64
		var o Option
		if err := orows.Scan(&qid, &o.OptionKey, &o.TextFa, &o.TextEn, &o.ImageURL, &o.SortOrder); err != nil {
			return nil, err
		}
		i := idx[qid]
		qs[i].Options = append(qs[i].Options, o)
	}
	return qs, orows.Err()
}

func (s *Server) listQuestions(w http.ResponseWriter, r *http.Request) {
	grade, stageS := r.URL.Query().Get("grade"), r.URL.Query().Get("stage")
	stage, err := strconv.Atoi(stageS)
	if grade == "" || err != nil {
		httpx.Error(w, 400, "VALIDATION_ERROR", "grade and stage are required")
		return
	}
	qs, err := loadQuestions(r.Context(), s.DB, `AND grade_group=$1 AND stage=$2`, grade, stage)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not load questions")
		return
	}
	httpx.JSON(w, 200, qs)
}

func (s *Server) adminList(w http.ResponseWriter, r *http.Request) {
	qs, err := loadQuestions(r.Context(), s.DB, ``)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not load questions")
		return
	}
	httpx.JSON(w, 200, qs)
}

func (s *Server) adminGet(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		httpx.Error(w, 400, "VALIDATION_ERROR", "bad id")
		return
	}
	qs, err := loadQuestions(r.Context(), s.DB, `AND id=$1`, id)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not load question")
		return
	}
	if len(qs) == 0 {
		httpx.Error(w, 404, "NOT_FOUND", "question not found")
		return
	}
	httpx.JSON(w, 200, qs[0])
}

func validate(q *Question) string {
	switch {
	case q.Stage < 1:
		return "stage must be >= 1"
	case q.Level != "3pt" && q.Level != "4pt" && q.Level != "5pt":
		return "level must be 3pt, 4pt or 5pt"
	case q.TextFa == "":
		return "text_fa is required"
	case q.Correct == "":
		return "correct is required"
	case len(q.Options) < 2:
		return "at least 2 options are required"
	}
	for _, o := range q.Options {
		if o.OptionKey == "" {
			return "every option needs an option_key"
		}
	}
	return ""
}

// InsertQuestion writes a question + options in one transaction. When q.ID != 0 it is used as the primary key
// (seeding keeps the original ids); the sequence is bumped afterwards by the caller via SyncSequence.
func InsertQuestion(ctx context.Context, db *pgxpool.Pool, q *Question) (int64, error) {
	tx, err := db.Begin(ctx)
	if err != nil {
		return 0, err
	}
	defer tx.Rollback(ctx)
	args := []any{q.Stage, q.Level, q.Year, q.GradeGroup, q.TextFa, q.TextEn, q.TextFa2, q.TextEn2, q.TextFa3, q.TextEn3,
		q.QuestionImageURL, q.QuestionImageSmall, q.QuestionImageStrip, q.QuestionExtraImages, q.QuestionExtraImagesFull,
		q.HintFa, q.HintEn, q.Correct, q.Skills}
	var id int64
	if q.ID != 0 {
		err = tx.QueryRow(ctx, `INSERT INTO questions (stage, level, year, grade_group, text_fa, text_en, text_fa_2, text_en_2,
		 text_fa_3, text_en_3, question_image_url, question_image_small, question_image_strip, question_extra_images,
		 question_extra_images_full, hint_fa, hint_en, correct, skills, id)
		 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING id`, append(args, q.ID)...).Scan(&id)
	} else {
		err = tx.QueryRow(ctx, `INSERT INTO questions (stage, level, year, grade_group, text_fa, text_en, text_fa_2, text_en_2,
		 text_fa_3, text_en_3, question_image_url, question_image_small, question_image_strip, question_extra_images,
		 question_extra_images_full, hint_fa, hint_en, correct, skills)
		 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING id`, args...).Scan(&id)
	}
	if err != nil {
		return 0, err
	}
	if err := insertOptions(ctx, tx, id, q.Options); err != nil {
		return 0, err
	}
	return id, tx.Commit(ctx)
}

func insertOptions(ctx context.Context, tx pgx.Tx, id int64, opts []Option) error {
	for i, o := range opts {
		if _, err := tx.Exec(ctx, `INSERT INTO question_options (question_id, option_key, text_fa, text_en, image_url, sort_order)
			VALUES ($1,$2,$3,$4,$5,$6)`, id, o.OptionKey, o.TextFa, o.TextEn, o.ImageURL, i); err != nil {
			return err
		}
	}
	return nil
}

// SyncSequence moves the id sequence past the largest id (needed after inserting explicit ids).
func SyncSequence(ctx context.Context, db *pgxpool.Pool) error {
	_, err := db.Exec(ctx, `SELECT setval(pg_get_serial_sequence('questions','id'), COALESCE((SELECT max(id) FROM questions),1))`)
	return err
}

func (s *Server) adminCreate(w http.ResponseWriter, r *http.Request) {
	var q Question
	if !httpx.Decode(w, r, &q) {
		return
	}
	q.ID = 0
	if msg := validate(&q); msg != "" {
		httpx.Error(w, 400, "VALIDATION_ERROR", msg)
		return
	}
	id, err := InsertQuestion(r.Context(), s.DB, &q)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not create question")
		return
	}
	httpx.JSON(w, 201, map[string]int64{"id": id})
}

func (s *Server) adminUpdate(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		httpx.Error(w, 400, "VALIDATION_ERROR", "bad id")
		return
	}
	var q Question
	if !httpx.Decode(w, r, &q) {
		return
	}
	if msg := validate(&q); msg != "" {
		httpx.Error(w, 400, "VALIDATION_ERROR", msg)
		return
	}
	tx, err := s.DB.Begin(r.Context())
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "db error")
		return
	}
	defer tx.Rollback(r.Context())
	tag, err := tx.Exec(r.Context(), `UPDATE questions SET stage=$1, level=$2, year=$3, grade_group=$4, text_fa=$5, text_en=$6,
		text_fa_2=$7, text_en_2=$8, text_fa_3=$9, text_en_3=$10, question_image_url=$11, question_image_small=$12,
		question_image_strip=$13, question_extra_images=$14, question_extra_images_full=$15, hint_fa=$16, hint_en=$17,
		correct=$18, skills=$19, updated_at=now() WHERE id=$20 AND is_deleted=FALSE`,
		q.Stage, q.Level, q.Year, q.GradeGroup, q.TextFa, q.TextEn, q.TextFa2, q.TextEn2, q.TextFa3, q.TextEn3,
		q.QuestionImageURL, q.QuestionImageSmall, q.QuestionImageStrip, q.QuestionExtraImages, q.QuestionExtraImagesFull,
		q.HintFa, q.HintEn, q.Correct, q.Skills, id)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not update question")
		return
	}
	if tag.RowsAffected() == 0 {
		httpx.Error(w, 404, "NOT_FOUND", "question not found")
		return
	}
	if _, err := tx.Exec(r.Context(), `DELETE FROM question_options WHERE question_id=$1`, id); err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not update options")
		return
	}
	if err := insertOptions(r.Context(), tx, id, q.Options); err != nil {
		httpx.Error(w, 500, "INTERNAL", "could not update options")
		return
	}
	if err := tx.Commit(r.Context()); err != nil {
		httpx.Error(w, 500, "INTERNAL", "commit failed")
		return
	}
	httpx.JSON(w, 200, map[string]int64{"id": id})
}

// adminDelete is a soft delete: is_deleted and deleted_at move together.
func (s *Server) adminDelete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil {
		httpx.Error(w, 400, "VALIDATION_ERROR", "bad id")
		return
	}
	tag, err := s.DB.Exec(r.Context(), `UPDATE questions SET is_deleted=TRUE, deleted_at=now() WHERE id=$1 AND is_deleted=FALSE`, id)
	if err != nil {
		httpx.Error(w, 500, "INTERNAL", "delete failed")
		return
	}
	if tag.RowsAffected() == 0 {
		httpx.Error(w, 404, "NOT_FOUND", "question not found")
		return
	}
	httpx.JSON(w, 200, map[string]bool{"ok": true})
}

var _ = errors.Is
