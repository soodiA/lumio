"use server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { redirect } from "next/navigation";

export async function deleteQuestion(formData: FormData) {
  const id = Number(formData.get("id"));
  await supabaseAdmin.from("question_options").delete().eq("question_id", id);
  await supabaseAdmin.from("questions").delete().eq("id", id);
  redirect("/admin/questions");
}
