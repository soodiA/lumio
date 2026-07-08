"use client";

import { useState } from "react";
import Link from "next/link";

const TOTAL_QUESTIONS = 10;
const CURRENT_QUESTION = 3;

const options = [
  { id: "a", value: "10" },
  { id: "b", value: "11" },
  { id: "c", value: "12" },
  { id: "d", value: "14" },
  { id: "e", value: "16" },
];

const CORRECT_ANSWER = "a"; // 10 is the correct answer for 2,4,6,8,?

export default function QuestionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = selected === CORRECT_ANSWER;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
    setShowHint(false);
  };

  return (
    <main
      className="flex flex-col flex-1 items-center min-h-screen px-6 py-8"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Top bar: progress dots + star */}
        <div className="flex items-center justify-between">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                style={{
                  background:
                    i < CURRENT_QUESTION
                      ? "#42A5F5"
                      : i === CURRENT_QUESTION - 1
                      ? "#42A5F5"
                      : "#D1D5DB",
                  transform: i === CURRENT_QUESTION - 1 ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Stars */}
          <div
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold"
            style={{ background: "#FFF9C4", color: "#F59E0B" }}
          >
            <span>⭐</span>
            <span>۱۲۰</span>
          </div>
        </div>

        {/* Stage label */}
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ background: "#42A5F520", color: "#42A5F5" }}
          >
            مرحله ۱: دنباله‌های عددی
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#E5E7EB" }} />

        {/* Question card */}
        <div
          className="bg-white rounded-3xl p-6 flex flex-col gap-5 transition-all duration-300"
          style={{
            boxShadow: submitted
              ? isCorrect
                ? "0 4px 32px rgba(102,187,106,0.25)"
                : "0 4px 32px rgba(239,83,80,0.20)"
              : "0 4px 32px rgba(0,0,0,0.08)",
            outline: submitted
              ? isCorrect
                ? "2px solid #66BB6A"
                : "2px solid #EF5350"
              : "none",
          }}
        >
          {/* Question number */}
          <p className="text-sm font-medium" style={{ color: "#9CA3AF" }}>
            سوال شماره ۳
          </p>

          {/* Question text */}
          <p className="text-lg font-bold leading-relaxed" style={{ color: "#1a1a1a" }}>
            عدد بعدی را پیدا کن:
          </p>

          {/* Sequence display */}
          <div
            className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl text-2xl font-bold"
            style={{ background: "#F0F9FF", color: "#42A5F5" }}
          >
            <span>۲</span>
            <span style={{ color: "#CBD5E1" }}>—</span>
            <span>۴</span>
            <span style={{ color: "#CBD5E1" }}>—</span>
            <span>۶</span>
            <span style={{ color: "#CBD5E1" }}>—</span>
            <span>۸</span>
            <span style={{ color: "#CBD5E1" }}>—</span>
            <span style={{ color: "#1a1a1a" }}>؟</span>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {options.map((opt) => {
              let borderColor = "#E5E7EB";
              let bg = "white";
              let textColor = "#1a1a1a";

              if (submitted) {
                if (opt.id === CORRECT_ANSWER) {
                  borderColor = "#66BB6A";
                  bg = "#F0FDF4";
                  textColor = "#166534";
                } else if (opt.id === selected && !isCorrect) {
                  borderColor = "#EF5350";
                  bg = "#FFF5F5";
                  textColor = "#991B1B";
                }
              } else if (selected === opt.id) {
                borderColor = "#42A5F5";
                bg = "#EFF6FF";
                textColor = "#1D4ED8";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => !submitted && setSelected(opt.id)}
                  disabled={submitted}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl text-right transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    color: textColor,
                    cursor: submitted ? "default" : "pointer",
                  }}
                >
                  {/* Radio indicator */}
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{
                      border: `2px solid ${borderColor}`,
                      background: selected === opt.id && !submitted ? "#42A5F5" : bg,
                    }}
                  >
                    {submitted && opt.id === CORRECT_ANSWER && (
                      <span style={{ color: "#66BB6A", fontSize: "12px" }}>✓</span>
                    )}
                    {submitted && opt.id === selected && !isCorrect && opt.id !== CORRECT_ANSWER && (
                      <span style={{ color: "#EF5350", fontSize: "10px" }}>✕</span>
                    )}
                    {!submitted && selected === opt.id && (
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: "white" }}
                      />
                    )}
                  </span>

                  <span className="text-lg font-semibold">{opt.value}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback message */}
          {submitted && (
            <div
              className="text-center py-3 px-4 rounded-2xl font-bold text-base transition-all duration-300"
              style={{
                background: isCorrect ? "#F0FDF4" : "#FFF5F5",
                color: isCorrect ? "#166534" : "#991B1B",
              }}
            >
              {isCorrect ? "🎉 آفرین! جواب درسته!" : "😅 اشتباهه، دوباره امتحان کن!"}
            </div>
          )}

          {/* Hint box */}
          {showHint && (
            <div
              className="py-3 px-4 rounded-2xl text-sm leading-relaxed font-medium"
              style={{ background: "#FFFDE7", color: "#92400E", border: "1.5px solid #FFD54F" }}
            >
              💡 نگاه کن: هر عدد ۲ تا بیشتر از قبلیه. ۲، ۴، ۶، ۸... عدد بعدی چقدر میشه؟
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pb-8">
          {/* Hint button */}
          <button
            onClick={() => setShowHint((v) => !v)}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "#FFD54F", color: "#78350F" }}
          >
            <span>💡</span>
            <span>راهنما</span>
          </button>

          {/* Continue / Reset button */}
          {submitted ? (
            isCorrect ? (
              <Link
                href="/result"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-base text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "#43A047" }}
              >
                <span>ادامه</span>
                <span>▶</span>
              </Link>
            ) : (
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-base text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ background: "#EF5350" }}
              >
                <span>دوباره</span>
                <span>🔄</span>
              </button>
            )
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-base text-white transition-all duration-200"
              style={{
                background: selected ? "#43A047" : "#D1D5DB",
                cursor: selected ? "pointer" : "not-allowed",
                transform: selected ? undefined : "none",
              }}
            >
              <span>ادامه</span>
              <span>▶</span>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
