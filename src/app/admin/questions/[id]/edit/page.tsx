"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import QuestionForm, { initDraftFromRow, QuestionDraft } from "../../_components/QuestionForm";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditQuestionPage() {
  const { id } = useParams<{ id: string }>();
  const [draft, setDraft] = useState<QuestionDraft | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: row } = await supabase.from("questions").select("*").eq("id", id).single();
      if (!row) { setNotFound(true); return; }
      const { data: opts } = await supabase.from("question_options").select("*").eq("question_id", id).order("sort_order");
      setDraft(initDraftFromRow(row as Record<string, unknown>, (opts ?? []) as Record<string, string>[]));
    }
    load();
  }, [id]);

  if (notFound) return <p style={{ color: "#ef4444" }}>سوال پیدا نشد.</p>;
  if (!draft) return <p style={{ color: "#94a3b8" }}>در حال بارگذاری…</p>;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>ویرایش سوال #{id}</h1>
      <QuestionForm initial={draft} />
    </div>
  );
}
