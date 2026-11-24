"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { api, getAdminKey, setAdminKey } from "@/lib/api";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  async function check(k: string) {
    setAdminKey(k);
    try {
      await api("/api/v1/admin/questions/0", { admin: true }).catch((e) => { if (e?.status === 403) throw e; });
      setAuthed(true); setError("");
    } catch {
      setAdminKey(""); setAuthed(false); setError(k ? "کلید ادمین اشتباه است" : "");
    }
  }
  useEffect(() => { const k = getAdminKey(); if (k) check(k); else setAuthed(false); }, []);

  const shell = { minHeight: "100vh", background: "#0f172a", color: "#f1f5f9", fontFamily: "Vazirmatn, sans-serif", direction: "rtl" as const };

  if (authed === null) return <div style={shell} />;
  if (!authed) {
    return (
      <div style={{ ...shell, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={(e) => { e.preventDefault(); check(key.trim()); }} style={{ background: "#1e293b", padding: 28, borderRadius: 12, width: 320, display: "flex", flexDirection: "column", gap: 12 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700 }}>پنل مدیریت لومیو</h1>
          <input type="password" dir="ltr" autoFocus value={key} onChange={(e) => setKey(e.target.value)} placeholder="کلید ادمین"
            style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "10px 12px", color: "#f1f5f9" }} />
          {error && <div style={{ color: "#fca5a5", fontSize: 13 }}>{error}</div>}
          <button type="submit" style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", cursor: "pointer" }}>ورود</button>
        </form>
      </div>
    );
  }
  return (
    <div style={shell}>
      <nav style={{ background: "#1e293b", padding: "12px 24px", borderBottom: "1px solid #334155", display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#6366f1" }}>پنل مدیریت لومیو</span>
        <Link href="/admin/questions" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14 }}>سوال‌ها</Link>
        <button onClick={() => { setAdminKey(""); setAuthed(false); }} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 14 }}>خروج</button>
        <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, marginLeft: "auto" }}>← بازگشت به بازی</Link>
      </nav>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}
