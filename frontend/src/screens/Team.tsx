// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Badge, Table, THead, TBody, TR, TH, TD, Avatar, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Home } = Icons;

const rgba = (hex, alpha) => {
  const h = String(hex).replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const INK = brand.primaryColor;
const GILT = brand.accentColor;
const PAPER = brand.backgroundColor;
const SURFACE = 'rgba(255, 255, 255, 0.56)';
const SURFACE_DEEP = 'rgba(255, 255, 255, 0.30)';
const HAIRLINE = rgba(INK, 0.14);
const TEXT_MUTED = rgba(INK, 0.72);
const TEXT_FAINT = rgba(INK, 0.56);

const CSS = `
.gt :focus-visible { outline: 2px solid ${GILT}; outline-offset: 2px; }
.gt-enter { animation: gt-enter .34s cubic-bezier(.2,.7,.3,1) both; }
@keyframes gt-enter { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
.gt-btn { transition: background-color .18s ease, color .18s ease, border-color .18s ease; }
.gt-primary:hover:not([aria-disabled="true"]) { background-color: ${rgba(INK, 0.84)}; }
.gt-ghost:hover { background-color: ${rgba(GILT, 0.26)}; }
.gt-link:hover .gt-url { text-decoration: underline; text-underline-offset: 4px; }
.gt-rowhover:hover { background-color: ${rgba(GILT, 0.16)}; }
@media (prefers-reduced-motion: reduce) {
  .gt .gt-enter { animation: none; }
  .gt .gt-btn { transition: none; }
}
`;

const Ornament = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
    <span className="flex-1 flex flex-col" style={{ rowGap: '3px' }}>
      <span className="h-px w-full" style={{ backgroundColor: rgba(INK, 0.5) }} />
      <span className="h-px w-full" style={{ backgroundColor: GILT }} />
    </span>
    <span
      className="rotate-45"
      style={{ width: '8px', height: '8px', backgroundColor: GILT, border: `1px solid ${INK}` }}
    />
    <span className="flex-1 flex flex-col" style={{ rowGap: '3px' }}>
      <span className="h-px w-full" style={{ backgroundColor: rgba(INK, 0.5) }} />
      <span className="h-px w-full" style={{ backgroundColor: GILT }} />
    </span>
  </div>
);

const Frame = ({ children, className = '', pad = 'p-6 sm:p-8', surface = SURFACE, ...rest }) => (
  <div className={className} style={{ border: `1px solid ${rgba(INK, 0.9)}`, padding: '4px' }} {...rest}>
    <div className={pad} style={{ border: `1px solid ${GILT}`, backgroundColor: surface, height: '100%' }}>
      {children}
    </div>
  </div>
);

const Eyebrow = ({ children, className = '' }) => (
  <span
    className={`block text-[11px] font-semibold uppercase ${className}`}
    style={{ letterSpacing: '0.22em', color: TEXT_FAINT }}
  >
    {children}
  </span>
);

const SectionTitle = ({ children, id }) => (
  <h2
    id={id}
    className="text-xl sm:text-2xl uppercase"
    style={{ fontFamily: brand.fontHeading, letterSpacing: '0.16em', color: INK }}
  >
    {children}
  </h2>
);

const TEAM = { id: 't_7fa1', name: 'Northwind Collective', created_at: '4 Mar 2026' };

const MEMBERS = [
  {
    id: 'u_01',
    display_name: 'Imogen Hartley',
    email: 'imogen.hartley@northwind.co',
    home_timezone: 'Europe/London',
    offset: 'GMT+0',
    working_days: 'Mon–Fri · 09:00–17:30',
    joined: '4 Mar 2026',
    owner: true,
    you: true,
  },
  {
    id: 'u_02',
    display_name: 'Teodoro Vance',
    email: 'teo.vance@northwind.co',
    home_timezone: 'America/New_York',
    offset: 'GMT−5',
    working_days: 'Mon–Thu · 08:30–16:00',
    joined: '6 Mar 2026',
  },
  {
    id: 'u_03',
    display_name: 'Mireille Okonkwo',
    email: 'mireille.okonkwo@northwind.co',
    home_timezone: 'Africa/Lagos',
    offset: 'GMT+1',
    working_days: 'Mon–Fri · 10:00–18:00',
    joined: '19 Mar 2026',
  },
  {
    id: 'u_04',
    display_name: 'Hal Yamamoto',
    email: 'hal.yamamoto@northwind.co',
    home_timezone: 'Asia/Tokyo',
    offset: 'GMT+9',
    working_days: null,
    joined: '2 Apr 2026',
  },
];

