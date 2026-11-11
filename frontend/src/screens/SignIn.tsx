// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const PRODUCT = "sonartest";

// Demo rule for the prototype: a plausible-looking address with a password of at
// least six characters is accepted; anything else returns the generic failure
// message required by US-002 (never revealing whether the email exists).
const MIN_PASSWORD_LENGTH = 6;
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Screen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [touched, setTouched] = React.useState({ email: false, password: false });
  const [status, setStatus] = React.useState("idle"); // idle | submitting | error | success
  const timer = React.useRef(null);

  React.useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const frame = { border: `1px solid ${brand.accentColor}`, outline: `1px solid ${brand.primaryColor}`, outlineOffset: 3, borderRadius: brand.radius };
  const caps = { fontFamily: brand.fontHeading, textTransform: "uppercase", letterSpacing: "0.3em" };
  const fieldStyle = { border: `1px solid ${brand.accentColor}`, borderRadius: brand.radius, color: brand.primaryColor };
  const rule = (
    <div aria-hidden className="flex items-center gap-3">
      <span className="h-px flex-1" style={{ backgroundColor: brand.accentColor }} />
      <span className="text-xs" style={{ color: brand.accentColor }}>◆</span>
      <span className="h-px flex-1" style={{ backgroundColor: brand.accentColor }} />
    </div>
  );

  const emailMissing = touched.email && email.trim() === "";
  const passwordMissing = touched.password && password === "";
  const busy = status === "submitting" || status === "success";

  function submit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (email.trim() === "" || password === "") { setStatus("idle"); return; }
    setStatus("submitting");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const ok = EMAIL_SHAPE.test(email.trim()) && password.length >= MIN_PASSWORD_LENGTH;
      if (ok) {
        setStatus("success");
        timer.current = setTimeout(() => navigate("overlap"), 650);
      } else {
        setStatus("error");
      }
    }, 700);
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6 py-12"
      style={{
        color: brand.primaryColor,
        fontFamily: brand.fontBody,
        backgroundColor: brand.backgroundColor,
        "--gt-primary": brand.primaryColor,
        "--gt-accent": brand.accentColor,
      }}
    >
      <style>{`
        .gt-focus:focus-visible { outline: 2px solid var(--gt-primary); outline-offset: 3px; }
        .gt-field:focus { border-color: var(--gt-primary); }
        .gt-field:focus-visible { outline: 2px solid var(--gt-primary); outline-offset: 2px; }
        .gt-btn:hover:not(:disabled) { filter: brightness(1.45); }
        .gt-btn:active:not(:disabled) { filter: brightness(0.9); }
        .gt-btn:disabled { opacity: 0.72; cursor: progress; }
        .gt-link:hover { color: var(--gt-primary); }
        @keyframes gt-rise { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        @keyframes gt-pulse { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
        .gt-rise { animation: gt-rise 260ms ease-out both; }
        .gt-pulse span { animation: gt-pulse 1.1s ease-in-out infinite; }
        .gt-pulse span:nth-child(2) { animation-delay: 0.18s; }
        .gt-pulse span:nth-child(3) { animation-delay: 0.36s; }
        @media (prefers-reduced-motion: reduce) {
          .gt-rise, .gt-pulse span { animation: none !important; }
        }
      `}</style>

      <main className="w-full max-w-md p-10 text-center" style={frame}>
        <p aria-hidden className="text-sm tracking-[0.5em]" style={{ color: brand.accentColor }}>◆ ◆ ◆</p>

        {/* b-0-0 */}
        <h1 data-wf="b-0-0" className="mt-4 text-2xl leading-snug" style={caps}>
          Sign in to {PRODUCT}
        </h1>

        <div className="mt-6">{rule}</div>

        {/* b-1-0 */}
        <p
          data-wf="b-1-0"
          className="mx-auto mt-6 flex max-w-xs items-start gap-2 text-left text-xs leading-relaxed"
          style={{ color: brand.neutralColor }}
        >
          <Icons.Clock aria-hidden className="mt-px h-4 w-4 shrink-0" style={{ color: brand.accentColor }} />
          <span>Your session expired after a period of inactivity. Please sign in again to continue.</span>
        </p>

        {status === "success" ? (
          <div className="mt-8 gt-rise" role="status">
            <Icons.CheckCircle aria-hidden className="mx-auto h-6 w-6" style={{ color: brand.accentColor }} />
            <p className="mt-3 text-base" style={caps}>Welcome back</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em]" style={{ color: brand.neutralColor }}>
              Opening the team overlap
            </p>
          </div>
        ) : (
          <>
            {/* b-2-0 */}
            <form data-wf="b-2-0" noValidate className="mt-7 space-y-5 text-left" onSubmit={submit}>
              <div className="space-y-2">
                <label htmlFor="si-email" className="block text-[10px] uppercase tracking-[0.25em]" style={{ color: brand.neutralColor }}>
                  Email
                </label>
                <input
                  data-wf="i-2-0-0"
                  id="si-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  disabled={busy}
                  aria-invalid={emailMissing || status === "error"}
                  aria-describedby={emailMissing ? "si-email-hint" : undefined}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className="gt-field h-11 w-full bg-transparent px-3 text-center text-sm outline-none disabled:opacity-60"
                  style={{ ...fieldStyle, borderColor: emailMissing ? brand.primaryColor : brand.accentColor }}
                />
                {emailMissing && (
                  <p id="si-email-hint" className="gt-rise text-[10px] uppercase tracking-[0.2em]" style={{ color: brand.primaryColor }}>
                    Enter the email on your account
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="si-password" className="block text-[10px] uppercase tracking-[0.25em]" style={{ color: brand.neutralColor }}>
                  Password
                </label>
                <input
                  data-wf="i-2-0-1"
                  id="si-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  disabled={busy}
                  aria-invalid={passwordMissing || status === "error"}
                  aria-describedby={passwordMissing ? "si-password-hint" : undefined}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (status === "error") setStatus("idle"); }}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  className="gt-field h-11 w-full bg-transparent px-3 text-center text-sm outline-none disabled:opacity-60"
                  style={{ ...fieldStyle, borderColor: passwordMissing ? brand.primaryColor : brand.accentColor }}
                />
                {passwordMissing && (
                  <p id="si-password-hint" className="gt-rise text-[10px] uppercase tracking-[0.2em]" style={{ color: brand.primaryColor }}>
                    Enter your password
                  </p>
                )}
              </div>

              {/* b-3-0 */}
              <div data-wf="b-3-0" aria-live="polite" className="min-h-[2.25rem]">
                {status === "error" && (
                  <p
                    className="gt-rise flex items-center justify-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.2em]"
                    style={{ border: `1px solid ${brand.primaryColor}`, borderRadius: brand.radius, color: brand.primaryColor }}
                  >
                    <Icons.AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
                    <span>Email or password is incorrect.</span>
                  </p>
                )}
              </div>

              {/* b-4-0 */}
              <button
                data-wf="b-4-0"
                type="submit"
                disabled={busy}
                aria-busy={status === "submitting"}
                className="gt-btn gt-focus h-12 w-full text-xs transition-[filter] duration-200"
                style={{ ...caps, backgroundColor: brand.primaryColor, color: brand.accentColor, borderRadius: brand.radius }}
              >
                {status === "submitting" ? (
                  <span className="gt-pulse inline-flex items-center gap-2 tracking-[0.3em]">
                    Signing in <span aria-hidden>◆</span><span aria-hidden>◆</span><span aria-hidden>◆</span>
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </>
        )}

        <div className="mt-7">{rule}</div>

        {/* b-5-0 */}
        <p className="mt-5 text-[10px] uppercase tracking-[0.25em]" style={{ color: brand.neutralColor }}>
          <button
            data-wf="b-5-0"
            type="button"
            onClick={() => navigate("sign-up")}
            className="gt-link gt-focus underline underline-offset-4 transition-colors duration-150"
            style={{ ...caps, fontSize: "10px", letterSpacing: "0.25em", color: brand.accentColor }}
          >
            New here? Create an account
          </button>
        </p>
      </main>
    </div>
  );
}
