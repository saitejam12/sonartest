// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Input, Label, Avatar } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, Clock, ArrowRight, AlertCircle, CheckCircle } = Icons;

const P = brand.primaryColor;
const A = brand.accentColor;
const N = brand.neutralColor;
const BG = brand.backgroundColor;

const hexToRgb = (hex) => {
  const h = String(hex).replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const tint = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const toward白 = null; // unused
const lighten = (hex, amt) => {
  const [r, g, b] = hexToRgb(hex);
  const m = (c) => Math.round(c + (255 - c) * amt);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
};

const SURFACE = lighten(BG, 0.55);
const HAIRLINE = tint(P, 0.16);
const INK_SOFT = tint(P, 0.74);

const INVITE = {
  inviter: 'Lena Fischer',
  inviter_role: 'Operations, Rotterdam',
  team: 'Northwind Collective',
  token: 'NW-7F3K-2QX8',
  members: 6,
  zones: 4,
  expires: '14 Nov 2026, 18:00 CET',
  checked: 'checked 2 min ago',
};

// Accounts that already exist — signing up with one of these is rejected.
const EXISTING_EMAILS = [
  'lena.fischer@northwind.co',
  'raj.mehta@northwind.co',
  'sofia.marchetti@northwind.co',
  'dani.okonkwo@northwind.co',
];

const TEAM_PEEK = [
  { name: 'Lena Fischer', zone: 'Europe/Amsterdam' },
  { name: 'Raj Mehta', zone: 'Asia/Kolkata' },
  { name: 'Sofia Marchetti', zone: 'Europe/Rome' },
  { name: 'Dani Okonkwo', zone: 'America/New_York' },
];

export default function Screen() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState('idle'); // idle | submitting | taken | created
  const [fieldErrors, setFieldErrors] = React.useState({ email: '', password: '' });
  const timerRef = React.useRef(null);

  React.useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const lenOk = password.length >= 10;
  const numOk = /\d/.test(password);
  const busy = status === 'submitting';
  const created = status === 'created';

  const validate = () => {
    const next = { email: '', password: '' };
    if (!email.trim()) next.email = 'Enter the email address your invitation was sent to.';
    else if (!emailOk) next.email = 'That is not a usable email address — check for a missing @ or domain.';
    if (!password) next.password = 'Choose a password of at least 10 characters with one number.';
    else if (!lenOk) next.password = `Ten characters minimum — you have ${password.length}.`;
    else if (!numOk) next.password = 'Add at least one number to your password.';
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (busy || created) return;
    setTouched(true);
    const next = validate();
    setFieldErrors(next);
    if (next.email || next.password) return;
    if (EXISTING_EMAILS.includes(email.trim().toLowerCase())) {
      setStatus('taken');
      return;
    }
    setStatus('submitting');
    timerRef.current = setTimeout(() => setStatus('created'), 1100);
  };

  const css = `
    .sg-field { background: ${SURFACE}; border: 1px solid ${tint(P, 0.38)}; border-radius: 0; color: ${P};
      transition: border-color .18s ease, box-shadow .18s ease, background-color .18s ease; }
    .sg-field::placeholder { color: ${tint(P, 0.4)}; }
    .sg-field:hover:not(:disabled) { border-color: ${tint(P, 0.65)}; }
    .sg-field:focus { outline: none; border-color: ${A}; box-shadow: inset 0 0 0 1px ${A}; }
    .sg-field:disabled { background: ${tint(P, 0.04)}; color: ${INK_SOFT}; }
    .sg-field[aria-invalid="true"] { border-color: ${P}; box-shadow: inset 0 0 0 1px ${tint(P, 0.45)}; }
    .sg-focus:focus-visible { outline: 2px solid ${A}; outline-offset: 3px; }
    .sg-cta { transition: background-color .2s ease, color .2s ease; }
    .sg-cta:hover:not(:disabled) { background-color: ${A}; color: ${P}; }
    .sg-cta:disabled { opacity: .72; cursor: progress; }
    .sg-link { border-bottom: 1px solid ${tint(A, 0.9)}; transition: border-color .16s ease, color .16s ease; }
    .sg-link:hover { border-bottom-color: ${P}; }
    .sg-ghost { transition: background-color .16s ease, color .16s ease; }
    .sg-ghost:hover { background-color: ${tint(P, 0.07)}; }
    @keyframes sg-rise { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
    @keyframes sg-spin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
    .sg-rise { animation: sg-rise .3s ease-out both; }
    .sg-spin { animation: sg-spin 1.3s linear infinite; }
    @media (prefers-reduced-motion: reduce) {
      .sg-rise, .sg-spin { animation: none !important; }
      .sg-field, .sg-cta, .sg-link, .sg-ghost { transition: none !important; }
    }
  `;

  const Rule = ({ label }) => (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1" style={{ backgroundColor: tint(P, 0.3) }} />
      {label ? (
        <span
          className="text-[10px] uppercase"
          style={{ letterSpacing: '0.34em', color: N, fontFamily: brand.fontHeading }}
        >
          {label}
        </span>
      ) : null}
      <span className="h-[7px] w-[7px] rotate-45" style={{ backgroundColor: A }} />
      <span className="h-px flex-1" style={{ backgroundColor: tint(P, 0.3) }} />
    </div>
  );

  const Check0 = ({ ok, children }) => (
    <li className="flex items-center gap-2 text-[12px]" style={{ color: ok ? P : INK_SOFT }}>
      {ok ? (
        <Check className="h-3.5 w-3.5 shrink-0" style={{ color: A }} aria-hidden="true" />
      ) : (
        <span
          className="h-[5px] w-[5px] shrink-0 rotate-45"
          style={{ backgroundColor: tint(P, 0.35) }}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
      <span className="sr-only">{ok ? ' — met' : ' — not met yet'}</span>
    </li>
  );

  return (
    <main
      className="min-h-screen w-full"
      style={{ backgroundColor: BG, color: P, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-[640px] px-4 py-12 sm:px-6 sm:py-16">
        {/* Wordmark — shown before sign-in, no app shell around this page */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <span
            className="flex h-11 w-11 rotate-45 items-center justify-center"
            style={{ border: `1px solid ${P}`, backgroundColor: tint(A, 0.22) }}
            aria-hidden="true"
          >
            <span
              className="-rotate-45 text-[13px]"
              style={{ fontFamily: brand.fontHeading, letterSpacing: '0.06em', color: P }}
            >
              ST
            </span>
          </span>
          <p
            className="text-[11px] uppercase"
            style={{ fontFamily: brand.fontHeading, letterSpacing: '0.42em', color: N }}
          >
            Sonartest
          </p>
        </div>

        {/* Signature double frame: accent rule inside, primary outline offset outside */}
        <div style={{ border: `1px solid ${P}`, padding: '5px' }}>
          <div
            style={{ border: `1px solid ${A}`, backgroundColor: SURFACE }}
            className="px-6 py-10 sm:px-12 sm:py-12"
          >
            {/* Row 1 — page title */}
            <header data-wf="b-0-0" className="text-center">
              <h1
                className="text-[27px] leading-tight sm:text-[36px]"
                style={{ fontFamily: brand.fontHeading, letterSpacing: '0.16em', color: P }}
              >
                CREATE YOUR ACCOUNT
              </h1>
            </header>

            <div className="mt-6">
              <Rule label="Invitation" />
            </div>

            {/* Row 2 — invite context */}
            <section data-wf="b-1-0" className="mt-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <Avatar name={INVITE.inviter} className="h-10 w-10" />
                <span className="text-left">
                  <span className="block text-[13px]" style={{ color: P }}>
                    {INVITE.inviter}
                  </span>
                  <span className="block text-[12px]" style={{ color: N }}>
                    {INVITE.inviter_role}
                  </span>
                </span>
              </div>

              <p
                className="mx-auto mt-5 max-w-[46ch] text-[15px] leading-relaxed"
                style={{ color: INK_SOFT }}
              >
                {INVITE.inviter} invited you to {INVITE.team}. Sign up and you&rsquo;ll join the team
                straight away.
              </p>

              <p
                className="mt-4 text-[11px] uppercase"
                style={{ letterSpacing: '0.22em', color: N, fontVariantNumeric: 'tabular-nums' }}
              >
                {INVITE.members} members · {INVITE.zones} time zones
              </p>

              <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                {TEAM_PEEK.map((m) => (
                  <li
                    key={m.name}
                    className="text-[11px]"
                    style={{ color: N, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {m.name.split(' ')[0]} · {m.zone.split('/')[1].replace('_', ' ')}
                  </li>
                ))}
              </ul>

              <p
                className="mt-5 inline-flex items-center gap-2 px-3 py-1 text-[11px]"
                style={{
                  border: `1px solid ${tint(P, 0.25)}`,
                  color: INK_SOFT,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <Clock className="h-3.5 w-3.5" style={{ color: A }} aria-hidden="true" />
                <span>
                  Invite {INVITE.token} valid until {INVITE.expires} · {INVITE.checked}
                </span>
              </p>
            </section>

            <div className="mt-8">
              <Rule />
            </div>

            {/* Row 3 — form */}
            <form data-wf="b-2-0" onSubmit={onSubmit} noValidate className="mt-8">
              <div className="space-y-7">
                <div>
                  <Label
                    htmlFor="signup-email"
                    className="mb-2 block text-[11px] uppercase"
                    style={{ fontFamily: brand.fontHeading, letterSpacing: '0.26em', color: P }}
                  >
                    Email
                  </Label>
                  <Input
                    data-wf="i-2-0-0"
                    id="signup-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck="false"
                    disabled={busy || created}
                    className="sg-field h-12 w-full px-4 text-[15px]"
                    placeholder="you@northwind.co"
                    value={email}
                    aria-invalid={touched && !!fieldErrors.email}
                    aria-describedby="signup-email-msg"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'taken') setStatus('idle');
                      if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: '' }));
                    }}
                  />
                  <p id="signup-email-msg" className="mt-2 text-[12px] leading-relaxed">
                    {touched && fieldErrors.email ? (
                      <span className="inline-flex items-start gap-2" style={{ color: P }}>
                        <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{fieldErrors.email}</span>
                      </span>
                    ) : (
                      <span style={{ color: N }}>
                        Use the address the invitation was sent to so we can match it.
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <Label
                      htmlFor="signup-password"
                      className="block text-[11px] uppercase"
                      style={{ fontFamily: brand.fontHeading, letterSpacing: '0.26em', color: P }}
                    >
                      Password
                    </Label>
                    <span
                      className="text-[11px]"
                      style={{ color: N, fontVariantNumeric: 'tabular-nums' }}
                    >
                      {password.length} / 10
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      data-wf="i-2-0-1"
                      id="signup-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      disabled={busy || created}
                      className="sg-field h-12 w-full pl-4 pr-24 text-[15px]"
                      placeholder="At least 10 characters"
                      value={password}
                      aria-invalid={touched && !!fieldErrors.password}
                      aria-describedby="signup-password-rules signup-password-msg"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: '' }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={busy || created}
                      className="sg-ghost sg-focus absolute right-[1px] top-[1px] h-[46px] px-3 text-[10px] uppercase"
                      style={{ letterSpacing: '0.2em', color: P, borderLeft: `1px solid ${HAIRLINE}` }}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                      <span className="sr-only"> password</span>
                    </button>
                  </div>

                  <ul id="signup-password-rules" className="mt-3 space-y-1.5">
                    <Check0 ok={lenOk}>At least 10 characters</Check0>
                    <Check0 ok={numOk}>At least 1 number</Check0>
                  </ul>

                  <p id="signup-password-msg" className="mt-2 text-[12px] leading-relaxed">
                    {touched && fieldErrors.password ? (
                      <span className="inline-flex items-start gap-2" style={{ color: P }}>
                        <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{fieldErrors.password}</span>
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>

              {/* Row 4 — account conflict / success notice */}
              <div data-wf="b-3-0" aria-live="polite" className="mt-6">
                {status === 'taken' ? (
                  <div
                    role="alert"
                    className="sg-rise px-5 py-4"
                    style={{ border: `1px solid ${P}`, backgroundColor: tint(P, 0.05) }}
                  >
                    <p className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: P }}>
                      <X className="mt-[2px] h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        That email is already in use. Try signing in instead.
                        <span className="mt-2 block text-[12px]" style={{ color: INK_SOFT }}>
                          Your details are still here — change the address, or sign in and the
                          invitation to {INVITE.team} will be waiting.
                        </span>
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('sign-in')}
                      className="sg-link sg-focus mt-3 text-[12px] uppercase"
                      style={{ letterSpacing: '0.2em', color: P }}
                    >
                      Sign in with this email
                    </button>
                  </div>
                ) : null}

                {created ? (
                  <div
                    className="sg-rise px-5 py-4"
                    style={{ border: `1px solid ${A}`, backgroundColor: tint(A, 0.18) }}
                  >
                    <p className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: P }}>
                      <CheckCircle className="mt-[2px] h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        Account created for <strong className="font-semibold">{email.trim()}</strong>.
                        You&rsquo;ve joined {INVITE.team} — {INVITE.members + 1} members now.
                      </span>
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Row 5 — primary action */}
              <button
                data-wf="b-4-0"
                type={created ? 'button' : 'submit'}
                disabled={busy}
                onClick={created ? () => navigate('overlap') : undefined}
                className="sg-cta sg-focus mt-6 flex h-14 w-full items-center justify-center gap-3 text-[12px] uppercase"
                style={{ backgroundColor: P, color: A, letterSpacing: '0.3em', borderRadius: 0 }}
              >
                {busy ? (
                  <>
                    <span
                      className="sg-spin h-3 w-3"
                      style={{ border: `1px solid ${A}` }}
                      aria-hidden="true"
                    />
                    <span>Creating your account</span>
                  </>
                ) : created ? (
                  <>
                    <span>Enter the team overlap</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                ) : (
                  <span>Create account</span>
                )}
              </button>
              <p className="mt-3 text-center text-[11px]" style={{ color: N }}>
                {busy
                  ? 'Matching your invitation to Northwind Collective…'
                  : 'Next you’ll confirm your home time zone and weekly hours.'}
              </p>
            </form>

            <div className="mt-9">
              <Rule />
            </div>

            {/* Row 6 — secondary links */}
            <nav className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div data-wf="b-5-0" className="flex justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => navigate('join')}
                  className="sg-link sg-focus inline-flex min-h-[44px] items-center text-[12px] uppercase"
                  style={{ letterSpacing: '0.2em', color: P }}
                >
                  Continue to your invitation
                </button>
              </div>
              <div data-wf="b-5-1" className="flex justify-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate('sign-in')}
                  className="sg-link sg-focus inline-flex min-h-[44px] items-center text-[12px] uppercase"
                  style={{ letterSpacing: '0.2em', color: P }}
                >
                  Already have an account? Sign in
                </button>
              </div>
            </nav>
          </div>
        </div>

        <p
          className="mt-8 text-center text-[11px] uppercase"
          style={{ letterSpacing: '0.26em', color: N, fontFamily: brand.fontHeading }}
        >
          Passwords are stored hashed — never in plain text
        </p>
      </div>
    </main>
  );
}
