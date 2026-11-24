// Client for the Lumio backend (Go API + Postgres). Same origin by default; override with NEXT_PUBLIC_API_URL.
const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export type AuthUser = { id: string; username: string; display_name: string; phone?: string };

const TOKEN_KEY = "lumio_token";
export const getToken = (): string | null => { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } };
export const setToken = (t: string | null) => {
  try { if (t) localStorage.setItem(TOKEN_KEY, t); else localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
};

const ADMIN_KEY = "lumio_admin_key";
export const getAdminKey = (): string => { try { return sessionStorage.getItem(ADMIN_KEY) ?? ""; } catch { return ""; } };
export const setAdminKey = (k: string) => { try { if (k) sessionStorage.setItem(ADMIN_KEY, k); else sessionStorage.removeItem(ADMIN_KEY); } catch { /* ignore */ } };

export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}

export async function api<T>(path: string, init: { method?: string; body?: unknown; admin?: boolean } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  const tok = getToken();
  if (tok) headers.Authorization = `Bearer ${tok}`;
  if (init.admin) headers["X-Admin-Key"] = getAdminKey();
  const res = await fetch(`${API}${path}`, {
    method: init.method ?? "GET",
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new ApiError(res.status, data?.error?.code ?? "ERROR", data?.error?.message ?? res.statusText);
  return data as T;
}

export type ApiOption = { option_key: string; text_fa: string | null; text_en: string | null; image_url: string | null; sort_order: number };
export type ApiQuestion = Record<string, unknown> & { id: number; stage: number; level: string; grade_group: string | null; text_fa: string; options: ApiOption[] };
