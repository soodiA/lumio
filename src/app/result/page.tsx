import Link from "next/link";

const SCORE = 8;
const TOTAL = 10;
const STARS = 3;
const COINS = 50;

export default function ResultPage() {
  return (
    <main
      className="flex flex-col flex-1 items-center justify-center min-h-screen px-6 py-10"
      style={{ background: "#FFFDF7" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        {/* Celebration emoji */}
        <div className="text-7xl leading-none select-none animate-bounce" aria-hidden="true">
          🎉
        </div>

        {/* Stage completion message */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
            مرحله ۱ تمام شد!
          </h1>
          <p className="text-base" style={{ color: "#555" }}>
            عالی بود، ادامه بده!
          </p>
        </div>

        {/* Score card */}
        <div
          className="w-full bg-white rounded-3xl p-6 flex flex-col items-center gap-6"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
        >
          {/* Score fraction */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-end gap-1">
              <span className="text-5xl font-bold" style={{ color: "#43A047" }}>
                {SCORE}
              </span>
              <span className="text-2xl font-medium mb-1" style={{ color: "#9CA3AF" }}>
                از {TOTAL}
              </span>
            </div>
            <div
              className="w-full h-2 rounded-full mt-2"
              style={{ background: "#E5E7EB", minWidth: "160px" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(SCORE / TOTAL) * 100}%`,
                  background: "#43A047",
                }}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: "1px", background: "#F3F4F6" }} />

          {/* Rewards row */}
          <div className="flex items-center justify-around w-full gap-4">
            {/* Stars */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1 text-2xl">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      filter: i < STARS ? "none" : "grayscale(1) opacity(0.3)",
                    }}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: "#888" }}>
                ستاره
              </span>
            </div>

            {/* Vertical divider */}
            <div style={{ width: "1px", height: "48px", background: "#F3F4F6" }} />

            {/* Coins */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl">🪙</span>
                <span className="text-2xl font-bold" style={{ color: "#F59E0B" }}>
                  {COINS}
                </span>
              </div>
              <span className="text-sm font-medium" style={{ color: "#888" }}>
                سکه
              </span>
            </div>
          </div>
        </div>

        {/* Next stage button */}
        <Link
          href="/stages"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-white text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: "#43A047" }}
        >
          <span>مرحله بعد</span>
          <span>▶</span>
        </Link>

        {/* Back to home */}
        <Link
          href="/"
          className="text-sm font-medium underline underline-offset-2"
          style={{ color: "#9CA3AF" }}
        >
          برگشت به خانه
        </Link>
      </div>
    </main>
  );
}
