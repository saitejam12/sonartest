// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Badge, Avatar, Stat, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Users, Clock, AlertCircle, CheckCircle } = Icons;

const INVITE = {
  teamName: "Northwind Collective",
  invitedBy: "Lena Fischer",
  invitedByEmail: "lena.fischer@northwind.co",
  memberCount: 4,
  expiresLabel: "18 Nov 2026",
  daysLeft: 7,
  token: "NWC-7F3K-2QD8",
  reference: "14:04 UTC · Wed 11 Nov 2026",
};

const CURRENT_USER = {
  email: "marcus.hale@novatide.io",
  existingTeam: "Novatide Studio",
};

const MEMBERS = [
  {
    id: "u_014",
    wf: "i-2-0-0",
    name: "Lena Fischer",
    timezone: "Europe/Berlin",
    offset: "UTC+01:00",
    localTime: "15:04",
    note: "Sent your invite",
    hours: "09:00 – 17:30",
  },
  {
    id: "u_027",
    wf: "i-2-0-1",
    name: "Ana Ruiz",
    timezone: "America/New_York",
    offset: "UTC−05:00",
    localTime: "09:04",
    note: null,
    hours: "08:30 – 16:00",
  },
  {
    id: "u_031",
    wf: "i-2-0-2",
    name: "Tom Okafor",
    timezone: "Asia/Singapore",
    offset: "UTC+08:00",
    localTime: "22:04",
    note: null,
    hours: "10:00 – 18:00",
  },
  {
    id: "u_038",
    wf: "i-2-0-3",
    name: "Priya Shah",
    timezone: "Asia/Kolkata",
    offset: "UTC+05:30",
    localTime: "19:34",
    note: "No hours set yet",
    hours: null,
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const [preview, setPreview] = React.useState("valid");
  const [flow, setFlow] = React.useState("idle"); // idle | joining | joined | declined
  const [live, setLive] = React.useState("");

  const ink = brand.primaryColor;
  const gold = brand.accentColor;
  const paper = `color-mix(in srgb, ${brand.accentColor} 7%, ${brand.backgroundColor})`;
  const paperDeep = `color-mix(in srgb, ${brand.accentColor} 14%, ${brand.backgroundColor})`;
  const hair = `color-mix(in srgb, ${brand.primaryColor} 16%, ${brand.backgroundColor})`;
  const hairStrong = `color-mix(in srgb, ${brand.primaryColor} 30%, ${brand.backgroundColor})`;
  const muted = `color-mix(in srgb, ${brand.primaryColor} 66%, ${brand.backgroundColor})`;
  const faint = `color-mix(in srgb, ${brand.primaryColor} 48%, ${brand.backgroundColor})`;

  const css = `
    @keyframes gzRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes gzSpin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
    @keyframes gzBreathe { 0%,100% { opacity: .3; } 50% { opacity: .85; } }
    .gz-rise { animation: gzRise .45s cubic-bezier(.2,.7,.3,1) both; }
    .gz-spin { animation: gzSpin 1.1s linear infinite; }
    .gz-breathe { animation: gzBreathe 1.5s ease-in-out infinite; }
    .gz-focus:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
    .gz-focus-gold:focus-visible { outline: 2px solid ${gold}; outline-offset: 3px; }
    @media (prefers-reduced-motion: reduce) {
      .gz-rise, .gz-spin, .gz-breathe { animation: none !important; }
    }
  `;

  React.useEffect(() => {
    if (flow !== "joining") return undefined;
    const t = setTimeout(() => {
      setFlow("joined");
      setLive("You have joined Northwind Collective.");
    }, 950);
    return () => clearTimeout(t);
  }, [flow]);

  const headingFont = { fontFamily: brand.fontHeading };
  const num = { fontVariantNumeric: "tabular-nums" };

  const Diamond = ({ size = 7, filled = true }) => (
    <span
      aria-hidden="true"
      className="inline-block rotate-45 shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: filled ? gold : "transparent",
        border: filled ? "none" : `1px solid ${gold}`,
      }}
    />
  );

  const DecoRule = ({ className = "" }) => (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="flex-1">
        <span className="block h-px" style={{ backgroundColor: hairStrong }} />
        <span className="mt-[3px] block h-px" style={{ backgroundColor: gold }} />
      </span>
      <Diamond size={8} />
      <span className="flex-1">
        <span className="block h-px" style={{ backgroundColor: hairStrong }} />
        <span className="mt-[3px] block h-px" style={{ backgroundColor: gold }} />
      </span>
    </div>
  );

  const Frame = ({ children, className = "" }) => (
    <div className={className} style={{ border: `1px solid ${ink}`, padding: 5 }}>
      <div className="relative" style={{ border: `1px solid ${gold}`, backgroundColor: paper }}>
        <span
          aria-hidden="true"
          className="absolute left-[6px] top-[6px] rotate-45"
          style={{ width: 6, height: 6, border: `1px solid ${gold}` }}
        />
        <span
          aria-hidden="true"
          className="absolute right-[6px] top-[6px] rotate-45"
          style={{ width: 6, height: 6, border: `1px solid ${gold}` }}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-[6px] left-[6px] rotate-45"
          style={{ width: 6, height: 6, border: `1px solid ${gold}` }}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-[6px] right-[6px] rotate-45"
          style={{ width: 6, height: 6, border: `1px solid ${gold}` }}
        />
        {children}
      </div>
    </div>
  );

  const labelCaps = "text-[11px] uppercase tracking-[0.26em]";

  /* ---------- Row 2: invite card ---------- */
  const renderCard = () => {
    if (preview === "error") {
      return (
        <section data-wf="b-1-0" className="gz-rise px-6 py-10 sm:px-12" aria-labelledby="invite-error-heading">
          <div className="mx-auto max-w-md text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center" style={{ border: `1px solid ${hairStrong}` }}>
              <AlertCircle className="h-5 w-5" aria-hidden="true" style={{ color: ink }} />
            </span>
            <h2 id="invite-error-heading" className={`${labelCaps} mb-3`} style={{ ...headingFont, color: ink }}>
              The invitation desk is quiet
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: muted }}>
              We couldn’t reach the invitation service to confirm this link. Nothing has been
              declined — your invite to {INVITE.teamName} is untouched. Try again in a moment.
            </p>
            <p className="mt-3 text-[12px]" style={{ color: faint, ...num }}>
              Reference {INVITE.token} · last checked {INVITE.reference}
            </p>
          </div>
        </section>
      );
    }

    return (
      <section data-wf="b-1-0" className="gz-rise" aria-labelledby="invite-card-heading">
        <h2 id="invite-card-heading" className="sr-only">
          Invitation details
        </h2>
        <div className="flex flex-col items-center gap-3 px-6 pb-7 pt-1 sm:px-12">
          <Avatar name={INVITE.invitedBy} className="h-12 w-12" />
          <Badge
            className={`${labelCaps} px-3 py-1`}
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${gold}`,
              color: ink,
              borderRadius: 0,
              ...num,
            }}
          >
            Invite {INVITE.token}
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ borderTop: `1px solid ${hair}` }}>
          <div className="px-6 py-6 text-center">
            <Stat label="Invited by" value={INVITE.invitedBy} hint={INVITE.invitedByEmail} className="text-center" />
          </div>
          <div
            className="px-6 py-6 text-center"
            style={{ borderTop: `1px solid ${hair}`, borderLeft: `1px solid ${hair}` }}
          >
            <Stat label="Members" value={`${INVITE.memberCount}`} hint="across 4 time zones" className="text-center" />
          </div>
          <div
            className="px-6 py-6 text-center"
            style={{ borderTop: `1px solid ${hair}`, borderLeft: `1px solid ${hair}` }}
          >
            <Stat
              label="Invite expires"
              value={INVITE.expiresLabel}
              hint={`${INVITE.daysLeft} days left`}
              className="text-center"
            />
          </div>
        </div>
      </section>
    );
  };

  /* ---------- Row 3: members ---------- */
  const renderMembers = () => (
    <section data-wf="b-2-0" className="gz-rise" aria-labelledby="members-heading">
      <div className="flex flex-col items-center gap-2 px-6 pb-5 pt-8 sm:px-12">
        <h2 id="members-heading" className={`${labelCaps}`} style={{ ...headingFont, color: ink }}>
          Current members
        </h2>
        <p className="text-[12px]" style={{ color: faint, ...num }}>
          Local times as of {INVITE.reference}
        </p>
      </div>
      <ul role="list" style={{ borderTop: `1px solid ${hair}` }}>
        {MEMBERS.map((m, i) => (
          <li
            key={m.id}
            data-wf={m.wf}
            className="gz-rise flex items-center gap-4 px-6 py-4 sm:px-12"
            style={{
              borderTop: i === 0 ? "none" : `1px solid ${hair}`,
              animationDelay: `${80 + i * 60}ms`,
            }}
          >
            <Avatar name={m.name} className="h-9 w-9 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-medium" style={{ color: ink }}>
                {m.name}
              </p>
              <p className="truncate text-[13px]" style={{ color: muted, ...num }}>
                {m.timezone}
                {m.hours ? <span> · {m.hours} local</span> : <span> · {m.note}</span>}
              </p>
            </div>
            {m.note === "Sent your invite" ? (
              <span
                className={`${labelCaps} hidden px-2 py-1 sm:inline-block`}
                style={{ border: `1px solid ${gold}`, color: ink }}
              >
                Host
              </span>
            ) : null}
            <div className="text-right" style={num}>
              <p className="text-[15px]" style={{ color: ink }}>
                {m.localTime}
              </p>
              <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: faint }}>
                {m.offset}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

  /* ---------- Row 4: contextual text ---------- */
  const renderNotice = () => {
    let icon = null;
    let heading = "";
    let body = null;
    let tone = hair;

    if (preview === "blocked") {
      icon = <AlertCircle className="h-4 w-4" aria-hidden="true" style={{ color: ink }} />;
      heading = "Invite can’t be accepted";
      tone = hairStrong;
      body = (
        <>
          You’re already a member of another team, so this invite can’t be accepted — each account
          belongs to a single team. Your account sits with {CURRENT_USER.existingTeam}.
        </>
      );
    } else if (flow === "joined") {
      icon = <CheckCircle className="h-4 w-4" aria-hidden="true" style={{ color: ink }} />;
      heading = "You’re in";
      tone = gold;
      body = (
        <>
          You joined {INVITE.teamName}. Set your weekly working hours next so Lena, Ana, Tom and
          Priya can see when you overlap.
        </>
      );
    } else if (flow === "declined") {
      icon = <Clock className="h-4 w-4" aria-hidden="true" style={{ color: ink }} />;
      heading = "Invite set aside";
      body = (
        <>
          Nothing sent, nothing joined. The link stays live until {INVITE.expiresLabel} — accept it
          whenever you’re ready.
        </>
      );
    } else {
      icon = <Users className="h-4 w-4" aria-hidden="true" style={{ color: ink }} />;
      heading = "Before you accept";
      body = (
        <>
          Accepting adds you to {INVITE.teamName} and shares your working hours with its members.
          Each account belongs to a single team, so you won’t be able to join another afterwards.
        </>
      );
    }

    return (
      <section data-wf="b-3-0" className="px-6 pb-2 pt-8 sm:px-12" aria-labelledby="notice-heading">
        <div
          key={`${preview}-${flow}`}
          className="gz-rise flex gap-4 px-5 py-5"
          style={{ border: `1px solid ${tone}`, backgroundColor: paperDeep }}
        >
          <span className="mt-[2px] shrink-0">{icon}</span>
          <div>
            <h3 id="notice-heading" className={`${labelCaps} mb-2`} style={{ ...headingFont, color: ink }}>
              {heading}
            </h3>
            <p className="max-w-[62ch] text-[14px] leading-relaxed" style={{ color: muted }}>
              {body}
            </p>
          </div>
        </div>
      </section>
    );
  };

  /* ---------- Row 5: actions ---------- */
  const renderActions = () => {
    const blocked = preview === "blocked";
    const joining = flow === "joining";
    const joined = flow === "joined";

    const primaryLabel = joined
      ? "Enter team overlap"
      : joining
      ? "Joining the team"
      : "Accept and join team";

    return (
      <section className="px-6 pb-10 pt-6 sm:px-12" aria-label="Invitation actions">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            data-wf="b-4-0"
            type="button"
            className="gz-focus-gold h-12 w-full px-6 text-[12px] uppercase tracking-[0.22em]"
            style={{
              backgroundColor: blocked ? hair : ink,
              color: blocked ? faint : gold,
              borderRadius: 0,
              border: `1px solid ${blocked ? hairStrong : ink}`,
              cursor: blocked ? "not-allowed" : "pointer",
              opacity: joining ? 0.92 : 1,
              transition: "opacity .2s ease, background-color .2s ease",
              ...headingFont,
            }}
            disabled={blocked || joining}
            aria-describedby={blocked ? "notice-heading" : undefined}
            onClick={() => {
              if (joined) {
                navigate("overlap");
                return;
              }
              setFlow("joining");
              setLive("Joining Northwind Collective.");
            }}
          >
            <span className="flex items-center justify-center gap-3">
              {joining ? (
                <span className="gz-spin inline-block h-2 w-2" style={{ backgroundColor: gold }} aria-hidden="true" />
              ) : (
                <Diamond size={6} filled={!blocked} />
              )}
              {primaryLabel}
            </span>
          </Button>

          <button
            data-wf="b-4-1"
            type="button"
            className="gz-focus flex h-12 w-full items-center justify-center text-[12px] uppercase tracking-[0.22em] underline underline-offset-4 transition-colors"
            style={{ ...headingFont, color: joined ? ink : muted, borderRadius: 0 }}
            onClick={() => {
              if (joined) {
                navigate("my-availability");
                return;
              }
              setFlow("declined");
              setLive("Invite set aside. The link stays valid until 18 November 2026.");
            }}
          >
            {joined ? "Set my availability" : "Not now"}
          </button>
        </div>

        <p className="mt-6 text-center text-[12px]" style={{ color: faint }}>
          Signed in as <span style={num}>{CURRENT_USER.email}</span>
        </p>
      </section>
    );
  };

  /* ---------- Row 6: expired ---------- */
  const renderExpired = () => (
    <div data-wf="b-5-0" className="gz-rise px-6 py-12 sm:px-12">
      <div className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px flex-1" style={{ backgroundColor: hairStrong }} />
        <Diamond size={10} filled={false} />
        <Diamond size={14} filled={false} />
        <Diamond size={10} filled={false} />
        <span className="h-px flex-1" style={{ backgroundColor: hairStrong }} />
      </div>
      <Empty
        title="This invite is no longer valid"
        description="It has expired or has already been used. Ask your teammate for a new link — Lena Fischer can send a fresh one from the Northwind Collective team page."
      />
      <p className="mt-8 text-center text-[12px]" style={{ color: faint, ...num }}>
        Invite {INVITE.token} · checked {INVITE.reference}
      </p>
    </div>
  );

  const showInviteBody = preview === "valid" || preview === "blocked";

  return (
    <div
      className="min-h-full w-full px-4 py-10 sm:px-6 sm:py-14"
      style={{ backgroundColor: brand.backgroundColor, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>
      <p className="sr-only" role="status" aria-live="polite">
        {live}
      </p>

      <div className="mx-auto w-full max-w-4xl">
        {/* Row 1 — page title */}
        <header data-wf="b-0-0" className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 rotate-45 items-center justify-center" style={{ border: `1px solid ${gold}` }}>
            <span
              className="-rotate-45 text-[13px] tracking-[0.12em]"
              style={{ ...headingFont, color: ink }}
            >
              NC
            </span>
          </div>
          <p className={`${labelCaps} mb-4`} style={{ color: faint }}>
            An invitation
          </p>
          <h1
            className="text-[30px] uppercase leading-tight tracking-[0.12em] sm:text-[38px]"
            style={{ ...headingFont, color: ink }}
          >
            Join {INVITE.teamName}
          </h1>
          <DecoRule className="mx-auto mt-6 max-w-sm" />
        </header>

        {/* Framed invitation panel — the double frame is the signature */}
        <Frame>
          <div className="pt-8">
            {showInviteBody ? (
              <>
                {renderCard()}
                <div className="px-6 sm:px-12">
                  <DecoRule />
                </div>
                {renderMembers()}
                {renderNotice()}
                {renderActions()}
              </>
            ) : null}

            {preview === "error" ? renderCard() : null}
            {preview === "expired" ? renderExpired() : null}
          </div>
        </Frame>
      </div>
    </div>
  );
}