const INITIAL_INVITATIONS = [
  { id: 'i_94', email: 'dmitri.sorokin@northwind.co', status: 'failed', detail: 'Relay returned 502 · 09:41 today' },
  { id: 'i_93', email: 'saoirse.byrne@northwind.co', status: 'pending', detail: 'Sent 9 Nov · expires 18 Nov 2026' },
  { id: 'i_88', email: 'hal.yamamoto@northwind.co', status: 'accepted', detail: 'Joined 2 Apr 2026' },
  { id: 'i_71', email: 'priya.raman@northwind.co', status: 'expired', detail: 'Sent 21 Oct · lapsed 28 Oct 2026' },
];

const INVITE_URL = 'https://sonartest.app/join/9f3a2c';
const INVITE_EXPIRES = '18 Nov 2026';

const STATUS_META = {
  pending: { label: 'Pending', Icon: Icons.Clock },
  accepted: { label: 'Accepted', Icon: Icons.CheckCircle },
  failed: { label: 'Not delivered', Icon: Icons.AlertCircle },
  expired: { label: 'Expired', Icon: Icons.X },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Screen() {
  const navigate = useNavigate();
  const [team, setTeam] = React.useState(TEAM);
  const [teamName, setTeamName] = React.useState('');
  const [createNotice, setCreateNotice] = React.useState(null);

  const [email, setEmail] = React.useState('dmitri.sorokin@northwind.co');
  const [fieldError, setFieldError] = React.useState('');
  const [sendState, setSendState] = React.useState('error');
  const [lastAddress, setLastAddress] = React.useState('dmitri.sorokin@northwind.co');
  const [invitations, setInvitations] = React.useState(INITIAL_INVITATIONS);

  const [copyState, setCopyState] = React.useState('idle');

  const sendTimer = React.useRef(null);
  const copyTimer = React.useRef(null);

  React.useEffect(
    () => () => {
      if (sendTimer.current) clearTimeout(sendTimer.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  const members = MEMBERS;

  const handleCreate = (event) => {
    event.preventDefault();
    if (team) {
      setCreateNotice({
        tone: 'blocked',
        text: `You already belong to ${team.name}. This version gives each account one team, so a second one can’t be created here.`,
      });
      return;
    }
    if (!teamName.trim()) {
      setCreateNotice({ tone: 'error', text: 'Give the team a name before creating it.' });
      return;
    }
    setTeam({ id: 't_new', name: teamName.trim(), created_at: '11 Nov 2026' });
    navigate('overlap');
  };

  const handleInvite = (event) => {
    event.preventDefault();
    const address = email.trim();
    if (!address) {
      setFieldError('Enter the colleague’s email address.');
      setSendState('idle');
      return;
    }
    if (!EMAIL_RE.test(address)) {
      setFieldError('That doesn’t look like an email address — check for a typo.');
      setSendState('idle');
      return;
    }
    const existing = members.find((m) => m.email.toLowerCase() === address.toLowerCase());
    if (existing) {
      setFieldError(`${existing.display_name} is already in ${team ? team.name : 'the team'}.`);
      setSendState('idle');
      return;
    }
    setFieldError('');
    setLastAddress(address);
    setSendState('sending');
    if (sendTimer.current) clearTimeout(sendTimer.current);
    sendTimer.current = setTimeout(() => {
      setInvitations((prev) => {
        const next = prev.filter((inv) => inv.email.toLowerCase() !== address.toLowerCase());
        return [
          {
            id: `i_${Math.floor(Math.random() * 900 + 100)}`,
            email: address,
            status: 'pending',
            detail: `Sent just now · expires ${INVITE_EXPIRES}`,
          },
          ...next,
        ];
      });
      setEmail('');
      setSendState('sent');
    }, 760);
  };

  const handleCopy = async () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    try {
      if (!navigator.clipboard) throw new Error('no clipboard');
      await navigator.clipboard.writeText(INVITE_URL);
      setCopyState('done');
    } catch (err) {
      setCopyState('failed');
    }
    copyTimer.current = setTimeout(() => setCopyState('idle'), 2600);
  };

  const notice = (() => {
    if (sendState === 'sending') {
      return { word: 'Sending', text: `Handing the invitation for ${lastAddress} to the mail relay…`, Icon: Icons.Clock };
    }
    if (sendState === 'error') {
      return {
        word: 'Delivery failed',
        text: 'We couldn’t send that email — try again, or share the invite link below manually.',
        detail: `Relay rejected ${lastAddress} with a 502 at 09:41. Your address is still in the field above.`,
        Icon: Icons.AlertCircle,
      };
    }
    if (sendState === 'sent') {
      return {
        word: 'Invitation sent',
        text: `${lastAddress} has the join link. It lapses on ${INVITE_EXPIRES} if it goes unused.`,
        Icon: Icons.CheckCircle,
      };
    }
    return {
      word: 'Mail relay ready',
      text: 'Invitations go out through the transactional mail service and stay valid for seven days.',
      Icon: Icons.Bell,
    };
  })();

  const sending = sendState === 'sending';

  return (
    <div
      className="gt min-h-full w-full"
      style={{ backgroundColor: PAPER, color: INK, fontFamily: brand.fontBody }}
    >
      <style>{CSS}</style>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Row 1 — page title */}
        <header data-wf="b-0-0" className="text-center">
          <Eyebrow>Sonartest · Roster</Eyebrow>
          <h1
            className="mt-3 text-4xl sm:text-5xl uppercase"
            style={{ fontFamily: brand.fontHeading, letterSpacing: '0.2em', color: INK }}
          >
            My Team
          </h1>
          <p className="mt-4 text-sm sm:text-base mx-auto max-w-xl" style={{ color: TEXT_MUTED, lineHeight: 1.6 }}>
            Four people, four time zones. Keep the roster current and the overlap view stays honest.
          </p>
          <Ornament className="mt-8" />
        </header>

        {/* Row 2 — create a team */}
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6" aria-labelledby="create-team-heading">
          <Frame data-wf="b-1-0" className="lg:col-span-8">
            <SectionTitle id="create-team-heading">Create a team</SectionTitle>
            <div className="mt-5">
              <Label htmlFor="team-name" className="text-[11px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: TEXT_FAINT }}>
                Team name
              </Label>
              <Input
                id="team-name"
                name="name"
                data-wf="i-1-0-0"
                form="create-team-form"
                value={teamName}
                disabled={Boolean(team)}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Northwind Collective"
                className="mt-2 w-full h-12 px-4 text-base"
                style={{
                  borderRadius: 0,
                  border: `1px solid ${rgba(INK, team ? 0.2 : 0.55)}`,
                  backgroundColor: team ? SURFACE_DEEP : 'rgba(255,255,255,0.8)',
                  color: team ? TEXT_FAINT : INK,
                  fontFamily: brand.fontBody,
                }}
              />
              <p className="mt-3 text-xs" style={{ color: TEXT_FAINT, letterSpacing: '0.04em' }}>
                {team
                  ? 'Locked — one team per account in this version.'
                  : 'You’ll become the first member and can invite the rest straight away.'}
              </p>
              <form id="create-team-form" onSubmit={handleCreate} />
              <div role="status" aria-live="polite">
                {createNotice ? (
                  <p
                    className="gt-enter mt-4 flex items-start gap-3 px-4 py-3 text-sm"
                    style={{ border: `1px solid ${rgba(INK, 0.5)}`, backgroundColor: rgba(GILT, 0.18), color: INK, lineHeight: 1.55 }}
                  >
                    <Icons.AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{createNotice.text}</span>
                  </p>
                ) : null}
              </div>
            </div>
          </Frame>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <Button
              type="submit"
              form="create-team-form"
              data-wf="b-1-1"
              aria-disabled={team ? 'true' : undefined}
              className="gt-btn gt-primary w-full h-14 text-sm font-semibold uppercase"
              style={{
                borderRadius: 0,
                letterSpacing: '0.2em',
                backgroundColor: team ? 'transparent' : INK,
                color: team ? TEXT_MUTED : GILT,
                border: `1px solid ${team ? rgba(INK, 0.45) : INK}`,
                fontFamily: brand.fontHeading,
              }}
            >
              Create team
            </Button>
            <p className="mt-3 text-xs text-center lg:text-left" style={{ color: TEXT_FAINT, lineHeight: 1.6 }}>
              {team ? 'Unavailable while you hold a membership.' : 'Takes you straight to the overlap view.'}
            </p>
          </div>
        </section>

        {/* Row 3 — membership statement */}
        <p
          data-wf="b-2-0"
          className="mt-8 px-5 py-4 text-sm sm:text-[15px] flex items-start gap-3"
          style={{
            borderTop: `1px solid ${GILT}`,
            borderBottom: `1px solid ${GILT}`,
            backgroundColor: SURFACE_DEEP,
            color: TEXT_MUTED,
            lineHeight: 1.65,
          }}
        >
          <Icons.Users className="h-4 w-4 shrink-0 mt-1" style={{ color: INK }} aria-hidden="true" />
          <span>
            You’re a member of{' '}
            <strong style={{ color: INK, fontFamily: brand.fontHeading, letterSpacing: '0.08em' }}>
              {team ? team.name : 'no team yet'}
            </strong>
            , created <span style={{ fontVariantNumeric: 'tabular-nums' }}>{team ? team.created_at : '—'}</span>. Each
            account belongs to one team, so you can’t create another.
          </span>
        </p>

        {/* Row 4 — members table */}
        <section className="mt-10" aria-labelledby="members-heading">
          <Frame data-wf="b-3-0" pad="p-0">
            <div className="px-6 sm:px-8 pt-7 pb-5 text-center">
              <SectionTitle id="members-heading">{`Members (${members.length})`}</SectionTitle>
              <p className="mt-2 text-xs" style={{ color: TEXT_FAINT, letterSpacing: '0.06em' }}>
                Everyone here appears in the overlap view.
              </p>
              <Ornament className="mt-5" />
            </div>

            {members.length === 0 ? (
              <div className="px-6 sm:px-8 pb-8">
                <Empty
                  title="No one here yet"
                  description="Invite a colleague below and their name, time zone and working days will appear in this roster."
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="w-full" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse', minWidth: '680px' }}>
                  <THead>
                    <TR style={{ borderTop: `1px solid ${rgba(INK, 0.55)}`, borderBottom: `1px solid ${rgba(INK, 0.55)}` }}>
                      <TH
                        scope="col"
                        data-wf="i-3-0-0"
                        className="text-left px-6 sm:px-8 py-3 text-[11px] font-semibold uppercase"
                        style={{ letterSpacing: '0.18em', color: TEXT_MUTED }}
                      >
                        Display name
                      </TH>
                      <TH
                        scope="col"
                        data-wf="i-3-0-1"
                        className="text-left px-4 py-3 text-[11px] font-semibold uppercase"
                        style={{ letterSpacing: '0.18em', color: TEXT_MUTED }}
                      >
                        Home time zone
                      </TH>
                      <TH
                        scope="col"
                        data-wf="i-3-0-2"
                        className="text-left px-4 py-3 text-[11px] font-semibold uppercase"
                        style={{ letterSpacing: '0.18em', color: TEXT_MUTED }}
                      >
                        Working days
                      </TH>
                      <TH
                        scope="col"
                        data-wf="i-3-0-3"
                        className="text-right px-6 sm:px-8 py-3 text-[11px] font-semibold uppercase"
                        style={{ letterSpacing: '0.18em', color: TEXT_MUTED }}
                      >
                        Joined
                      </TH>
                    </TR>
                  </THead>
                  <TBody>
                    {members.map((m) => (
                      <TR key={m.id} className="gt-rowhover" style={{ borderBottom: `1px solid ${HAIRLINE}`, transition: 'background-color .18s ease' }}>
                        <TD className="px-6 sm:px-8 py-4 align-middle">
                          <span className="flex items-center gap-3">
                            <Avatar name={m.display_name} className="h-9 w-9 shrink-0" />
                            <span className="flex flex-col">
                              <span className="text-[15px] font-semibold" style={{ color: INK }}>
                                {m.display_name}
                              </span>
                              <span className="text-xs" style={{ color: TEXT_FAINT }}>
                                {m.email}
                              </span>
                            </span>
                            {m.you ? (
                              <Badge
                                className="text-[10px] font-semibold uppercase px-2 py-0.5"
                                style={{ borderRadius: 0, letterSpacing: '0.16em', backgroundColor: INK, color: GILT, border: `1px solid ${INK}` }}
                              >
                                You
                              </Badge>
                            ) : null}
                            {m.owner ? (
                              <Badge
                                className="text-[10px] font-semibold uppercase px-2 py-0.5"
                                style={{ borderRadius: 0, letterSpacing: '0.16em', backgroundColor: 'transparent', color: TEXT_MUTED, border: `1px solid ${GILT}` }}
                              >
                                Owner
                              </Badge>
                            ) : null}
                          </span>
                        </TD>
                        <TD className="px-4 py-4 align-middle">
                          <span className="block text-sm" style={{ color: INK }}>
                            {m.home_timezone}
                          </span>
                          <span className="block text-xs" style={{ color: TEXT_FAINT, fontVariantNumeric: 'tabular-nums' }}>
                            {m.offset}
                          </span>
                        </TD>
                        <TD className="px-4 py-4 align-middle text-sm" style={{ color: m.working_days ? INK : TEXT_FAINT }}>
                          {m.working_days ? (
                            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{m.working_days}</span>
                          ) : (
                            <span className="inline-flex items-center gap-2">
                              <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                              No hours set yet
                            </span>
                          )}
                        </TD>
                        <TD className="px-6 sm:px-8 py-4 align-middle text-sm text-right" style={{ color: TEXT_MUTED, fontVariantNumeric: 'tabular-nums' }}>
                          {m.joined}
                        </TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              </div>
            )}
          </Frame>
        </section>

        {/* Row 5 — invite by email */}
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6" aria-labelledby="invite-heading">
          <Frame data-wf="b-4-0" className="lg:col-span-8">
            <SectionTitle id="invite-heading">Invite by email</SectionTitle>
            <div className="mt-5">
              <Label htmlFor="invite-email" className="text-[11px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: TEXT_FAINT }}>
                Email address
              </Label>
              <Input
                id="invite-email"
                name="email"
                type="email"
                data-wf="i-4-0-0"
                form="invite-form"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldError) setFieldError('');
                }}
                placeholder="colleague@northwind.co"
                aria-invalid={fieldError ? 'true' : undefined}
                aria-describedby={fieldError ? 'invite-email-error' : 'invite-email-hint'}
                className="mt-2 w-full h-12 px-4 text-base"
                style={{
                  borderRadius: 0,
                  border: `1px solid ${fieldError ? INK : rgba(INK, 0.55)}`,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  color: INK,
                  fontFamily: brand.fontBody,
                }}
              />
              {fieldError ? (
                <p id="invite-email-error" className="gt-enter mt-3 flex items-center gap-2 text-sm font-medium" style={{ color: INK }}>
                  <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {fieldError}
                </p>
              ) : (
                <p id="invite-email-hint" className="mt-3 text-xs" style={{ color: TEXT_FAINT }}>
                  They’ll get a join link for {team ? team.name : 'your team'}, good until {INVITE_EXPIRES}.
                </p>
              )}
              <form id="invite-form" onSubmit={handleInvite} />
            </div>

            <div className="mt-7">
              <h3 className="text-[11px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: TEXT_FAINT }}>
                Sent invitations
              </h3>
              {invitations.length === 0 ? (
                <Empty
                  className="mt-3"
                  title="No invitations sent"
                  description="Nothing has gone out from this team yet. Send one above, or pass the invite link to a colleague directly."
                />
              ) : (
                <ul className="mt-3">
                  {invitations.map((inv) => {
                    const meta = STATUS_META[inv.status];
                    const Icon = meta.Icon;
                    return (
                      <li
                        key={inv.id}
                        className="gt-enter flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3"
                        style={{ borderTop: `1px solid ${HAIRLINE}` }}
                      >
                        <span className="text-sm" style={{ color: INK }}>
                          {inv.email}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="text-xs" style={{ color: TEXT_FAINT, fontVariantNumeric: 'tabular-nums' }}>
                            {inv.detail}
                          </span>
                          <Badge
                            className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase px-2 py-1"
                            style={{
                              borderRadius: 0,
                              letterSpacing: '0.14em',
                              border: `1px solid ${inv.status === 'accepted' ? GILT : rgba(INK, 0.45)}`,
                              backgroundColor: inv.status === 'accepted' ? rgba(GILT, 0.3) : 'transparent',
                              color: INK,
                            }}
                          >
                            <Icon className="h-3 w-3" aria-hidden="true" />
                            {meta.label}
                          </Badge>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Frame>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <Button
              type="submit"
              form="invite-form"
              data-wf="b-4-1"
              disabled={sending}
              className="gt-btn gt-primary w-full h-14 text-sm font-semibold uppercase inline-flex items-center justify-center gap-2"
              style={{
                borderRadius: 0,
                letterSpacing: '0.2em',
                backgroundColor: INK,
                color: GILT,
                border: `1px solid ${INK}`,
                opacity: sending ? 0.7 : 1,
                fontFamily: brand.fontHeading,
              }}
            >
              {sending ? (
                <Icons.Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Icons.Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {sending ? 'Sending…' : 'Send invitation'}
            </Button>
            <p className="mt-3 text-xs text-center lg:text-left" style={{ color: TEXT_FAINT, lineHeight: 1.6 }}>
              {sending ? 'Waiting on the mail relay.' : 'One address at a time, so nothing gets lost.'}
            </p>
          </div>
        </section>

        {/* Row 6 — delivery notice */}
        <div
          data-wf="b-5-0"
          role="status"
          aria-live="polite"
          className="gt-enter mt-8 flex items-start gap-3 px-5 py-4"
          style={{
            border: `1px solid ${sendState === 'error' ? INK : rgba(INK, 0.3)}`,
            backgroundColor: sendState === 'error' ? rgba(GILT, 0.22) : SURFACE_DEEP,
          }}
        >
          <notice.Icon className="h-4 w-4 shrink-0 mt-1" style={{ color: INK }} aria-hidden="true" />
          <span>
            <Eyebrow>{notice.word}</Eyebrow>
            <span className="mt-1.5 block text-sm sm:text-[15px]" style={{ color: INK, lineHeight: 1.6 }}>
              {notice.text}
            </span>
            {notice.detail ? (
              <span className="mt-1 block text-xs" style={{ color: TEXT_MUTED, fontVariantNumeric: 'tabular-nums' }}>
                {notice.detail}
              </span>
            ) : null}
          </span>
        </div>

        {/* Row 7 — invite link */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" aria-label="Shareable invite link">
          <button
            type="button"
            data-wf="b-6-0"
            onClick={() => navigate('join')}
            className="gt-btn gt-link gt-ghost lg:col-span-8 text-left px-5 py-4 w-full"
            style={{ border: `1px solid ${GILT}`, backgroundColor: SURFACE, borderRadius: 0, color: INK }}
          >
            <Eyebrow>Shareable invite link</Eyebrow>
            <span
              className="gt-url mt-2 block text-sm sm:text-base break-all"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontVariantNumeric: 'tabular-nums', color: INK }}
            >
              {INVITE_URL} · expires {INVITE_EXPIRES}
            </span>
            <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase" style={{ letterSpacing: '0.16em', color: TEXT_MUTED }}>
              Open invite link
              <Icons.ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </button>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <Button
              type="button"
              data-wf="b-6-1"
              onClick={handleCopy}
              className="gt-btn gt-ghost w-full h-14 text-sm font-semibold uppercase inline-flex items-center justify-center gap-2"
              style={{
                borderRadius: 0,
                letterSpacing: '0.18em',
                backgroundColor: 'transparent',
                color: INK,
                border: `1px solid ${INK}`,
                fontFamily: brand.fontHeading,
              }}
            >
              {copyState === 'done' ? (
                <Icons.Check className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Icons.FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {copyState === 'done' ? 'Link copied' : 'Copy invite link'}
            </Button>
            <p className="mt-3 text-xs text-center lg:text-left" role="status" aria-live="polite" style={{ color: TEXT_FAINT, lineHeight: 1.6 }}>
              {copyState === 'done'
                ? 'On your clipboard — paste it anywhere.'
                : copyState === 'failed'
                ? 'The browser blocked the clipboard. Select the link and copy it by hand.'
                : 'Anyone with this link can join until it expires.'}
            </p>
          </div>
        </section>

        <Ornament className="mt-14" />
      </div>
    </div>
  );
}
