"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

const STAGE_COUNT = 8; // stages 1-8 (years 2014-2021)
const STAGE_TOTALS: Record<number, number> = { 7: 24, 8: 24 }; // default 15
function stageTotal(id: number) { return STAGE_TOTALS[id] ?? 15; }
const STAGE_COLORS = ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC", "#EF5350", "#26C6DA"];
const STAGE_EMOJIS = ["⭐", "🌟", "🔥", "💎", "🚀", "🏆"];

function StagesContent() {
  const params = useSearchParams();
  const grade = params.get("grade") ?? "1-2";
  const [unlockedStages, setUnlockedStages] = useState<number[]>([1]);
  const [scores, setScores] = useState<Record<number, number>>({});

  useEffect(() => {
    const unlockKey = `lumio_unlocked_${grade}`;
    const stored = JSON.parse(localStorage.getItem(unlockKey) ?? "[1]") as number[];
    setUnlockedStages(stored);

    const scoreMap: Record<number, number> = {};
    for (let i = 1; i <= STAGE_COUNT; i++) {
      const val = parseInt(localStorage.getItem(`lumio_score_${grade}_${i}`) ?? "0", 10);
      if (val > 0) scoreMap[i] = val;
    }
    setScores(scoreMap);
  }, [grade]);

  const gradeLabel: Record<string, string> = {
    "1-2": "پایه اول و دوم",
    "3-4": "پایه سوم و چهارم",
    "5-6": "پایه پنجم و ششم",
    "7-8": "پایه هفتم و هشتم",
    "9-10": "پایه نهم و دهم",
    "11-12": "پایه یازدهم و دوازدهم",
  };

  const stages = Array.from({ length: STAGE_COUNT }, (_, i) => ({
    id: i + 1,
    locked: !unlockedStages.includes(i + 1),
    color: STAGE_COLORS[i],
    emoji: STAGE_EMOJIS[i],
    score: scores[i + 1] ?? 0,
  }));

  return (
    <main
      className="flex flex-col flex-1 items-center min-h-screen px-6 py-10"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium mb-1" style={{ color: "#42A5F5" }}>
            {gradeLabel[grade] ?? grade}
          </p>
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
            مراحل آموزشی
          </h1>
          <p className="text-base mt-2" style={{ color: "#777" }}>
            مراحل را یک‌به‌یک باز کن
          </p>
        </div>

        {/* Stage list */}
        <div className="flex flex-col gap-4 relative">
          <div
            className="absolute right-7 top-14 bottom-14 w-0.5"
            style={{ background: "#E5E7EB", zIndex: 0 }}
          />

          {stages.map((stage) => {
            const pct = Math.round((stage.score / stageTotal(stage.id)) * 100);
            return (
              <div key={stage.id} className="flex items-center gap-4 relative" style={{ zIndex: 1 }}>
                {/* Circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: stage.locked ? "#F3F4F6" : stage.color + "25",
                    border: `3px solid ${stage.locked ? "#E5E7EB" : stage.color}`,
                  }}
                >
                  {stage.locked ? "🔒" : stage.emoji}
                </div>

                {/* Card */}
                <div
                  className="flex-1 bg-white rounded-2xl p-4 flex flex-col gap-2"
                  style={{
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    opacity: stage.locked ? 0.6 : 1,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold" style={{ color: "#1a1a1a" }}>
                      مرحله {stage.id}
                    </span>
                    {stage.locked ? (
                      <span
                        className="text-sm font-medium px-3 py-1 rounded-full"
                        style={{ background: "#F3F4F6", color: "#9CA3AF" }}
                      >
                        قفل
                      </span>
                    ) : (
                      <Link
                        href={`/question?grade=${grade}&stage=${stage.id}`}
                        className="text-sm font-bold text-white px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                        style={{ background: stage.color }}
                      >
                        {stage.score > 0 ? "دوباره" : "شروع"}
                      </Link>
                    )}
                  </div>

                  {/* Progress bar */}
                  {!stage.locked && (
                    <div className="flex items-center gap-2">
                      <div
                        className="flex-1 h-2 rounded-full overflow-hidden"
                        style={{ background: "#F3F4F6" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: pct >= 70 ? "#43A047" : pct > 0 ? stage.color : "transparent",
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold w-10 text-right" style={{ color: "#888" }}>
                        {pct > 0 ? `${pct}٪` : "جدید"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default function StagesPage() {
  return (
    <Suspense>
      <StagesContent />
    </Suspense>
  );
}
