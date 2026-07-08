import Link from "next/link";

const grades = [
  { id: 1, label: "پایه اول", emoji: "🐣" },
  { id: 2, label: "پایه دوم", emoji: "🐥" },
  { id: 3, label: "پایه سوم", emoji: "🦊" },
  { id: 4, label: "پایه چهارم", emoji: "🦁" },
  { id: 5, label: "پایه پنجم", emoji: "🚀" },
];

export default function GradePage() {
  return (
    <main
      className="flex flex-col flex-1 items-center min-h-screen px-6 py-10"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
            پایه‌ات را انتخاب کن
          </h1>
          <p className="text-base mt-2" style={{ color: "#777" }}>
            درسی که در آن هستی را بزن
          </p>
        </div>

        {/* Grade cards grid */}
        <div className="grid grid-cols-2 gap-4">
          {grades.map((grade) => (
            <Link
              key={grade.id}
              href={`/courses?grade=${grade.id}`}
              className="flex flex-col items-center gap-3 bg-white rounded-2xl py-6 px-4 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
            >
              <span className="text-4xl leading-none">{grade.emoji}</span>
              <span className="text-base font-semibold" style={{ color: "#333" }}>
                {grade.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
