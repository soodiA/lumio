"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const MAX_WRONG_TO_PASS = 3;

function ResultContent() {
  const params = useSearchParams();
  const grade = params.get("grade") ?? "1-2";
  const stage = parseInt(params.get("stage") ?? "1", 10);
  const wrongCount = parseInt(params.get("wrong") ?? "0", 10);
  const totalQuestions = parseInt(params.get("total") ?? (stage >= 7 ? "24" : "15"), 10);
  const correctCount = totalQuestions - wrongCount;
  const passed = wrongCount <= MAX_WRONG_TO_PASS;

  const [totalCoins, setTotalCoins] = useState(0);

  useEffect(() => {
    const coins = parseInt(localStorage.getItem("lumio_coins") ?? "0", 10);
    setTotalCoins(coins);

    // Save best score for this stage
    const scoreKey = `lumio_score_${grade}_${stage}`;
    const prevBest = parseInt(localStorage.getItem(scoreKey) ?? "0", 10);
    if (correctCount > prevBest) {
      localStorage.setItem(scoreKey, String(correctCount));
    }

    // Unlock next stage if passed
    if (passed) {
      const key = `lumio_unlocked_${grade}`;
      const current = JSON.parse(localStorage.getItem(key) ?? "[1]") as number[];
      const nextStage = stage + 1;
      if (!current.includes(nextStage)) {
        current.push(nextStage);
        localStorage.setItem(key, JSON.stringify(current));
      }
    }
  }, [grade, stage, passed, correctCount]);

  const stars = wrongCount === 0 ? 3 : wrongCount === 1 ? 2 : wrongCount === 2 ? 1 : 0;

  const gradeLabel: Record<string, string> = {
    "1-2": "پایه ۱ و ۲",
    "3-4": "پایه ۳ و ۴",
    "5-6": "پایه ۵ و ۶",
    "7-8": "پایه ۷ و ۸",
    "9-10": "پایه ۹ و ۱۰",
    "11-12": "پایه ۱۱ و ۱۲",
  };

  return (
    <main
      className="flex flex-col flex-1 items-center justify-center min-h-screen px-6 py-10"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        {/* Emoji */}
        <div className="text-7xl leading-none select-none animate-bounce">
          {passed ? "🎉" : "💪"}
        </div>

        {/* Message */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
            {passed ? `مرحله ${stage} تمام شد!` : "این بار نشد!"}
          </h1>
          <p className="text-base" style={{ color: "#555" }}>
            {passed
              ? "عالی بود، ادامه بده!"
              : `برای رفتن به مرحله بعد باید حداکثر ${MAX_WRONG_TO_PASS} اشتباه داشته باشی`}
          </p>
        </div>

        {/* Score card */}
        <div
          className="w-full bg-white rounded-3xl p-6 flex flex-col items-center gap-6"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
        >
          {/* Score fraction */}
          <div className="flex flex-col items-center gap-1 w-full">
            <div className="flex items-end gap-1">
              <span
                className="text-5xl font-bold"
                style={{ color: passed ? "#43A047" : "#EF5350" }}
              >
                {correctCount}
              </span>
              <span className="text-2xl font-medium mb-1" style={{ color: "#9CA3AF" }}>
                از {totalQuestions}
              </span>
            </div>
            <div
              className="w-full h-2 rounded-full mt-2"
              style={{ background: "#E5E7EB" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(correctCount / totalQuestions) * 100}%`,
                  background: passed ? "#43A047" : "#EF5350",
                }}
              />
            </div>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
              {wrongCount} اشتباه
            </p>
          </div>

          <div style={{ width: "100%", height: "1px", background: "#F3F4F6" }} />

          {/* Rewards */}
          <div className="flex items-center justify-around w-full gap-4">
            {/* Stars */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1 text-2xl">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ filter: i < stars ? "none" : "grayscale(1) opacity(0.3)" }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: "#888" }}>
                ستاره
              </span>
            </div>

            <div style={{ width: "1px", height: "48px", background: "#F3F4F6" }} />

            {/* Total coins */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl">🪙</span>
                <span className="text-2xl font-bold" style={{ color: "#F59E0B" }}>
                  {totalCoins}
                </span>
              </div>
              <span className="text-sm font-medium" style={{ color: "#888" }}>
                کل سکه
              </span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        {passed ? (
          <Link
            href={`/stages?grade=${grade}`}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-white text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "#43A047" }}
          >
            <span>مرحله بعد</span>
            <span>▶</span>
          </Link>
        ) : (
          <Link
            href={`/question?grade=${grade}&stage=${stage}&q=0`}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-white text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "#EF5350" }}
          >
            <span>دوباره امتحان کن</span>
            <span>↺</span>
          </Link>
        )}

        <Link
          href={`/stages?grade=${grade}`}
          className="text-sm font-medium underline underline-offset-2"
          style={{ color: "#9CA3AF" }}
        >
          {passed ? "برگشت به مراحل" : "برگشت به مراحل"}
        </Link>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
