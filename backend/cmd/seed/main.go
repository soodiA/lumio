// Command seed loads questions from a JSON export (array of api.Question) into an empty questions table.
package main

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/soodia/lumio/backend/internal/api"
)

func main() {
	if len(os.Args) != 2 {
		log.Fatal("usage: seed questions.json  (DATABASE_URL in env)")
	}
	raw, err := os.ReadFile(os.Args[1])
	if err != nil {
		log.Fatal(err)
	}
	var qs []api.Question
	if err := json.Unmarshal(raw, &qs); err != nil {
		log.Fatal(err)
	}
	ctx := context.Background()
	db, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	var n int
	if err := db.QueryRow(ctx, `SELECT count(*) FROM questions`).Scan(&n); err != nil {
		log.Fatal(err)
	}
	if n != 0 {
		log.Fatalf("questions table already has %d rows; refusing to seed (would overwrite admin edits)", n)
	}
	for i := range qs {
		if _, err := api.InsertQuestion(ctx, db, &qs[i]); err != nil {
			log.Fatalf("question %d: %v", qs[i].ID, err)
		}
	}
	if err := api.SyncSequence(ctx, db); err != nil {
		log.Fatal(err)
	}
	log.Printf("seeded %d questions", len(qs))
}
