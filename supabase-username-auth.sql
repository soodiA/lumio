-- Run this in Supabase SQL Editor AFTER supabase-setup.sql.
-- Switches signup/login to username-based (email stays internal-only, synthetic),
-- and adds a phone column to the profile.

alter table public.profiles add column if not exists phone text;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username, display_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

-- IMPORTANT (do this in the dashboard, not SQL):
-- Authentication → Sign In / Providers → Email → turn OFF "Confirm email".
-- Signup now uses a synthetic @users.lumio.app address behind the scenes (never
-- actually emailed to anyone), so a confirmation requirement would lock everyone out.
