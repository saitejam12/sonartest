// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Badge, Avatar } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, Users, Home, Calendar, Clock, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

// ───────────────────────────────────────────────────────────────────────────
// Northwind Collective · Team Overlap
// Sample data models the real entities: users (display_name, home_timezone)
// and working_hours (day_of_week, start_time, end_time, is_working).
// ───────────────────────────────────────────────────────────────────────────

const rgba = (hex, a) => {
  const h = String(hex).replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

const toNum = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h + m / 60;
};

const fmtT = (n) => {
  const h = Math.floor(n + 1e-9);
  const m = Math.round((n - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const window24 = (vs, ve) => {
  let a = vs;
  let b = ve;
  while (a < 0) { a += 24; b += 24; }
  while (a >= 24) { a -= 24; b -= 24; }
  return b <= 24 ? [[a, b]] : [[a, 24], [0, b - 24]];
};

const TEAM_NAME = 'Northwind Collective';
const VIEWER_TZ = 'Europe/Berlin';

const DAYS = [
  { key: 'mon', dow: 1, tab: 'Mon 16 Nov', long: 'Monday 16 November' },
  { key: 'tue', dow: 2, tab: 'Tue 17 Nov', long: 'Tuesday 17 November' },
  { key: 'wed', dow: 3, tab: 'Wed 18 Nov', long: 'Wednesday 18 November' },
  { key: 'thu', dow: 4, tab: 'Thu 19 Nov', long: 'Thursday 19 November' },
  { key: 'fri', dow: 5, tab: 'Fri 20 Nov', long: 'Friday 20 November' },
  { key: 'sat', dow: 6, tab: 'Sat 21 Nov', long: 'Saturday 21 November' },
  { key: 'sun', dow: 0, tab: 'Sun 22 Nov', long: 'Sunday 22 November' },
];

// working_hours rows for all seven weekdays; days left out are is_working: false
const schedule = (map) =>
  [0, 1, 2, 3, 4, 5, 6].map((d) =>
    map[d]
      ? { day_of_week: d, start_time: map[d][0], end_time: map[d][1], is_working: true }
      : { day_of_week: d, start_time: null, end_time: null, is_working: false }
  );

const MEMBERS = [
  {
    id: 'usr_4821',
    display_name: 'Lena Fischer',
    home_timezone: 'Europe/Berlin',
    offset_label: 'UTC+01:00',
    is_you: true,
    delta: 0, // hours to add to their local time to reach your local time
    dst_note: 'CET since 26 Oct — your own hours moved with the change',
    working_hours: schedule({
      1: ['08:00', '16:00'],
      2: ['08:00', '16:00'],
      3: ['08:00', '16:00'],
      4: ['09:00', '17:00'],
      5: ['08:00', '13:00'],
    }),
  },
  {
    id: 'usr_5106',
    display_name: 'Ana Ruiz',
    home_timezone: 'America/New_York',
    offset_label: 'UTC−05:00',
    delta: 6,
    dst_note: 'EST since 2 Nov — shifted an hour closer to you, no re-entry',
    working_hours: schedule({
      1: ['09:00', '17:00'],
      2: ['09:00', '17:00'],
      3: ['08:00', '16:00'],
      4: ['09:00', '17:00'],
      5: ['09:00', '15:00'],
    }),
  },
  {
    id: 'usr_6730',
    display_name: 'Tom Okafor',
    home_timezone: 'Asia/Singapore',
    offset_label: 'UTC+08:00',
    delta: -7,
    dst_note: 'No daylight saving — a steady 7h ahead of you all year',
    working_hours: schedule({
      1: ['09:30', '18:00'],
      2: ['09:30', '18:00'],
      3: ['13:00', '22:00'],
      4: ['09:30', '18:00'],
      5: ['09:30', '16:00'],
    }),
  },
  {
    id: 'usr_7284',
    display_name: 'Priya Shah',
    home_timezone: 'Asia/Kolkata',
    offset_label: 'UTC+05:30',
    delta: -4.5,
    dst_note: 'No daylight saving — a steady 4h 30m ahead of you',
    working_hours: schedule({}),
  },
];

const SLOT = 0.25;
const SLOTS = 96;

const buildDay = (dow) => {
  const rows = MEMBERS.map((m) => {
    const wh = m.working_hours.find((w) => w.day_of_week === dow);
    const hasSchedule = m.working_hours.some((w) => w.is_working);
    const segments =
      wh && wh.is_working ? window24(toNum(wh.start_time) + m.delta, toNum(wh.end_time) + m.delta) : [];
    return { member: m, wh, hasSchedule, segments };
  });

  const cov = new Array(SLOTS).fill(0);
  const who = Array.from({ length: SLOTS }, () => []);
  rows.forEach((r) =>
    r.segments.forEach(([a, b]) => {
      for (let i = 0; i < SLOTS; i += 1) {
        const t = i * SLOT + SLOT / 2;
        if (t >= a && t < b) {
          cov[i] += 1;
          who[i].push(r.member.display_name);
        }
      }
    })
  );

  const runs = [];
  let i = 0;
  while (i < SLOTS) {
    let j = i;
    while (j < SLOTS && cov[j] === cov[i]) j += 1;
    if (cov[i] >= 2) runs.push({ start: i * SLOT, end: j * SLOT, count: cov[i], names: who[i].slice() });
    i = j;
  }

  const workingRows = rows.filter((r) => r.segments.length > 0);
  const fullN = workingRows.length;
  const full =
    fullN >= 2
      ? runs
          .filter((r) => r.count === fullN)
          .sort((a, b) => b.end - b.start - (a.end - a.start))[0] || null
      : null;
  const partial =
    runs
      .filter((r) => (full ? r.count < fullN : true))
      .sort((a, b) => b.count - a.count || b.end - b.start - (a.end - a.start))[0] || null;

  return { rows, runs, full, partial, workingCount: fullN };
};

const WEEK = DAYS.map((d) => ({ ...d, ...buildDay(d.dow) }));
const FULL_DAYS = WEEK.filter((d) => d.full);

const Rule = ({ className = '' }) => (
  <div className={className} aria-hidden="true">
    <div className="h-px w-full" style={{ backgroundColor: brand.primaryColor }} />
    <div className="mt-[3px] h-px w-full" style={{ backgroundColor: brand.accentColor }} />
  </div>
);

const Ornament = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
    <span className="h-px flex-1" style={{ backgroundColor: rgba(brand.accentColor, 0.9) }} />
    <span className="text-[9px] leading-none" style={{ color: brand.accentColor }}>◆</span>
    <span className="h-px flex-1" style={{ backgroundColor: rgba(brand.accentColor, 0.9) }} />
  </div>
);

const Frame = ({ children, className = '', innerClassName = '' }) => (
  <div className={className} style={{ border: `1px solid ${brand.primaryColor}`, padding: '4px' }}>
    <div
      className={innerClassName}
      style={{ border: `1px solid ${brand.accentColor}`, backgroundColor: rgba('#ffffff', 0.5) }}
    >
      {children}
    </div>
  </div>
);

export default function Screen() {
  const navigate = useNavigate();
  const [dayKey, setDayKey] = React.useState('mon');
  const tabRefs = React.useRef([]);

  const muted = rgba(brand.primaryColor, 0.72);
  const faint = rgba(brand.primaryColor, 0.55);
  const hair = rgba(brand.primaryColor, 0.14);
  const tint = rgba(brand.accentColor, 0.26);

  const dayIndex = WEEK.findIndex((d) => d.key === dayKey);
  const day = WEEK[dayIndex];

  const pct = (h) => (h / 24) * 100;
  const countText = (c) => (c === MEMBERS.length ? `all ${MEMBERS.length} available` : `${c} of ${MEMBERS.length} available`);

  const onTabKeys = (e) => {
    let n = null;
    if (e.key === 'ArrowRight') n = (dayIndex + 1) % WEEK.length;
    else if (e.key === 'ArrowLeft') n = (dayIndex + WEEK.length - 1) % WEEK.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = WEEK.length - 1;
    if (n !== null) {
      e.preventDefault();
      setDayKey(WEEK[n].key);
      const el = tabRefs.current[n];
      if (el && el.focus) el.focus();
    }
  };

  const hourLabels = [0, 3, 6, 9, 12, 15, 18, 21, 24];
  const nobodyWorks = day.workingCount === 0;

  const dayNote = nobodyWorks
    ? `No one on ${TEAM_NAME} works ${day.tab} — Lena, Ana and Tom all keep the weekend non-working, and Priya Shah has no hours set at all.`
    : day.full
    ? `On ${day.tab} every teammate who is working shares ${fmtT(day.full.start)}–${fmtT(day.full.end)}. Priya Shah has no working hours set, so she is never counted inside a window.`
    : `On ${day.tab} there is no window where every member is available — only partial overlaps are shown.`;

  return (
    <div
      className="min-h-full w-full"
      style={{
        backgroundColor: brand.backgroundColor,
        fontFamily: brand.fontBody,
        color: brand.primaryColor,
        ['--ov-primary']: brand.primaryColor,
        ['--ov-accent']: brand.accentColor,
      }}
    >
      <style>{`
        .ov-focus:focus-visible { outline: 2px solid var(--ov-primary); outline-offset: 3px; }
        .ov-tab:hover { background-color: ${rgba(brand.accentColor, 0.22)}; }
        .ov-tab[aria-selected="true"]:hover { background-color: ${brand.primaryColor}; }
        .ov-cta { transition: box-shadow .18s ease, transform .18s ease; }
        .ov-cta:hover { box-shadow: inset 0 0 0 2px ${brand.accentColor}; }
        .ov-cta:active { transform: translateY(1px); }
        @keyframes ovRowIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes ovBandIn { from { opacity: 0; transform: scaleX(.6); } to { opacity: 1; transform: none; } }
        .ov-row { animation: ovRowIn .42s cubic-bezier(.2,.7,.3,1) both; }
        .ov-band { animation: ovBandIn .5s cubic-bezier(.2,.7,.3,1) both; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .ov-row, .ov-band, .ov-cta { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* ── Row 1 · page title ───────────────────────────────────────────── */}
        <header data-wf="b-0-0" className="text-center">
          <p
            className="text-[10px] uppercase tracking-[0.42em]"
            style={{ color: faint }}
          >
            Week of 16–22 November 2026
          </p>
          <h1
            className="mt-4 text-[26px] leading-tight uppercase tracking-[0.14em] sm:text-[36px] sm:tracking-[0.18em]"
            style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
          >
            Team Overlap — {TEAM_NAME}
          </h1>
          <Rule className="mx-auto mt-6 w-full max-w-3xl" />
        </header>

        {/* ── Row 2 · reference-time explainer ─────────────────────────────── */}
        <section data-wf="b-1-0" className="mx-auto mt-8 max-w-[70ch] text-center">
          <p className="text-[15px] leading-7" style={{ color: muted }}>
            All times shown in your local time, {VIEWER_TZ}. Each teammate&apos;s hours follow their own time
            zone and shift automatically with daylight saving.
          </p>
          <p className="mx-auto mt-4 max-w-[66ch] text-[13px] leading-6" style={{ color: faint }}>
            Ana Ruiz&apos;s window moved an hour closer on 2 Nov when New York left daylight saving; yours moved
            on 26 Oct. Nobody re-entered anything.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] tabular-nums" style={{ color: faint }}>
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Recalculated 11 Nov 2026, 09:14 CET
          </p>
        </section>

        {/* ── Row 3 · day tabs ─────────────────────────────────────────────── */}
        <section data-wf="b-2-0" className="mt-10">
          <div
            role="tablist"
            aria-label="Day of the week"
            onKeyDown={onTabKeys}
            className="flex overflow-x-auto"
            style={{ border: `1px solid ${brand.primaryColor}` }}
          >
            {WEEK.map((d, i) => {
              const selected = d.key === dayKey;
              return (
                <button
                  key={d.key}
                  data-wf={`i-2-0-${i}`}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  id={`ov-tab-${d.key}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="ov-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setDayKey(d.key)}
                  className="ov-tab ov-focus min-h-[48px] min-w-[104px] flex-1 whitespace-nowrap px-3 py-3 text-[11px] uppercase tracking-[0.18em] tabular-nums transition-colors"
                  style={{
                    backgroundColor: selected ? brand.primaryColor : 'transparent',
                    color: selected ? brand.accentColor : muted,
                    borderLeft: i === 0 ? 'none' : `1px solid ${hair}`,
                    boxShadow: selected ? `inset 0 -3px 0 0 ${brand.accentColor}` : 'none',
                    fontFamily: brand.fontHeading,
                  }}
                >
                  {d.tab}
                  {d.full ? (
                    <span className="ml-2 text-[9px]" aria-label="has a full overlap" title="Full overlap">
                      ◆
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>

        <div
          id="ov-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`ov-tab-${dayKey}`}
          className="ov-focus mt-10 space-y-10 sm:mt-12 sm:space-y-12"
        >
          {/* ── Row 4 · chart ──────────────────────────────────────────────── */}
          <section data-wf="b-3-0">
            <Frame innerClassName="px-4 py-6 sm:px-8 sm:py-8">
              <div className="text-center">
                <h2
                  className="text-[13px] uppercase tracking-[0.26em] sm:text-[15px]"
                  style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                >
                  Working hours 00:00–24:00 · 4 teammates side by side
                </h2>
                <p className="mt-2 text-[12px] tabular-nums" style={{ color: faint }}>
                  {day.long} · plotted against your local time, {VIEWER_TZ}
                </p>
                <Ornament className="mx-auto mt-5 max-w-sm" />
              </div>

              {nobodyWorks ? (
                <p
                  className="mx-auto mt-6 flex max-w-xl items-start gap-3 px-4 py-3 text-[13px] leading-6"
                  style={{ border: `1px solid ${hair}`, backgroundColor: rgba(brand.neutralColor, 0.1), color: muted }}
                >
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    No working hours on {day.tab}. Every track below is empty — pick a weekday to compare
                    availability.
                  </span>
                </p>
              ) : null}

              <div className="mt-7 grid gap-x-6 sm:grid-cols-[12rem_1fr]">
                <div className="hidden sm:block" />
                <div>
                  {/* hour axis */}
                  <div className="relative h-4 text-[10px] tabular-nums" style={{ color: faint }} aria-hidden="true">
                    {hourLabels.map((h) => {
                      const edgeL = h === 0;
                      const edgeR = h === 24;
                      const minor = h % 6 !== 0;
                      return (
                        <span
                          key={h}
                          className={`absolute top-0 ${minor ? 'hidden sm:block' : ''} ${edgeL ? 'left-0' : ''} ${edgeR ? 'right-0' : ''}`}
                          style={edgeL || edgeR ? {} : { left: `${pct(h)}%`, transform: 'translateX(-50%)' }}
                        >
                          {fmtT(h)}
                        </span>
                      );
                    })}
                  </div>
                  {/* overlap ruler */}
                  <div className="relative mt-2 h-4" aria-hidden="true">
                    {day.full ? (
                      <div
                        className="ov-band absolute inset-y-0 flex items-center justify-center"
                        key={`full-${dayKey}`}
                        style={{
                          left: `${pct(day.full.start)}%`,
                          width: `${pct(day.full.end - day.full.start)}%`,
                          backgroundColor: tint,
                          border: `1px solid ${brand.accentColor}`,
                        }}
                      >
                        <span className="text-[8px] leading-none" style={{ color: brand.primaryColor }}>◆</span>
                      </div>
                    ) : null}
                    {day.partial ? (
                      <div
                        className="ov-band absolute inset-y-0"
                        key={`part-${dayKey}`}
                        style={{
                          left: `${pct(day.partial.start)}%`,
                          width: `${pct(day.partial.end - day.partial.start)}%`,
                          border: `1px dashed ${rgba(brand.accentColor, 0.95)}`,
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>

              <ul key={dayKey} className="mt-1">
                {day.rows.map((r, idx) => {
                  const m = r.member;
                  const local =
                    r.wh && r.wh.is_working ? `${r.wh.start_time}–${r.wh.end_time}` : null;
                  const yours = r.segments.length
                    ? r.segments.map(([a, b]) => `${fmtT(a)}–${fmtT(b)}`).join(' and ')
                    : null;
                  const state = !r.hasSchedule ? 'none' : r.segments.length ? 'working' : 'off';
                  return (
                    <li
                      key={m.id}
                      className="ov-row grid gap-x-6 gap-y-2 py-4 sm:grid-cols-[12rem_1fr] sm:items-center"
                      style={{
                        borderTop: idx === 0 ? 'none' : `1px solid ${hair}`,
                        animationDelay: `${idx * 70}ms`,
                      }}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 sm:block">
                        <span
                          className="text-[12px] uppercase tracking-[0.12em]"
                          style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                        >
                          {m.display_name}
                          {m.is_you ? <span className="ml-1 normal-case tracking-normal" style={{ color: faint }}>(you)</span> : null}
                        </span>
                        <span className="block text-[11px] tabular-nums" style={{ color: faint }}>
                          {m.home_timezone} · {m.offset_label}
                        </span>
                      </div>

                      <div
                        className="relative h-10"
                        style={{
                          backgroundColor: rgba(brand.primaryColor, 0.04),
                          border: `1px solid ${hair}`,
                        }}
                      >
                        {/* night tints */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-y-0 left-0"
                          style={{ width: `${pct(7)}%`, backgroundColor: rgba(brand.neutralColor, 0.14) }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-y-0 right-0"
                          style={{ width: `${pct(5)}%`, backgroundColor: rgba(brand.neutralColor, 0.14) }}
                        />
                        {/* hour grid */}
                        {[3, 6, 9, 12, 15, 18, 21].map((h) => (
                          <span
                            key={h}
                            aria-hidden="true"
                            className="absolute inset-y-0 w-px"
                            style={{
                              left: `${pct(h)}%`,
                              backgroundColor: rgba(brand.primaryColor, h === 12 ? 0.18 : 0.09),
                            }}
                          />
                        ))}

                        {state === 'working'
                          ? r.segments.map(([a, b], si) => {
                              const wide = b - a >= 4.5;
                              return (
                                <div
                                  key={si}
                                  aria-hidden="true"
                                  className="absolute inset-y-[3px] z-10 flex items-center overflow-hidden px-2"
                                  style={{
                                    left: `${pct(a)}%`,
                                    width: `${pct(b - a)}%`,
                                    backgroundColor: brand.primaryColor,
                                    boxShadow: `inset 0 0 0 1px ${rgba(brand.accentColor, 0.55)}`,
                                  }}
                                >
                                  {wide ? (
                                    <span
                                      className="whitespace-nowrap text-[10px] uppercase tracking-[0.12em] tabular-nums"
                                      style={{ color: brand.accentColor }}
                                    >
                                      {fmtT(a)}–{fmtT(b)}
                                    </span>
                                  ) : null}
                                </div>
                              );
                            })
                          : (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 flex items-center justify-center"
                              style={{
                                backgroundImage: `repeating-linear-gradient(45deg, ${rgba(brand.neutralColor, 0.28)} 0 5px, transparent 5px 11px)`,
                              }}
                            >
                              <span
                                className="px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]"
                                style={{ backgroundColor: brand.backgroundColor, color: muted }}
                              >
                                {state === 'none' ? 'No working hours set' : 'Non-working day'}
                              </span>
                            </div>
                          )}

                        {/* overlap guides */}
                        {day.full ? (
                          <div
                            aria-hidden="true"
                            className="ov-band pointer-events-none absolute inset-y-0 z-20"
                            style={{
                              left: `${pct(day.full.start)}%`,
                              width: `${pct(day.full.end - day.full.start)}%`,
                              backgroundColor: rgba(brand.accentColor, 0.3),
                              borderLeft: `1px solid ${brand.accentColor}`,
                              borderRight: `1px solid ${brand.accentColor}`,
                            }}
                          />
                        ) : null}
                        {day.partial ? (
                          <div
                            aria-hidden="true"
                            className="ov-band pointer-events-none absolute inset-y-0 z-20"
                            style={{
                              left: `${pct(day.partial.start)}%`,
                              width: `${pct(day.partial.end - day.partial.start)}%`,
                              borderLeft: `1px dashed ${brand.accentColor}`,
                              borderRight: `1px dashed ${brand.accentColor}`,
                            }}
                          />
                        ) : null}

                        <span className="sr-only">
                          {state === 'working'
                            ? `${m.display_name} works ${local} in ${m.home_timezone} on ${day.long}, which is ${yours} in your local time.`
                            : state === 'off'
                            ? `${m.display_name} marks ${day.tab} as a non-working day.`
                            : `${m.display_name} has no working hours set, so no availability is shown.`}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.14em]" style={{ color: muted }}>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-3 w-6" style={{ backgroundColor: brand.primaryColor }} aria-hidden="true" />
                  Working hours
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-6"
                    style={{ backgroundColor: tint, border: `1px solid ${brand.accentColor}` }}
                    aria-hidden="true"
                  />
                  ◆ Full overlap
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-3 w-6" style={{ border: `1px dashed ${brand.accentColor}` }} aria-hidden="true" />
                  Partial overlap
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-6"
                    style={{ backgroundImage: `repeating-linear-gradient(45deg, ${rgba(brand.neutralColor, 0.45)} 0 4px, transparent 4px 9px)`, border: `1px solid ${hair}` }}
                    aria-hidden="true"
                  />
                  No hours
                </li>
              </ul>
            </Frame>
          </section>

          {/* ── Row 5 · the two window cards ───────────────────────────────── */}
          <section>
            <h2 className="sr-only">Shared windows on {day.long}</h2>
            <div className="grid grid-cols-12 gap-6">
              {/* Best meeting time */}
              <div data-wf="b-4-0" className="col-span-12 md:col-span-6">
                <Frame innerClassName="h-full px-5 py-6 sm:px-7 sm:py-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className="text-[12px] uppercase tracking-[0.24em]"
                      style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                    >
                      Best meeting time
                    </h3>
                    <Badge
                      className="rounded-none px-2 py-1 text-[10px] uppercase tracking-[0.16em]"
                      style={{
                        backgroundColor: day.full ? tint : 'transparent',
                        border: `1px solid ${day.full ? brand.accentColor : hair}`,
                        color: brand.primaryColor,
                      }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {day.full ? <Check className="h-3 w-3" aria-hidden="true" /> : <AlertCircle className="h-3 w-3" aria-hidden="true" />}
                        {day.full ? 'Full overlap' : 'No full overlap'}
                      </span>
                    </Badge>
                  </div>
                  <Ornament className="mt-4" />

                  {day.full ? (
                    <div className="mt-5">
                      <p
                        className="text-[30px] leading-none tracking-[0.06em] tabular-nums sm:text-[36px]"
                        style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                      >
                        {fmtT(day.full.start)}–{fmtT(day.full.end)}
                      </p>
                      <p className="mt-3 text-[13px] leading-6" style={{ color: muted }}>
                        {countText(day.full.count)} — everyone working {day.tab} is inside their own hours.
                      </p>
                      <p className="mt-1 text-[13px] leading-6 tabular-nums" style={{ color: faint }}>
                        {day.full.names.join(' · ')}
                      </p>
                    </div>
                  ) : nobodyWorks ? (
                    <div className="mt-5">
                      <p
                        className="text-[22px] leading-tight tracking-[0.08em]"
                        style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                      >
                        Nobody is working
                      </p>
                      <p className="mt-3 text-[13px] leading-6" style={{ color: muted }}>
                        {day.tab} is non-working for Lena Fischer, Ana Ruiz and Tom Okafor, and Priya Shah has no
                        hours set. There is nothing to overlap.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <p
                        className="text-[22px] leading-tight tracking-[0.08em]"
                        style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                      >
                        None on {day.tab}
                      </p>
                      <p className="mt-3 text-[13px] leading-6" style={{ color: muted }}>
                        No window covers all {day.workingCount} teammates who are working {day.tab}.
                        {day.partial
                          ? ` The closest is ${fmtT(day.partial.start)}–${fmtT(day.partial.end)} with ${countText(day.partial.count)}.`
                          : ''}
                      </p>
                      {FULL_DAYS.length ? (
                        <p className="mt-2 text-[13px] leading-6 tabular-nums" style={{ color: faint }}>
                          {FULL_DAYS.length === 1
                            ? `${FULL_DAYS[0].tab} is the only day this week with a window for everyone working (${fmtT(FULL_DAYS[0].full.start)}–${fmtT(FULL_DAYS[0].full.end)}).`
                            : `Days with a full window this week: ${FULL_DAYS.map((d) => d.tab).join(', ')}.`}
                        </p>
                      ) : null}
                    </div>
                  )}

                  <p className="mt-6 border-t pt-4 text-[11px] leading-5" style={{ borderColor: hair, color: faint }}>
                    This view shows the window only — Northwind does not propose, confirm or save meetings.
                  </p>
                </Frame>
              </div>

              {/* Partial overlap */}
              <div data-wf="b-4-1" className="col-span-12 md:col-span-6">
                <Frame innerClassName="h-full px-5 py-6 sm:px-7 sm:py-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3
                      className="text-[12px] uppercase tracking-[0.24em]"
                      style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                    >
                      Partial overlap
                    </h3>
                    <Badge
                      className="rounded-none px-2 py-1 text-[10px] uppercase tracking-[0.16em]"
                      style={{ backgroundColor: 'transparent', border: `1px dashed ${brand.accentColor}`, color: brand.primaryColor }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3 w-3" aria-hidden="true" />
                        {day.partial ? `${day.partial.count} of ${MEMBERS.length}` : 'None'}
                      </span>
                    </Badge>
                  </div>
                  <Ornament className="mt-4" />

                  {day.partial ? (
                    <div className="mt-5">
                      <p
                        className="text-[30px] leading-none tracking-[0.06em] tabular-nums sm:text-[36px]"
                        style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                      >
                        {fmtT(day.partial.start)}–{fmtT(day.partial.end)}
                      </p>
                      <p className="mt-3 text-[13px] leading-6" style={{ color: muted }}>
                        {countText(day.partial.count)} — the longest window where most of the team is inside their
                        hours.
                      </p>
                      <p className="mt-1 text-[13px] leading-6 tabular-nums" style={{ color: faint }}>
                        {day.partial.names.join(' · ')}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5">
                      <p
                        className="text-[22px] leading-tight tracking-[0.08em]"
                        style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                      >
                        No two teammates meet
                      </p>
                      <p className="mt-3 text-[13px] leading-6" style={{ color: muted }}>
                        {nobodyWorks
                          ? `Nobody keeps hours on ${day.tab}, so there is no partial window either.`
                          : `Only one teammate is working on ${day.tab}, so no shared window exists.`}
                      </p>
                    </div>
                  )}

                  <p className="mt-6 border-t pt-4 text-[11px] leading-5" style={{ borderColor: hair, color: faint }}>
                    Priya Shah has no working hours set, so no window on this team can reach {MEMBERS.length} of {MEMBERS.length}.
                  </p>
                </Frame>
              </div>
            </div>
          </section>

          {/* ── Row 6 · day note ───────────────────────────────────────────── */}
          <section data-wf="b-5-0" className="mx-auto max-w-[72ch]">
            <div
              className="flex items-start gap-3 px-5 py-4"
              style={{ borderLeft: `3px solid ${brand.accentColor}`, backgroundColor: rgba(brand.neutralColor, 0.1) }}
            >
              {day.full ? (
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.primaryColor }} />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.primaryColor }} />
              )}
              <p className="text-[14px] leading-6" style={{ color: muted }}>
                {dayNote}
              </p>
            </div>
          </section>

          {/* ── Row 7 · teammates ──────────────────────────────────────────── */}
          <section data-wf="b-6-0">
            <div className="text-center">
              <h2
                className="text-[13px] uppercase tracking-[0.28em]"
                style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
              >
                Teammates
              </h2>
              <p className="mt-2 text-[12px] tabular-nums" style={{ color: faint }}>
                {MEMBERS.length} members · hours shown for {day.tab}
              </p>
              <Ornament className="mx-auto mt-5 max-w-md" />
            </div>

            <ul className="mt-6">
              {day.rows.map((r, idx) => {
                const m = r.member;
                const working = r.segments.length > 0;
                const status = !r.hasSchedule ? 'No hours set' : working ? 'Working' : 'Non-working day';
                const localRange = r.wh && r.wh.is_working ? `${r.wh.start_time}–${r.wh.end_time}` : null;
                const yourRange = working ? r.segments.map(([a, b]) => `${fmtT(a)}–${fmtT(b)}`).join(' + ') : null;
                return (
                  <li
                    key={m.id}
                    data-wf={`i-6-0-${idx}`}
                    className="grid gap-x-6 gap-y-3 py-5 sm:grid-cols-[1.1fr_1fr_auto] sm:items-center"
                    style={{ borderTop: `1px solid ${hair}` }}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar name={m.display_name} className="h-10 w-10 shrink-0" />
                      <div>
                        <p
                          className="text-[13px] uppercase tracking-[0.12em]"
                          style={{ fontFamily: brand.fontHeading, color: brand.primaryColor }}
                        >
                          {m.display_name}
                          {m.is_you ? (
                            <span className="ml-2 align-middle text-[10px] normal-case tracking-[0.16em]" style={{ color: faint }}>
                              · you
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-1 text-[12px] tabular-nums" style={{ color: faint }}>
                          {m.home_timezone} · {m.offset_label}
                        </p>
                      </div>
                    </div>

                    <div className="tabular-nums">
                      {working ? (
                        <>
                          <p className="text-[14px]" style={{ color: brand.primaryColor }}>
                            {localRange}
                            <span className="ml-2 text-[12px]" style={{ color: faint }}>
                              local
                            </span>
                          </p>
                          <p className="mt-1 text-[13px]" style={{ color: muted }}>
                            ({yourRange} your time)
                          </p>
                        </>
                      ) : (
                        <p className="text-[13px] leading-6" style={{ color: muted }}>
                          {r.hasSchedule
                            ? `${day.tab} is marked non-working — no availability counted.`
                            : 'No working hours set — not counted in any overlap window.'}
                        </p>
                      )}
                      <p className="mt-1 text-[11px] leading-5" style={{ color: faint }}>
                        {m.dst_note}
                      </p>
                    </div>

                    <div className="sm:justify-self-end">
                      <Badge
                        className="rounded-none px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]"
                        style={{
                          backgroundColor: working ? tint : 'transparent',
                          border: `1px ${r.hasSchedule ? 'solid' : 'dashed'} ${working ? brand.accentColor : hair}`,
                          color: brand.primaryColor,
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {working ? (
                            <Check className="h-3 w-3" aria-hidden="true" />
                          ) : r.hasSchedule ? (
                            <X className="h-3 w-3" aria-hidden="true" />
                          ) : (
                            <AlertCircle className="h-3 w-3" aria-hidden="true" />
                          )}
                          {status}
                        </span>
                      </Badge>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="h-px w-full" style={{ backgroundColor: hair }} aria-hidden="true" />
          </section>
        </div>

        {/* ── Row 8 · primary action ───────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-12">
          <div className="col-span-12 sm:col-span-4 sm:col-start-5">
            <Button
              data-wf="b-7-0"
              type="button"
              onClick={() => navigate('my-availability')}
              className="ov-cta ov-focus flex min-h-[52px] w-full items-center justify-center gap-2 px-6 text-[12px] uppercase tracking-[0.22em]"
              style={{
                backgroundColor: brand.primaryColor,
                color: brand.accentColor,
                borderRadius: brand.radius,
                boxShadow: `inset 0 0 0 1px ${brand.accentColor}`,
                fontFamily: brand.fontHeading,
              }}
            >
              Update my working hours
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <p className="mt-4 text-center text-[11px] leading-5" style={{ color: faint }}>
              Changes to your weekly hours appear here the next time this view loads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
