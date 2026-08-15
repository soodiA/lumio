import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <nav
        className="border-b px-6 py-3 flex items-center gap-6"
        style={{ borderColor: "#e0e0e0", background: "#fff" }}
      >
        <span className="font-bold text-lg" style={{ color: "var(--color-primary)" }}>
          پنل مدیریت Lumio
        </span>
        <Link
          href="/admin/questions"
          className="text-sm hover:underline"
          style={{ color: "var(--foreground)" }}
        >
          سوال‌ها
        </Link>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
