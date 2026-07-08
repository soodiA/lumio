import Link from "next/link";

const gradeGroups = [
  { id: "1-2", label: "پایه اول و دوم", emoji: "🐣", color: "#42A5F5" },
  { id: "3-4", label: "پایه سوم و چهارم", emoji: "🦊", color: "#66BB6A" },
  { id: "5-6", label: "پایه پنجم و ششم", emoji: "🦁", color: "#FFA726" },
  { id: "7-8", label: "پایه هفتم و هشتم", emoji: "🚀", color: "#AB47BC" },
  { id: "9-10", label: "پایه نهم و دهم", emoji: "⚡", color: "#EF5350" },
  { id: "11-12", label: "پایه یازدهم و دوازدهم", emoji: "🏆", color: "#26C6DA" },
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
            گروه پایه‌ات را انتخاب کن
          </h1>
          <p className="text-base mt-2" style={{ color: "#777" }}>
            سوال‌های کانگورو بر اساس گروه‌های دو پایه‌ای طراحی شده‌اند
          </p>
        </div>

        {/* Grade group cards */}
        <div className="flex flex-col gap-3">
          {gradeGroups.map((group) => (
            <Link
              key={group.id}
              href={`/stages?grade=${group.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: group.color + "20" }}
              >
                {group.emoji}
              </div>
              <span className="text-base font-semibold" style={{ color: "#1a1a1a" }}>
                {group.label}
              </span>
              <div className="mr-auto text-xl" style={{ color: "#ccc" }}>
                ‹
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
