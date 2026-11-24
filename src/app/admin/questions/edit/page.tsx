"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { api } from "@/lib/api";
import QuestionForm, { initDraftFromRow, QuestionDraft } from "../_components/QuestionForm";

function EditContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const [draft, setDraft] = useState<QuestionDraft | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); return; }
    async function load() {
      try {
        const row = await api<Record<string, unknown> & { options: Record<string, string>[] }>(`/api/v1/admin/questions/${id}`, { admin: true });
        setDraft(initDraftFromRow(row, row.options ?? []));
      } catch { setNotFound(true); }
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

export default function EditQuestionPage() {
  return (
    <Suspense fallback={<p style={{ color: "#94a3b8" }}>در حال بارگذاری…</p>}>
      <EditContent />
    </Suspense>
  );
}
