import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseAdmin = createClient(supabaseUrl, anonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export type QuestionRow = {
  id: number;
  stage: number;
  level: "3pt" | "4pt" | "5pt";
  year: number | null;
  grade_group: string | null;
  text_fa: string;
  text_en: string | null;
  text_fa_2: string | null;
  text_en_2: string | null;
  text_fa_3: string | null;
  text_en_3: string | null;
  question_image_url: string | null;
  question_image_small: boolean;
  question_image_strip: boolean;
  question_extra_images: string[] | null;
  question_extra_images_full: boolean;
  hint_fa: string | null;
  hint_en: string | null;
  correct: string;
  skills: string[] | null;
  created_at: string;
  updated_at: string;
};

export type QuestionOptionRow = {
  id: number;
  question_id: number;
  option_key: string;
  text_fa: string | null;
  text_en: string | null;
  image_url: string | null;
  sort_order: number;
};
