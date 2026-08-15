"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { QuestionRow, QuestionOptionRow } from "@/lib/supabase-admin";

const OPTION_KEYS = ["A", "B", "C", "D", "E"];
const LEVEL_OPTIONS = ["3pt", "4pt", "5pt"] as const;

type OptionDraft = {
  option_key: string;
  text_fa: string;
  text_en: string;
  image_url: string;
};

type Props = {
  question?: QuestionRow;
  options?: QuestionOptionRow[];
  action: (formData: FormData) => Promise<{ error?: string }>;
};

function initOptions(options?: QuestionOptionRow[]): OptionDraft[] {
  return OPTION_KEYS.map((key) => {
    const existing = options?.find((o) => o.option_key === key);
    return {
      option_key: key,
      text_fa: existing?.text_fa ?? "",
      text_en: existing?.text_en ?? "",
      image_url: existing?.image_url ?? "",
    };
  });
}

export default function QuestionForm({ question, options, action }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [opts, setOpts] = useState<OptionDraft[]>(initOptions(options));

  const fieldStyle = {
    border: "1px solid #ccc",
    borderRadius: 6,
    padding: "8px 10px",
    width: "100%",
    fontSize: 14,
    background: "#fff",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 4,
    fontSize: 13,
    fontWeight: 500,
    color: "#333",
  };

  function handleOptChange(
    idx: number,
    field: keyof Omit<OptionDraft, "option_key">,
    value: string
  ) {
    setOpts((prev) => prev.map((o, i) => (i === idx ? { ...o, [field]: value } : o)));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    // inject options
    opts.forEach((o, i) => {
      fd.set(`opt_key_${i}`, o.option_key);
      fd.set(`opt_text_fa_${i}`, o.text_fa);
      fd.set(`opt_text_en_${i}`, o.text_en);
      fd.set(`opt_image_url_${i}`, o.image_url);
    });
    startTransition(async () => {
      const result = await action(fd);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin/questions");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} dir="rtl" className="max-w-3xl">
      {error && (
        <div
          className="p-3 rounded mb-4 text-sm"
          style={{ background: "#fdecea", color: "var(--color-error)" }}
        >
          {error}
        </div>
      )}

      {/* Basic fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label style={labelStyle}>مرحله (Stage) *</label>
          <input
            name="stage"
            type="number"
            required
            defaultValue={question?.stage ?? ""}
            style={fieldStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>سطح (Level) *</label>
          <select name="level" required defaultValue={question?.level ?? "3pt"} style={fieldStyle}>
            {LEVEL_OPTIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>سال (Year)</label>
          <input
            name="year"
            type="number"
            defaultValue={question?.year ?? ""}
            style={fieldStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>گروه پایه (Grade Group)</label>
          <input
            name="grade_group"
            defaultValue={question?.grade_group ?? ""}
            style={fieldStyle}
          />
        </div>
      </div>

      {/* Question texts */}
      <div className="mb-4">
        <label style={labelStyle}>متن سوال (فارسی) *</label>
        <textarea
          name="text_fa"
          required
          defaultValue={question?.text_fa ?? ""}
          rows={3}
          style={fieldStyle}
        />
      </div>
      <div className="mb-4">
        <label style={labelStyle}>متن سوال (انگلیسی)</label>
        <textarea
          name="text_en"
          defaultValue={question?.text_en ?? ""}
          rows={2}
          style={fieldStyle}
          dir="ltr"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label style={labelStyle}>متن دوم (فارسی)</label>
          <textarea name="text_fa_2" defaultValue={question?.text_fa_2 ?? ""} rows={2} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>متن دوم (انگلیسی)</label>
          <textarea name="text_en_2" defaultValue={question?.text_en_2 ?? ""} rows={2} style={fieldStyle} dir="ltr" />
        </div>
        <div>
          <label style={labelStyle}>متن سوم (فارسی)</label>
          <textarea name="text_fa_3" defaultValue={question?.text_fa_3 ?? ""} rows={2} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>متن سوم (انگلیسی)</label>
          <textarea name="text_en_3" defaultValue={question?.text_en_3 ?? ""} rows={2} style={fieldStyle} dir="ltr" />
        </div>
      </div>

      {/* Images */}
      <div className="mb-4">
        <label style={labelStyle}>آدرس تصویر سوال</label>
        <input
          name="question_image_url"
          defaultValue={question?.question_image_url ?? ""}
          style={fieldStyle}
          dir="ltr"
          placeholder="/images/q1.png"
        />
      </div>
      <div className="flex gap-6 mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="question_image_small"
            defaultChecked={question?.question_image_small ?? false}
          />
          تصویر کوچک
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="question_image_strip"
            defaultChecked={question?.question_image_strip ?? false}
          />
          تصویر نواری
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="question_extra_images_full"
            defaultChecked={question?.question_extra_images_full ?? false}
          />
          تصاویر اضافه تمام‌عرض
        </label>
      </div>
      <div className="mb-4">
        <label style={labelStyle}>تصاویر اضافه (هر آدرس در یک خط)</label>
        <textarea
          name="question_extra_images"
          defaultValue={(question?.question_extra_images ?? []).join("\n")}
          rows={3}
          style={fieldStyle}
          dir="ltr"
          placeholder="/images/extra1.png&#10;/images/extra2.png"
        />
      </div>

      {/* Hint */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label style={labelStyle}>راهنما (فارسی)</label>
          <textarea name="hint_fa" defaultValue={question?.hint_fa ?? ""} rows={2} style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>راهنما (انگلیسی)</label>
          <textarea name="hint_en" defaultValue={question?.hint_en ?? ""} rows={2} style={fieldStyle} dir="ltr" />
        </div>
      </div>

      {/* Correct answer */}
      <div className="mb-4">
        <label style={labelStyle}>پاسخ صحیح *</label>
        <input
          name="correct"
          required
          defaultValue={question?.correct ?? ""}
          style={fieldStyle}
          placeholder="مثال: A یا نام فایل تصویر"
        />
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label style={labelStyle}>مهارت‌ها (هر مهارت در یک خط)</label>
        <textarea
          name="skills"
          defaultValue={(question?.skills ?? []).join("\n")}
          rows={2}
          style={fieldStyle}
          placeholder="جمع&#10;تفریق"
        />
      </div>

      {/* Options */}
      <div className="mb-6">
        <h2 className="text-base font-bold mb-3">گزینه‌ها</h2>
        <div className="rounded border overflow-hidden" style={{ borderColor: "#ddd" }}>
          <table className="w-full text-sm">
            <thead style={{ background: "#f5f5f5" }}>
              <tr>
                <th className="px-3 py-2 text-right w-12">کلید</th>
                <th className="px-3 py-2 text-right">متن فارسی</th>
                <th className="px-3 py-2 text-right">متن انگلیسی</th>
                <th className="px-3 py-2 text-right">آدرس تصویر</th>
              </tr>
            </thead>
            <tbody>
              {opts.map((opt, i) => (
                <tr key={opt.option_key} style={{ borderTop: "1px solid #eee" }}>
                  <td className="px-3 py-2 font-bold text-center" style={{ color: "var(--color-primary)" }}>
                    {opt.option_key}
                  </td>
                  <td className="px-3 py-2">
                    <input
                      value={opt.text_fa}
                      onChange={(e) => handleOptChange(i, "text_fa", e.target.value)}
                      style={{ ...fieldStyle, padding: "5px 8px" }}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      value={opt.text_en}
                      onChange={(e) => handleOptChange(i, "text_en", e.target.value)}
                      dir="ltr"
                      style={{ ...fieldStyle, padding: "5px 8px" }}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      value={opt.image_url}
                      onChange={(e) => handleOptChange(i, "image_url", e.target.value)}
                      dir="ltr"
                      style={{ ...fieldStyle, padding: "5px 8px" }}
                      placeholder="/images/opt.png"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 rounded font-medium text-sm text-white"
          style={{ background: isPending ? "#aaa" : "var(--color-primary-btn)", cursor: isPending ? "not-allowed" : "pointer" }}
        >
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/questions")}
          className="px-6 py-2 rounded font-medium text-sm"
          style={{ background: "#e0e0e0", cursor: "pointer" }}
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
