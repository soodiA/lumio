-- +goose Up
CREATE TABLE users (
  id            UUID PRIMARY KEY,
  username      TEXT NOT NULL,
  display_name  TEXT NOT NULL,
  phone         TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  is_deleted    BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at    TIMESTAMPTZ NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX users_username_uq ON users (lower(username)) WHERE is_deleted = FALSE;

CREATE TABLE questions (
  id                         BIGSERIAL PRIMARY KEY,
  stage                      INT  NOT NULL,
  level                      TEXT NOT NULL CHECK (level IN ('3pt','4pt','5pt')),
  year                       INT NULL,
  grade_group                TEXT NULL,
  text_fa                    TEXT NOT NULL,
  text_en                    TEXT NULL,
  text_fa_2                  TEXT NULL,
  text_en_2                  TEXT NULL,
  text_fa_3                  TEXT NULL,
  text_en_3                  TEXT NULL,
  question_image_url         TEXT NULL,
  question_image_small       BOOLEAN NOT NULL DEFAULT FALSE,
  question_image_strip       BOOLEAN NOT NULL DEFAULT FALSE,
  question_extra_images      TEXT[] NULL,
  question_extra_images_full BOOLEAN NOT NULL DEFAULT FALSE,
  hint_fa                    TEXT NULL,
  hint_en                    TEXT NULL,
  correct                    TEXT NOT NULL,
  skills                     TEXT[] NULL,
  is_deleted                 BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at                 TIMESTAMPTZ NULL,
  created_at                 TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                 TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX questions_grade_stage_idx ON questions (grade_group, stage) WHERE is_deleted = FALSE;

CREATE TABLE question_options (
  id          BIGSERIAL PRIMARY KEY,
  question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_key  TEXT NOT NULL,
  text_fa     TEXT NULL,
  text_en     TEXT NULL,
  image_url   TEXT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  UNIQUE (question_id, option_key)
);

CREATE TABLE follows (
  follower_id  UUID NOT NULL REFERENCES users(id),
  following_id UUID NOT NULL REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id <> following_id)
);

CREATE TABLE stage_scores (
  user_id     UUID NOT NULL REFERENCES users(id),
  grade_group TEXT NOT NULL,
  stage       INT  NOT NULL,
  best_correct INT NOT NULL DEFAULT 0,
  stars       INT  NOT NULL DEFAULT 0,
  points      INT  NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, grade_group, stage)
);

-- +goose Down
DROP TABLE stage_scores;
DROP TABLE follows;
DROP TABLE question_options;
DROP TABLE questions;
DROP TABLE users;
