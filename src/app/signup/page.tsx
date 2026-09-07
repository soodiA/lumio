"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { usernameToEmail, validateUsername, validatePhone } from "@/lib/username-auth";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const usernameErr = validateUsername(username);
    if (usernameErr) { setError(usernameErr); return; }
    const phoneErr = validatePhone(phone);
    if (phoneErr) { setError(phoneErr); return; }
    if (password.length < 6) { setError("رمز باید حداقل ۶ کاراکتر باشد"); return; }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: usernameToEmail(username),
        password,
        options: { data: { username: username.trim(), display_name: username.trim(), phone: phone.trim() } },
      });
      if (error) {
        if (/duplicate|unique|already/i.test(error.message)) {
          setError("این نام کاربری قبلاً استفاده شده");
        } else if (/rate limit|security purposes/i.test(error.message)) {
          setError("سیستم موقتاً درخواست‌های ثبت‌نام رو محدود کرده (به‌خاطر تنظیم ایمیل تأیید در سوپابیس). چند دقیقه صبر کن یا این تنظیم رو خاموش کن");
        } else if (/password/i.test(error.message)) {
          setError("رمز عبور معتبر نیست: " + error.message);
        } else if (/email/i.test(error.message) && /format|invalid/i.test(error.message)) {
          setError("نام کاربری معتبر نیست، لطفاً حروف/اعداد دیگری امتحان کن");
        } else {
          setError(`خطا در ثبت‌نام: ${error.message}`);
        }
      } else {
        router.push("/grade");
      }
    } catch {
      setError("خطا در اتصال به سرور. اتصال اینترنت را بررسی کن و دوباره تلاش کن");
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
            <label className="text-sm font-medium" style={{ color: "#555" }}>نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-all"
              style={{ border: "2px solid #E5E7EB", background: "#FAFAFA" }}
              onFocus={e => e.target.style.borderColor = "#42A5F5"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              placeholder="مثلاً: ali_1234"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#555" }}>شماره تلفن</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-all"
              style={{ border: "2px solid #E5E7EB", background: "#FAFAFA" }}
              onFocus={e => e.target.style.borderColor = "#42A5F5"}
              onBlur={e => e.target.style.borderColor = "#E5E7EB"}
              placeholder="09123456789"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#555" }}>رمز عبور</label>
            <input
              type={showPassword ? "text" : "password"}
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
            <label className="flex items-center gap-2 text-sm mt-1" style={{ color: "#777" }}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={e => setShowPassword(e.target.checked)}
              />
              نمایش رمز عبور
            </label>
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
