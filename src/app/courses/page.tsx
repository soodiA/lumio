import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "آمادگی کانگورو سوم",
    emoji: "🦘",
    description: "سوال‌های سطح پایه برای پایه سوم",
    color: "#4CAF50",
  },
  {
    id: 2,
    title: "تمرین الگوها",
    emoji: "🔷",
    description: "پیدا کردن الگو در دنباله‌های عددی",
    color: "#42A5F5",
  },
  {
    id: 3,
    title: "چالش منطق",
    emoji: "🧩",
    description: "مسائل منطقی و پازل ریاضی",
    color: "#FFD54F",
  },
];

export default function CoursesPage() {
  return (
    <main
      className="flex flex-col flex-1 items-center min-h-screen px-6 py-10"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
            دوره‌ات را انتخاب کن
          </h1>
          <p className="text-base mt-2" style={{ color: "#777" }}>
            یک دوره را انتخاب کن و شروع کن
          </p>
        </div>

        {/* Course cards */}
        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/stages?course=${course.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
            >
              {/* Colored icon circle */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: course.color + "20" }}
              >
                {course.emoji}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-base font-bold" style={{ color: "#1a1a1a" }}>
                  {course.title}
                </span>
                <span className="text-sm" style={{ color: "#888" }}>
                  {course.description}
                </span>
              </div>

              {/* Arrow indicator (RTL: pointing left) */}
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
