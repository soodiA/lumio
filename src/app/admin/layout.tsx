"use client";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#f1f5f9", fontFamily: "Vazirmatn, sans-serif", direction: "rtl" }}>
      <nav style={{ background: "#1e293b", padding: "12px 24px", borderBottom: "1px solid #334155", display: "flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: "#6366f1" }}>پنل مدیریت لومیو</span>
        <Link href="/admin/questions" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14 }}>سوال‌ها</Link>
        <Link href="/" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, marginLeft: "auto" }}>← بازگشت به بازی</Link>
      </nav>
      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}
