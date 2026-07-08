import Link from "next/link";

const stages = [
  {
    id: 1,
    name: "دنباله‌های عددی",
    emoji: "🔢",
    color: "#42A5F5",
    locked: false,
    questions: 10,
  },
  {
    id: 2,
    name: "الگوهای شکلی",
    emoji: "🔶",
    color: "#66BB6A",
    locked: true,
    questions: 10,
  },
  {
    id: 3,
    name: "مسائل کلامی",
    emoji: "📖",
    color: "#FFD54F",
    locked: true,
    questions: 10,
  },
  {
    id: 4,
    name: "هندسه ساده",
    emoji: "📐",
    color: "#AB47BC",
    locked: true,
    questions: 10,
  },
  {
    id: 5,
    name: "چالش نهایی",
    emoji: "🏆",
    color: "#EF5350",
    locked: true,
    questions: 15,
  },
];

export default function StagesPage() {
  return (
    <main
      className="flex flex-col flex-1 items-center min-h-screen px-6 py-10"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
            مراحل دوره
          </h1>
          <p className="text-base mt-2" style={{ color: "#777" }}>
            مراحل را یک‌به‌یک باز کن
          </p>
        </div>

        {/* Stage list */}
        <div className="flex flex-col gap-4 relative">
          {/* Connector line */}
          <div
            className="absolute right-7 top-14 bottom-14 w-0.5"
            style={{ background: "#E5E7EB", zIndex: 0 }}
          />

          {stages.map((stage) => (
            <div
              key={stage.id}
              className="flex items-center gap-4 relative"
              style={{ zIndex: 1 }}
            >
              {/* Stage icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-200"
                style={{
                  background: stage.locked ? "#F3F4F6" : stage.color + "25",
                  border: `3px solid ${stage.locked ? "#E5E7EB" : stage.color}`,
                }}
              >
                {stage.locked ? "🔒" : stage.emoji}
              </div>

              {/* Stage info card */}
              <div
                className="flex-1 bg-white rounded-2xl p-4 flex items-center justify-between"
                style={{
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  opacity: stage.locked ? 0.6 : 1,
                }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="text-base font-bold"
                    style={{ color: "#1a1a1a" }}
                  >
                    مرحله {stage.id}: {stage.name}
                  </span>
                  <span className="text-sm" style={{ color: "#888" }}>
                    {stage.questions} سوال
                  </span>
                </div>

                {stage.locked ? (
                  <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "#F3F4F6", color: "#9CA3AF" }}>
                    قفل
                  </span>
                ) : (
                  <Link
                    href={`/question?stage=${stage.id}`}
                    className="text-sm font-bold text-white px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ background: stage.color }}
                  >
                    شروع
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
