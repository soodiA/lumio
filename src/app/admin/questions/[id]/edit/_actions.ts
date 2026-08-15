"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";

const OPTION_KEYS = ["A", "B", "C", "D", "E"];

export async function updateQuestion(questionId: number, formData: FormData): Promise<{ error?: string }> {
  const extraImagesRaw = formData.get("question_extra_images") as string;
  const extraImages = extraImagesRaw
    ? extraImagesRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];
  const skillsRaw = formData.get("skills") as string;
  const skills = skillsRaw
    ? skillsRaw.split("\n").map((s) => s.trim()).filter(Boolean)
    : [];

  const { error: qErr } = await supabaseAdmin
    .from("questions")
    .update({
      stage: Number(formData.get("stage")),
      level: formData.get("level") as string,
      year: formData.get("year") ? Number(formData.get("year")) : null,
      grade_group: (formData.get("grade_group") as string) || null,
      text_fa: formData.get("text_fa") as string,
      text_en: (formData.get("text_en") as string) || null,
      text_fa_2: (formData.get("text_fa_2") as string) || null,
      text_en_2: (formData.get("text_en_2") as string) || null,
      text_fa_3: (formData.get("text_fa_3") as string) || null,
      text_en_3: (formData.get("text_en_3") as string) || null,
      question_image_url: (formData.get("question_image_url") as string) || null,
      question_image_small: formData.get("question_image_small") === "on",
      question_image_strip: formData.get("question_image_strip") === "on",
      question_extra_images: extraImages.length ? extraImages : null,
      question_extra_images_full: formData.get("question_extra_images_full") === "on",
      hint_fa: (formData.get("hint_fa") as string) || null,
      hint_en: (formData.get("hint_en") as string) || null,
      correct: formData.get("correct") as string,
      skills: skills.length ? skills : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", questionId);

  if (qErr) return { error: qErr.message };

  // replace options: delete then re-insert
  await supabaseAdmin.from("question_options").delete().eq("question_id", questionId);

  const optionRows = OPTION_KEYS.map((_, i) => ({
    question_id: questionId,
    option_key: formData.get(`opt_key_${i}`) as string,
    text_fa: (formData.get(`opt_text_fa_${i}`) as string) || null,
    text_en: (formData.get(`opt_text_en_${i}`) as string) || null,
    image_url: (formData.get(`opt_image_url_${i}`) as string) || null,
    sort_order: i,
  })).filter((o) => o.text_fa || o.text_en || o.image_url);

  if (optionRows.length) {
    const { error: oErr } = await supabaseAdmin.from("question_options").insert(optionRows);
    if (oErr) return { error: oErr.message };
  }

  return {};
}
