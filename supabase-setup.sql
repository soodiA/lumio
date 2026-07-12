-- Run this in Supabase SQL Editor (Database → SQL Editor → New Query)

-- 1. Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 4),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Stage scores
create table if not exists public.stage_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  grade text not null,
  stage int not null,
  best_score int not null default 0,
  stars int not null default 0,
  total_points int not null default 0,
  updated_at timestamptz default now(),
  unique(user_id, grade, stage)
);

-- 3. Follows
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(follower_id, following_id)
);

-- 4. Leaderboard view
create or replace view public.leaderboard as
select
  p.id as user_id,
  p.username,
  p.display_name,
  p.avatar_url,
  coalesce(sum(s.total_points), 0) as total_points,
  coalesce(sum(s.stars), 0) as total_stars,
  count(s.id) as stages_completed
from public.profiles p
left join public.stage_scores s on s.user_id = p.id
group by p.id, p.username, p.display_name, p.avatar_url;

-- 5. Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.stage_scores enable row level security;
alter table public.follows enable row level security;

-- Profiles: anyone can read, only owner can update
create policy "profiles_read" on public.profiles for select using (true);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

-- Scores: anyone can read, only owner can write
create policy "scores_read" on public.stage_scores for select using (true);
create policy "scores_write" on public.stage_scores for all using (auth.uid() = user_id);

-- Follows: anyone can read, only follower can write
create policy "follows_read" on public.follows for select using (true);
create policy "follows_write" on public.follows for all using (auth.uid() = follower_id);
