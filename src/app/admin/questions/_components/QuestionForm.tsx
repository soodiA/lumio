"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const OPTION_KEYS = ["A", "B", "C", "D", "E"];
const LEVELS = ["3pt", "4pt", "5pt"];

type OptionDraft = { option_key: string; text_fa: string; text_en: string; image_url: string };

export type QuestionDraft = {
  id?: number;
  stage: number; level: string; year: number | null; grade_group: string;
  text_fa: string; text_en: string;
  text_fa_2: string; text_en_2: string;
  text_fa_3: string; text_en_3: string;
  question_image_url: string;
  question_image_small: boolean; question_image_strip: boolean;
  question_extra_images: string;
  question_extra_images_full: boolean;
  hint_fa: string; hint_en: string;
  correct: string; skills: string;
  options: OptionDraft[];
};

function emptyDraft(): QuestionDraft {
  return {
    stage: 1, level: "3pt", year: null, grade_group: "",
    text_fa: "", text_en: "",
    text_fa_2: "", text_en_2: "",
    text_fa_3: "", text_en_3: "",
    question_image_url: "",
    question_image_small: false, question_image_strip: false,
    question_extra_images: "",
    question_extra_images_full: false,
    hint_fa: "", hint_en: "",
    correct: "", skills: "",
    options: OPTION_KEYS.map((k) => ({ option_key: k, text_fa: "", text_en: "", image_url: "" })),
  };
}

export function initDraftFromRow(row: Record<string, unknown>, opts: Record<string, string>[]): QuestionDraft {
  return {
    id: row.id as number,
    stage: (row.stage as number) ?? 1,
    level: (row.level as string) ?? "3pt",
    year: (row.year as number | null) ?? null,
    grade_group: (row.grade_group as string) ?? "",
    text_fa: (row.text_fa as string) ?? "",
    text_en: (row.text_en as string) ?? "",
    text_fa_2: (row.text_fa_2 as string) ?? "",
    text_en_2: (row.text_en_2 as string) ?? "",
    text_fa_3: (row.text_fa_3 as string) ?? "",
    text_en_3: (row.text_en_3 as string) ?? "",
    question_image_url: (row.question_image_url as string) ?? "",
    question_image_small: (row.question_image_small as boolean) ?? false,
    question_image_strip: (row.question_image_strip as boolean) ?? false,
    question_extra_images: ((row.question_extra_images as string[]) ?? []).join("\n"),
    question_extra_images_full: (row.question_extra_images_full as boolean) ?? false,
    hint_fa: (row.hint_fa as string) ?? "",
    hint_en: (row.hint_en as string) ?? "",
    correct: (row.correct as string) ?? "",
    skills: ((row.skills as string[]) ?? []).join("\n"),
    options: OPTION_KEYS.map((k) => {
      const o = opts.find((x) => x.option_key === k);
      return { option_key: k, text_fa: o?.text_fa ?? "", text_en: o?.text_en ?? "", image_url: o?.image_url ?? "" };
    }),
  };
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 4, marginTop: 14 };
const inputStyle: React.CSSProperties = { width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "8px 10px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box" };
const sectionStyle: React.CSSProperties = { background: "#1e293b", borderRadius: 10, padding: 20, marginBottom: 20 };

