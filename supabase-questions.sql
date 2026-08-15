-- questions table
create table if not exists public.questions (
  id bigserial primary key,
  stage int not null,
  level text not null check (level in ('3pt','4pt','5pt')),
  year int,
  grade_group text,
  text_fa text not null,
  text_en text,
  text_fa_2 text,
  text_en_2 text,
  text_fa_3 text,
  text_en_3 text,
  question_image_url text,
  question_image_small boolean default false,
  question_image_strip boolean default false,
  question_extra_images text[],
  question_extra_images_full boolean default false,
  hint_fa text,
  hint_en text,
  correct text not null,
  skills text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- question options
create table if not exists public.question_options (
  id bigserial primary key,
  question_id bigint references public.questions(id) on delete cascade,
  option_key text not null,  -- 'A','B','C','D','E'
  text_fa text,
  text_en text,
  image_url text,
  sort_order int default 0
);

-- RLS: fully open (questions/options are public content, no sensitive data)
alter table public.questions enable row level security;
alter table public.question_options enable row level security;

create policy "open questions" on public.questions for all using (true) with check (true);
create policy "open options" on public.question_options for all using (true) with check (true);
