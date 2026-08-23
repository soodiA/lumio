"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Q = { id: number; stage: number; level: string; text_fa: string; grade_group: string | null; year: number | null };

const th: React.CSSProperties = { padding: "10px 14px", textAlign: "right", borderBottom: "1px solid #334155", color: "#94a3b8", fontWeight: 600, fontSize: 13 };
const td: React.CSSProperties = { padding: "10px 14px", borderBottom: "1px solid #1e293b", fontSize: 14 };

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Q[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("questions")
      .select("id,stage,level,text_fa,grade_group,year")
      .order("stage").order("id");
    setQuestions(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: number) {
    if (!confirm("این سوال حذف شود؟")) return;
    setDeleting(id);
    await supabase.from("questions").delete().eq("id", id);
    await load();
    setDeleting(null);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>سوال‌ها</h1>
        <Link href="/lumio/admin/questions/new" style={{ background: "#6366f1", color: "#fff", padding: "8px 18px", borderRadius: 8, textDecoration: "none", fontSize: 14 }}>
          + افزودن سوال جدید
        </Link>
      </div>

      {loading ? (
        <p style={{ color: "#94a3b8" }}>در حال بارگذاری…</p>
      ) : questions.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>هنوز سوالی وارد نشده. اولین سوال را اضافه کنید!</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e293b", borderRadius: 10, overflow: "hidden" }}>
            <thead>
              <tr>
                <th style={th}>#</th><th style={th}>مرحله</th><th style={th}>سطح</th>
                <th style={th}>گروه پایه</th><th style={th}>سال</th><th style={th}>متن سوال</th><th style={th}>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td style={td}>{q.id}</td>
                  <td style={td}>{q.stage}</td>
                  <td style={td}>{q.level}</td>
                  <td style={td}>{q.grade_group ?? "—"}</td>
                  <td style={td}>{q.year ?? "—"}</td>
                  <td style={{ ...td, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.text_fa}</td>
                  <td style={td}>
                    <Link href={`/lumio/admin/questions/${q.id}/edit`} style={{ color: "#6366f1", marginLeft: 12, fontSize: 13 }}>ویرایش</Link>
                    <button onClick={() => handleDelete(q.id)} disabled={deleting === q.id}
                      style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
                      {deleting === q.id ? "…" : "حذف"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
