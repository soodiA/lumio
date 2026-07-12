"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface LeaderboardRow {
  user_id: string;
  display_name: string;
  total_points: number;
  total_stars: number;
  stages_completed: number;
}

const MEDAL = ["🥇", "🥈", "🥉"];

export default function LeaguePage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("leaderboard")
      .select("user_id, display_name, total_points, total_stars, stages_completed")
      .order("total_points", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setRows((data as LeaderboardRow[]) ?? []);
        setLoading(false);
      });
  }, []);

  const myRank = rows.findIndex(r => r.user_id === user?.id) + 1;

  return (
    <main className="flex flex-col flex-1 items-center min-h-screen px-6 py-10" style={{ background: "#FFFDF7" }}>
      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link href="/grade" className="text-2xl">←</Link>
          <h1 className="text-xl font-bold" style={{ color: "#1a1a1a" }}>لیگ</h1>
        </div>

        {/* My rank chip */}
        {user && myRank > 0 && (
          <div className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <span className="text-sm font-medium" style={{ color: "#777" }}>رتبه من</span>
            <span className="text-lg font-bold" style={{ color: "#42A5F5" }}>#{myRank}</span>
          </div>
        )}

        {/* Leaderboard */}
        {loading ? (
          <div className="text-center py-12 text-4xl">⏳</div>
        ) : rows.length === 0 ? (
          <div className="text-center py-12" style={{ color: "#888" }}>هنوز کسی امتیازی ندارد</div>
        ) : (
          <div className="flex flex-col gap-3">
            {rows.map((row, i) => {
              const isMe = row.user_id === user?.id;
              return (
                <div
                  key={row.user_id}
                  className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    border: isMe ? "2px solid #42A5F5" : "2px solid transparent",
                  }}
                >
                  <span className="text-xl w-8 text-center flex-shrink-0">
                    {i < 3 ? MEDAL[i] : `#${i + 1}`}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate" style={{ color: isMe ? "#42A5F5" : "#1a1a1a" }}>
                      {row.display_name}{isMe ? " (من)" : ""}
                    </p>
                    <p className="text-xs" style={{ color: "#888" }}>
                      {row.stages_completed} مرحله · {row.total_stars}⭐
                    </p>
                  </div>
                  <span className="font-bold text-base" style={{ color: "#43A047" }}>
                    {row.total_points.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
