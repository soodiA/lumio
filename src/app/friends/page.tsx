"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface Profile {
  id: string;
  display_name: string;
  username: string;
}

export default function FriendsPage() {
  const { user } = useAuth();
  const [following, setFollowing] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadFollowing();
  }, [user]);

  const loadFollowing = async () => {
    if (!user) return;
    setLoading(true);
    const profiles = await api<Profile[]>("/api/v1/me/follows").catch(() => [] as Profile[]);
    setFollowing(profiles);
    setFollowingIds(new Set(profiles.map((p: Profile) => p.id)));
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    const data = await api<Profile[]>(`/api/v1/profiles?q=${encodeURIComponent(searchQuery.trim())}`).catch(() => [] as Profile[]);
    setSearchResults(data);
    setSearching(false);
  };

  const toggleFollow = async (targetId: string) => {
    if (!user) return;
    if (followingIds.has(targetId)) {
      await api(`/api/v1/me/follows/${targetId}`, { method: "DELETE" });
      setFollowingIds(prev => { const s = new Set(prev); s.delete(targetId); return s; });
      setFollowing(prev => prev.filter(p => p.id !== targetId));
    } else {
      await api(`/api/v1/me/follows/${targetId}`, { method: "PUT" });
      setFollowingIds(prev => new Set([...prev, targetId]));
    }
    loadFollowing();
  };

  return (
    <main className="flex flex-col flex-1 items-center min-h-screen px-6 py-10" style={{ background: "#FFFDF7" }}>
      <div className="w-full max-w-sm flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Link href="/grade" className="text-2xl">←</Link>
          <h1 className="text-xl font-bold" style={{ color: "#1a1a1a" }}>دوستان</h1>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="جستجوی کاربر..."
            dir="rtl"
            className="flex-1 px-4 py-3 rounded-xl border text-base outline-none"
            style={{ border: "2px solid #E5E7EB", background: "#FAFAFA" }}
          />
          <button
            onClick={handleSearch}
            disabled={searching}
            className="px-4 py-3 rounded-xl font-bold text-white"
            style={{ background: "#42A5F5" }}
          >
            🔍
          </button>
        </div>

        {/* Search results */}
        {searchResults.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium" style={{ color: "#888" }}>نتایج جستجو</p>
            {searchResults.map(p => (
              <UserCard key={p.id} profile={p} isFollowing={followingIds.has(p.id)} onToggle={() => toggleFollow(p.id)} />
            ))}
          </div>
        )}

        {/* Following list */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium" style={{ color: "#888" }}>دنبال‌شونده‌ها ({following.length})</p>
          {loading ? (
            <div className="text-center py-8 text-3xl">⏳</div>
          ) : following.length === 0 ? (
            <p className="text-center py-8" style={{ color: "#aaa" }}>هنوز کسی رو دنبال نکردی</p>
          ) : (
            following.map(p => (
              <UserCard key={p.id} profile={p} isFollowing={true} onToggle={() => toggleFollow(p.id)} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function UserCard({ profile, isFollowing, onToggle }: { profile: Profile; isFollowing: boolean; onToggle: () => void }) {
  const letter = profile.display_name[0]?.toUpperCase() ?? "?";
  return (
    <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: "#AB47BC" }}>
        {letter}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold truncate" style={{ color: "#1a1a1a" }}>{profile.display_name}</p>
        <p className="text-xs" style={{ color: "#888" }}>@{profile.username}</p>
      </div>
      <button
        onClick={onToggle}
        className="text-sm font-bold px-3 py-1.5 rounded-full transition-all"
        style={{
          background: isFollowing ? "#FEE2E2" : "#EFF6FF",
          color: isFollowing ? "#EF5350" : "#42A5F5",
        }}
      >
        {isFollowing ? "قطع" : "دنبال"}
      </button>
    </div>
  );
}
