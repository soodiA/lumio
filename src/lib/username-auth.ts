// Supabase Auth requires an email internally; we hide that behind a username-only
// UI by deriving a deterministic, never-delivered address from the username.
// This must stay 1:1 and collision-free with real emails, so it uses a reserved
// subdomain no one else can sign up under.
const EMAIL_DOMAIN = "users.lumio.app";

export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}@${EMAIL_DOMAIN}`;
}

const USERNAME_RE = /^[a-zA-Z0-9_؀-ۿ]{3,20}$/;

export function validateUsername(username: string): string | null {
  const v = username.trim();
  if (v.length < 3) return "نام کاربری باید حداقل ۳ کاراکتر باشد";
  if (v.length > 20) return "نام کاربری باید حداکثر ۲۰ کاراکتر باشد";
  if (!USERNAME_RE.test(v)) return "نام کاربری فقط می‌تواند حروف، عدد و _ داشته باشد";
  return null;
}

export function validatePhone(phone: string): string | null {
  const v = phone.trim();
  if (!/^0?9\d{9}$/.test(v.replace(/[\s-]/g, ""))) return "شماره تلفن معتبر نیست";
  return null;
}
