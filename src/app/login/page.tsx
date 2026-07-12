"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("ایمیل یا رمز اشتباه است");
    } else {
      router.push("/grade");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col flex-1 items-center justify-center min-h-screen px-6" style={{ background: "#FFFDF7" }}>
      <div className="w-full max-w-sm bg-white rounded-3xl flex flex-col gap-6 py-10 px-8" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>
        <div className="text-center">
          <div className="text-5xl mb-3">🌟</div>
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>ورود به Lumio</h1>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#555" }}>ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-all"
              style={{ border: "2px solid #E5E7EB", background: "#FAFAFA" }}
              onFocus={e => e.target.style.borderColor = "#42A5F5"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              placeholder="example@email.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#555" }}>رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-all"
              style={{ border: "2px solid #E5E7EB", background: "#FAFAFA" }}
              onFocus={e => e.target.style.borderColor = "#42A5F5"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-center" style={{ color: "#EF5350" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-bold text-base transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
            style={{ background: "#43A047" }}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p className="text-center text-sm" style={{ color: "#777" }}>
          حساب نداری؟{" "}
          <Link href="/signup" className="font-bold" style={{ color: "#42A5F5" }}>
            ثبت‌نام
          </Link>
        </p>
      </div>
    </main>
  );
}
