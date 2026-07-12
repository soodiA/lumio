"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("رمز باید حداقل ۶ کاراکتر باشد"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) {
      setError(error.message.includes("already") ? "این ایمیل قبلاً ثبت شده" : "خطا در ثبت‌نام");
    } else {
      router.push("/grade");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col flex-1 items-center justify-center min-h-screen px-6" style={{ background: "#FFFDF7" }}>
      <div className="w-full max-w-sm bg-white rounded-3xl flex flex-col gap-6 py-10 px-8" style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>
        <div className="text-center">
          <div className="text-5xl mb-3">🚀</div>
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>ثبت‌نام در Lumio</h1>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#555" }}>نام نمایشی</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
              dir="rtl"
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-all"
              style={{ border: "2px solid #E5E7EB", background: "#FAFAFA" }}
              onFocus={e => e.target.style.borderColor = "#42A5F5"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              placeholder="مثلاً: علی محمدی"
            />
          </div>

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
              placeholder="حداقل ۶ کاراکتر"
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
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <p className="text-center text-sm" style={{ color: "#777" }}>
          حساب داری؟{" "}
          <Link href="/login" className="font-bold" style={{ color: "#42A5F5" }}>
            ورود
          </Link>
        </p>
      </div>
    </main>
  );
}
