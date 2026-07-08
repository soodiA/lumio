import Link from "next/link";

export default function SplashPage() {
  return (
    <main
      className="flex flex-col flex-1 items-center justify-center min-h-screen px-6"
      style={{ background: "#FFFDF7" }}
    >
      <div
        className="w-full max-w-sm bg-white rounded-3xl flex flex-col items-center gap-6 py-10 px-8"
        style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
      >
        {/* Star emoji */}
        <div className="text-7xl leading-none select-none" aria-hidden="true">
          🌟
        </div>

        {/* Headline */}
        <h1
          className="text-3xl font-bold text-center leading-snug"
          style={{ color: "#1a1a1a" }}
        >
          امروز آماده‌ای؟
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg text-center leading-relaxed"
          style={{ color: "#555555" }}
        >
          سه چالش جدید را حل کنی؟
        </p>

        {/* CTA */}
        <Link
          href="/grade"
          className="mt-2 w-full flex items-center justify-center text-white text-xl font-bold py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: "#43A047" }}
        >
          شروع
        </Link>
      </div>

      {/* Decorative dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: i === 0 ? "#4CAF50" : "#D1D5DB" }}
          />
        ))}
      </div>
    </main>
  );
}
