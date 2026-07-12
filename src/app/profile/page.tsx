"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="flex flex-col flex-1 items-center justify-center min-h-screen" style={{ background: "#FFFDF7" }}>
        <div className="text-4xl">⏳</div>
      </main>
    );
  }

  const displayName = user.user_metadata?.display_name ?? user.email ?? "کاربر";
  const avatarLetter = displayName[0]?.toUpperCase() ?? "?";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <main className="flex flex-col flex-1 items-center min-h-screen px-6 py-10" style={{ background: "#FFFDF7" }}>
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link href="/grade" className="text-2xl">←</Link>
          <h1 className="text-xl font-bold" style={{ color: "#1a1a1a" }}>پروفایل</h1>
        </div>

        {/* Avatar card */}
        <div className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
            style={{ background: "#42A5F5" }}
          >
            {avatarLetter}
          </div>
          <div className="text-center">
            <p className="text-xl font-bold" style={{ color: "#1a1a1a" }}>{displayName}</p>
            <p className="text-sm mt-1" style={{ color: "#888" }} dir="ltr">{user.email}</p>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full py-3 rounded-full font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: "#FEE2E2", color: "#EF5350" }}
        >
          خروج از حساب
        </button>
      </div>
    </main>
  );
}
