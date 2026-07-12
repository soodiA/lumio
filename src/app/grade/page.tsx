"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const gradeGroups = [
  { id: "1-2", label: "پایه اول و دوم", emoji: "🐣", color: "#42A5F5" },
  { id: "3-4", label: "پایه سوم و چهارم", emoji: "🦊", color: "#66BB6A" },
  { id: "5-6", label: "پایه پنجم و ششم", emoji: "🦁", color: "#FFA726" },
  { id: "7-8", label: "پایه هفتم و هشتم", emoji: "🚀", color: "#AB47BC" },
  { id: "9-10", label: "پایه نهم و دهم", emoji: "⚡", color: "#EF5350" },
  { id: "11-12", label: "پایه یازدهم و دوازدهم", emoji: "🏆", color: "#26C6DA" },
];

export default function GradePage() {
  const { user } = useAuth();

  return (
    <main
      className="flex flex-col flex-1 items-center min-h-screen px-6 py-10"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
              گروه پایه‌ات را انتخاب کن
            </h1>
            <p className="text-sm mt-1" style={{ color: "#777" }}>
              سوال‌های کانگورو بر اساس گروه‌های دو پایه‌ای
            </p>
          </div>
          <Link href={user ? "/profile" : "/login"} className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "#F3F4F6" }}>
            👤
          </Link>
        </div>

        {/* Quick nav */}
        <div className="flex gap-3 mb-6">
          <Link
            href="/league"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm"
            style={{ background: "#FFF8E1", color: "#F59E0B" }}
          >
            🏆 لیگ
          </Link>
          <Link
            href="/friends"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm"
            style={{ background: "#EFF6FF", color: "#42A5F5" }}
          >
            👥 دوستان
          </Link>
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