export default function QuestionForm({ initial }: { initial?: QuestionDraft }) {
  const router = useRouter();
  const [draft, setDraft] = useState<QuestionDraft>(initial ?? emptyDraft());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof QuestionDraft>(key: K, val: QuestionDraft[K]) {
    setDraft((d) => ({ ...d, [key]: val }));
  }
  function setOpt(idx: number, key: keyof OptionDraft, val: string) {
    setDraft((d) => {
      const opts = [...d.options];
      opts[idx] = { ...opts[idx], [key]: val };
      return { ...d, options: opts };
    });
  }

  async function save() {
    if (!draft.text_fa.trim()) { setError("متن سوال الزامی است"); return; }
    if (!draft.correct.trim()) { setError("جواب صحیح الزامی است"); return; }
    setSaving(true); setError("");

    const payload = {
      stage: draft.stage, level: draft.level,
      year: draft.year || null, grade_group: draft.grade_group || null,
      text_fa: draft.text_fa, text_en: draft.text_en || null,
      text_fa_2: draft.text_fa_2 || null, text_en_2: draft.text_en_2 || null,
      text_fa_3: draft.text_fa_3 || null, text_en_3: draft.text_en_3 || null,
      question_image_url: draft.question_image_url || null,
      question_image_small: draft.question_image_small,
      question_image_strip: draft.question_image_strip,
      question_extra_images: draft.question_extra_images ? draft.question_extra_images.split("\n").filter(Boolean) : null,
      question_extra_images_full: draft.question_extra_images_full,
      hint_fa: draft.hint_fa || null, hint_en: draft.hint_en || null,
      correct: draft.correct,
      skills: draft.skills ? draft.skills.split("\n").filter(Boolean) : null,
    };

    let questionId = draft.id;
    if (questionId) {
      const { error: e } = await supabase.from("questions").update(payload).eq("id", questionId);
      if (e) { setError(e.message); setSaving(false); return; }
      await supabase.from("question_options").delete().eq("question_id", questionId);
    } else {
      const { data, error: e } = await supabase.from("questions").insert(payload).select("id").single();
      if (e || !data) { setError(e?.message ?? "خطا در ذخیره"); setSaving(false); return; }
      questionId = (data as { id: number }).id;
    }

    const optRows = draft.options
      .filter((o) => o.text_fa || o.text_en || o.image_url)
      .map((o, i) => ({ question_id: questionId!, option_key: o.option_key, text_fa: o.text_fa || null, text_en: o.text_en || null, image_url: o.image_url || null, sort_order: i }));

    if (optRows.length) {
      const { error: oe } = await supabase.from("question_options").insert(optRows);
      if (oe) { setError(oe.message); setSaving(false); return; }
    }

    router.push("/admin/questions");
  }

  return (
    <div style={{ maxWidth: 820 }}>
      {error && <div style={{ background: "#7f1d1d", color: "#fca5a5", padding: "10px 14px", borderRadius: 8, marginBottom: 16 }}>{error}</div>}

      <div style={sectionStyle}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>اطلاعات اصلی</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          <div>
            <span style={labelStyle}>مرحله *</span>
            <input style={inputStyle} type="number" value={draft.stage} min={1} onChange={(e) => set("stage", +e.target.value)} />
          </div>
          <div>
            <span style={labelStyle}>سطح *</span>
            <select style={inputStyle} value={draft.level} onChange={(e) => set("level", e.target.value)}>
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <span style={labelStyle}>سال</span>
            <input style={inputStyle} type="number" value={draft.year ?? ""} onChange={(e) => set("year", e.target.value ? +e.target.value : null)} />
          </div>
          <div>
            <span style={labelStyle}>گروه پایه</span>
            <input style={inputStyle} value={draft.grade_group} onChange={(e) => set("grade_group", e.target.value)} placeholder="مثال: 1-2" />
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>متن سوال</h2>
        <span style={labelStyle}>متن فارسی *</span>
        <textarea style={{ ...inputStyle, minHeight: 80 }} value={draft.text_fa} onChange={(e) => set("text_fa", e.target.value)} />
        <span style={labelStyle}>متن انگلیسی</span>
        <textarea style={{ ...inputStyle, minHeight: 60 }} value={draft.text_en} onChange={(e) => set("text_en", e.target.value)} />
        <span style={labelStyle}>متن دوم فارسی (اختیاری)</span>
        <input style={inputStyle} value={draft.text_fa_2} onChange={(e) => set("text_fa_2", e.target.value)} />
        <span style={labelStyle}>متن دوم انگلیسی (اختیاری)</span>
        <input style={inputStyle} value={draft.text_en_2} onChange={(e) => set("text_en_2", e.target.value)} />
      </div>

      <div style={sectionStyle}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>تصویر سوال</h2>
        <span style={labelStyle}>آدرس تصویر اصلی</span>
        <input style={inputStyle} value={draft.question_image_url} onChange={(e) => set("question_image_url", e.target.value)} placeholder="/lumio/images/questions/..." />
        <div style={{ display: "flex", gap: 24, marginTop: 10 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>
            <input type="checkbox" checked={draft.question_image_small} onChange={(e) => set("question_image_small", e.target.checked)} />
            تصویر کوچک
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#94a3b8", cursor: "pointer" }}>
            <input type="checkbox" checked={draft.question_image_strip} onChange={(e) => set("question_image_strip", e.target.checked)} />
            نوار افقی
          </label>
        </div>
        <span style={labelStyle}>تصاویر اضافی (هر آدرس در یک خط)</span>
        <textarea style={{ ...inputStyle, minHeight: 60 }} value={draft.question_extra_images} onChange={(e) => set("question_extra_images", e.target.value)} />
      </div>

      <div style={sectionStyle}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>گزینه‌ها (A تا E)</h2>
        {draft.options.map((opt, i) => (
          <div key={opt.option_key} style={{ borderBottom: i < 4 ? "1px solid #334155" : "none", paddingBottom: 12, marginBottom: 12 }}>
            <span style={{ ...labelStyle, color: "#6366f1", marginTop: 0, fontWeight: 700 }}>گزینه {opt.option_key}</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 10 }}>
              <div>
                <span style={labelStyle}>متن فارسی</span>
                <input style={inputStyle} value={opt.text_fa} onChange={(e) => setOpt(i, "text_fa", e.target.value)} />
              </div>
              <div>
                <span style={labelStyle}>متن انگلیسی</span>
                <input style={inputStyle} value={opt.text_en} onChange={(e) => setOpt(i, "text_en", e.target.value)} />
              </div>
              <div>
                <span style={labelStyle}>آدرس تصویر گزینه</span>
                <input style={inputStyle} value={opt.image_url} onChange={(e) => setOpt(i, "image_url", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={sectionStyle}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>جواب و راهنمایی</h2>
        <span style={labelStyle}>جواب صحیح * (کلید گزینه مثل A یا نام فایل تصویر)</span>
        <input style={inputStyle} value={draft.correct} onChange={(e) => set("correct", e.target.value)} placeholder="مثال: A" />
        <span style={labelStyle}>راهنمایی فارسی</span>
        <textarea style={{ ...inputStyle, minHeight: 70 }} value={draft.hint_fa} onChange={(e) => set("hint_fa", e.target.value)} />
        <span style={labelStyle}>راهنمایی انگلیسی</span>
        <textarea style={{ ...inputStyle, minHeight: 70 }} value={draft.hint_en} onChange={(e) => set("hint_en", e.target.value)} />
        <span style={labelStyle}>مهارت‌ها (هر مهارت در یک خط)</span>
        <textarea style={{ ...inputStyle, minHeight: 60 }} value={draft.skills} onChange={(e) => set("skills", e.target.value)} placeholder={"counting\nmatching"} />
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        <button onClick={save} disabled={saving}
          style={{ background: "#6366f1", color: "#fff", padding: "10px 28px", borderRadius: 8, border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: 15, opacity: saving ? 0.7 : 1 }}>
          {saving ? "در حال ذخیره…" : "ذخیره"}
        </button>
        <button onClick={() => router.push("/admin/questions")}
          style={{ background: "#334155", color: "#f1f5f9", padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 15 }}>
          انصراف
        </button>
      </div>
    </div>
  );
}
