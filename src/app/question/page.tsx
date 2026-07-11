"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { questions, QuestionOption } from "@/data/questions";

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getCoinsFromStorage(): number {
  if (typeof window === "undefined") return 0;
  try { return parseInt(localStorage.getItem("lumio_coins") ?? "0", 10); } catch { return 0; }
}

function setCoinsToStorage(coins: number) {
  try { localStorage.setItem("lumio_coins", String(Math.max(0, coins))); } catch { /* ignore */ }
}

function QuestionContent() {
  const params = useSearchParams();
  const router = useRouter();

  const grade = params.get("grade") ?? "1-2";
  const stage = parseInt(params.get("stage") ?? "1", 10);
  const qIndex = parseInt(params.get("q") ?? "0", 10);

  // Coins per correct answer: stages 1-4 → 5, stages 5+ → 2
  const coinsPerCorrect = stage <= 4 ? 5 : 2;

  // Build the question list for this stage (seeded by stage so same order on retry)
  const stageQuestions = useMemo(() => {
    const pool = questions.filter((q) => q.grade_group === grade && q.stage === stage);
    if (pool.length === 0) return questions.slice(0, 10);
    return shuffleWithSeed(pool, stage * 1000 + grade.charCodeAt(0));
  }, [grade, stage]);

  const totalQuestions = stageQuestions.length;

  const currentQuestion = stageQuestions[qIndex];

  // Shuffle option content into random A-E positions each attempt
  const { shuffledOptions, effectiveCorrect } = useMemo(() => {
    const LETTERS = ["A", "B", "C", "D", "E"];
    const copy = [...currentQuestion.options];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    const mapped = copy.map((o, idx) => ({ ...o, id: LETTERS[idx] }));
    const eff = mapped.find((o) => {
      if (o.image_url) return o.image_url.endsWith(`/${currentQuestion.correct}`);
      return o.text_en === currentQuestion.correct;
    })?.id ?? mapped[0].id;
    return { shuffledOptions: mapped, effectiveCorrect: eff };
  }, [qIndex, grade, stage, currentQuestion]);

  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [coins, setCoins] = useState(0);
  const [coinDelta, setCoinDelta] = useState<number | null>(null);

  // Load coins once on mount
  useEffect(() => {
    setCoins(getCoinsFromStorage());
  }, []);

  // Reset per-question state whenever the question index changes
  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
    setShowHint(false);
    setCoinDelta(null);
  }, [qIndex, grade, stage]);

  const isCorrect = selected === effectiveCorrect;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);

    let delta = 0;
    if (selected === effectiveCorrect) {
      delta = coinsPerCorrect;
    }
    const newCoins = Math.max(0, coins + delta);
    setCoins(newCoins);
    setCoinsToStorage(newCoins);
    if (delta !== 0) setCoinDelta(delta);
  };

  const handleHint = () => {
    if (showHint) { setShowHint(false); return; }
    setShowHint(true);
    const newCoins = Math.max(0, coins - 10);
    setCoins(newCoins);
    setCoinsToStorage(newCoins);
    setCoinDelta(-10);
    setTimeout(() => setCoinDelta(null), 1500);
  };

  const safeSession = {
    get: (key: string) => { try { return sessionStorage.getItem(key); } catch { return null; } },
    set: (key: string, val: string) => { try { sessionStorage.setItem(key, val); } catch { /* ignore */ } },
    remove: (key: string) => { try { sessionStorage.removeItem(key); } catch { /* ignore */ } },
  };

  const handleNext = () => {
    const nextQ = qIndex + 1;
    const key = `lumio_session_${grade}_${stage}`;
    if (!isCorrect) {
      const prev = parseInt(safeSession.get(key) ?? "0", 10);
      safeSession.set(key, String(prev + 1));
    }

    if (nextQ >= totalQuestions) {
      const wrongCount = parseInt(safeSession.get(key) ?? "0", 10);
      safeSession.remove(key);
      router.push(`/result?grade=${grade}&stage=${stage}&wrong=${wrongCount}`);
    } else {
      router.push(`/question?grade=${grade}&stage=${stage}&q=${nextQ}`);
    }
  };

  if (!currentQuestion) return null;

  return (
    <main
      className="flex flex-col flex-1 items-center min-h-screen px-6 py-8"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                style={{
                  background: i <= qIndex ? "#42A5F5" : "#D1D5DB",
                  transform: i === qIndex ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
          {/* Coins */}
          <div className="relative">
            <div
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{ background: "#FFF9C4", color: "#F59E0B" }}
            >
              <span>🪙</span>
              <span>{coins}</span>
            </div>
            {coinDelta !== null && (
              <span
                className="absolute -top-5 left-1/2 -translate-x-1/2 text-sm font-bold animate-bounce"
                style={{ color: coinDelta > 0 ? "#43A047" : "#EF5350" }}
              >
                {coinDelta > 0 ? `+${coinDelta}` : coinDelta}
              </span>
            )}
          </div>
        </div>

        {/* Stage label */}
        <div>
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ background: "#42A5F520", color: "#42A5F5" }}
          >
            مرحله {stage} — سوال {qIndex + 1} از {totalQuestions}
          </span>
        </div>

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
          {/* Question number + translation toggle */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium" style={{ color: "#9CA3AF" }}>
              سوال {qIndex + 1}
            </p>
            <button
              onClick={() => setShowTranslation((v) => !v)}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: showTranslation ? "#42A5F5" : "#F3F4F6",
                color: showTranslation ? "white" : "#6B7280",
              }}
            >
              🌐 {showTranslation ? "پنهان ترجمه" : "نمایش ترجمه"}
            </button>
          </div>

          {/* Text block 1 */}
          <div>
            <p dir="ltr" className="text-base font-bold leading-relaxed text-left" style={{ color: "#1a1a1a" }}>
              {currentQuestion.text_en}
            </p>
            {showTranslation && (
              <p dir="rtl" className="mt-2 text-sm leading-relaxed text-right" style={{ color: "#6B7280" }}>
                {currentQuestion.text_fa}
              </p>
            )}
          </div>

          {/* Image 1 */}
          {currentQuestion.question_image_url && (
            currentQuestion.question_image_small ? (
              <div className="flex justify-center">
                <Image src={currentQuestion.question_image_url} alt="question image"
                  width={150} height={150} className="object-contain"
                  style={{ maxWidth: 150, maxHeight: 150 }} unoptimized />
              </div>
            ) : currentQuestion.question_image_strip ? (
              <div className="rounded-2xl border border-gray-100 overflow-x-auto">
                <Image src={currentQuestion.question_image_url} alt="question image"
                  width={900} height={120} className="h-auto object-contain"
                  style={{ minWidth: 600, minHeight: 100 }} unoptimized />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border border-gray-100">
                <Image src={currentQuestion.question_image_url} alt="question image"
                  width={480} height={200} className="w-full h-auto object-contain" unoptimized />
              </div>
            )
          )}

          {/* Text block 2 */}
          {currentQuestion.text_en_2 && (
            <div>
              <p dir="ltr" className="text-base font-bold leading-relaxed text-left" style={{ color: "#1a1a1a" }}>
                {currentQuestion.text_en_2}
              </p>
              {showTranslation && currentQuestion.text_fa_2 && (
                <p dir="rtl" className="mt-2 text-sm leading-relaxed text-right" style={{ color: "#6B7280" }}>
                  {currentQuestion.text_fa_2}
                </p>
              )}
            </div>
          )}

          {/* Image 2 */}
          {currentQuestion.question_extra_images?.[0] && (
            <div className="flex justify-center">
              <Image src={currentQuestion.question_extra_images[0]} alt="question image"
                width={150} height={150} className="object-contain max-w-full h-auto"
                style={{ maxHeight: 150 }} unoptimized />
            </div>
          )}

          {/* Text block 3 */}
          {currentQuestion.text_en_3 && (
            <div>
              <p dir="ltr" className="text-base font-bold leading-relaxed text-left" style={{ color: "#1a1a1a" }}>
                {currentQuestion.text_en_3}
              </p>
              {showTranslation && currentQuestion.text_fa_3 && (
                <p dir="rtl" className="mt-2 text-sm leading-relaxed text-right" style={{ color: "#6B7280" }}>
                  {currentQuestion.text_fa_3}
                </p>
              )}
            </div>
          )}

          {/* Image 3 */}
          {currentQuestion.question_extra_images?.[1] && (
            <div className="flex justify-center">
              <Image src={currentQuestion.question_extra_images[1]} alt="question image"
                width={150} height={150} className="object-contain max-w-full h-auto"
                style={{ maxHeight: 150 }} unoptimized />
            </div>
          )}

          {/* Options */}
          <div className="flex flex-col gap-3">
            {shuffledOptions.map((opt) => {
              let borderColor = "#E5E7EB";
              let bg = "white";
              let textColor = "#1a1a1a";

              if (submitted) {
                if (opt.id === effectiveCorrect) {
                  borderColor = "#66BB6A"; bg = "#F0FDF4"; textColor = "#166534";
                } else if (opt.id === selected && !isCorrect) {
                  borderColor = "#EF5350"; bg = "#FFF5F5"; textColor = "#991B1B";
                }
              } else if (selected === opt.id) {
                borderColor = "#42A5F5"; bg = "#EFF6FF"; textColor = "#1D4ED8";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => !submitted && setSelected(opt.id)}
                  disabled={submitted}
                  className="w-full flex flex-col gap-2 p-3 rounded-2xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    color: textColor,
                    cursor: submitted ? "default" : "pointer",
                  }}
                >
                  {opt.image_url && (
                    <div className="w-full flex justify-center">
                      <Image
                        src={opt.image_url}
                        alt={opt.text_en}
                        width={200}
                        height={160}
                        className="object-contain max-w-full h-auto"
                        style={{ maxHeight: 160 }}
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{
                        border: `2px solid ${borderColor}`,
                        background: selected === opt.id && !submitted ? "#42A5F5" : bg,
                        color: selected === opt.id && !submitted ? "white" : textColor,
                      }}
                    >
                      {submitted && opt.id === effectiveCorrect
                        ? "✓"
                        : submitted && opt.id === selected && !isCorrect
                        ? "✕"
                        : opt.id}
                    </span>
                    <span className="flex flex-col gap-0.5 flex-1">
                      {!opt.image_url && (
                        <span dir="ltr" className="text-base font-semibold text-left block">{opt.text_en}</span>
                      )}
                      {showTranslation && !opt.image_url && (
                        <span dir="rtl" className="text-xs text-right block" style={{ color: "#6B7280" }}>
                          {opt.text_fa}
                        </span>
                      )}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {submitted && (
            <div
              className="text-center py-3 px-4 rounded-2xl font-bold text-base"
              style={{
                background: isCorrect ? "#F0FDF4" : "#FFF5F5",
                color: isCorrect ? "#166534" : "#991B1B",
              }}
            >
              {isCorrect
                ? `🎉 آفرین! +${coinsPerCorrect} سکه`
                : "😅 اشتباه بود — جواب درست نشان داده شد"}
            </div>
          )}

          {/* Hint */}
          {showHint && (
            <div
              className="py-3 px-4 rounded-2xl text-sm leading-relaxed font-medium"
              style={{ background: "#FFFDE7", color: "#92400E", border: "1.5px solid #FFD54F" }}
            >
              💡 {currentQuestion.text_fa}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pb-8">
          <button
            onClick={handleHint}
            disabled={submitted}
            className="flex items-center gap-2 px-4 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40"
            style={{ background: "#FFD54F", color: "#78350F" }}
          >
            <span>💡</span>
            <span>راهنما −۱۰</span>
          </button>

          {submitted ? (
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-base text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: isCorrect ? "#43A047" : "#6B7280" }}
            >
              <span>{qIndex + 1 >= totalQuestions ? "نتیجه" : "سوال بعد"}</span>
              <span>▶</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-bold text-base text-white transition-all duration-200"
              style={{
                background: selected ? "#43A047" : "#D1D5DB",
                cursor: selected ? "pointer" : "not-allowed",
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

export default function QuestionPage() {
  return (
    <Suspense>
      <QuestionContent />
    </Suspense>
  );
}
