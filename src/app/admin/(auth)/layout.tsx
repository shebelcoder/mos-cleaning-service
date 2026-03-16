// Auth pages (login) — no admin sidebar, no session check
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
