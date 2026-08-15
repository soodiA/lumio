import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { deleteQuestion } from "./_actions";

export const dynamic = "force-dynamic";

export default async function QuestionsListPage() {
  const { data: questions, error } = await supabaseAdmin
    .from("questions")
    .select("id, stage, level, text_fa, correct, created_at")
    .order("id", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">لیست سوال‌ها</h1>
        <Link
          href="/admin/questions/new"
          className="px-4 py-2 rounded text-white text-sm font-medium"
          style={{ background: "var(--color-primary-btn)" }}
        >
          + سوال جدید
        </Link>
      </div>

      {error && (
        <div
          className="p-4 rounded mb-4 text-sm"
          style={{ background: "#fdecea", color: "var(--color-error)" }}
        >
          خطا در بارگذاری: {error.message}
        </div>
      )}

      <div className="overflow-x-auto rounded border" style={{ borderColor: "#e0e0e0" }}>
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead style={{ background: "#f5f5f5" }}>
            <tr>
              <th className="px-4 py-3 text-right font-medium">ID</th>
              <th className="px-4 py-3 text-right font-medium">مرحله</th>
              <th className="px-4 py-3 text-right font-medium">سطح</th>
              <th className="px-4 py-3 text-right font-medium">متن سوال</th>
              <th className="px-4 py-3 text-right font-medium">پاسخ صحیح</th>
              <th className="px-4 py-3 text-right font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {!questions || questions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center"
                  style={{ color: "#888" }}
                >
                  هیچ سوالی ثبت نشده است.
                </td>
              </tr>
            ) : (
              questions.map((q, i) => (
                <tr
                  key={q.id}
                  style={{
                    borderTop: "1px solid #e0e0e0",
                    background: i % 2 === 0 ? "#fff" : "#fafafa",
                  }}
                >
                  <td className="px-4 py-3">{q.id}</td>
                  <td className="px-4 py-3">{q.stage}</td>
                  <td className="px-4 py-3">{q.level}</td>
                  <td
                    className="px-4 py-3 max-w-xs truncate"
                    title={q.text_fa}
                  >
                    {q.text_fa}
                  </td>
                  <td className="px-4 py-3">{q.correct}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/questions/${q.id}/edit`}
                        className="px-3 py-1 rounded text-xs font-medium inline-block"
                        style={{ background: "var(--color-stage)", color: "#fff" }}
                      >
                        ویرایش
                      </Link>
                      <form action={deleteQuestion}>
                        <input type="hidden" name="id" value={q.id} />
                        <button
                          type="submit"
                          className="px-3 py-1 rounded text-xs font-medium"
                          style={{ background: "var(--color-error)", color: "#fff", cursor: "pointer" }}
                        >
                          حذف
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
