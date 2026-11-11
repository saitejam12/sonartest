// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Checkbox, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, Home, AlertCircle, CheckCircle } = Icons;

const TIMEZONES = [
  { id: 'Pacific/Auckland', offset: 'UTC+13:00', abbr: 'NZDT', dst: 'Daylight time now — returns to UTC+12:00 on 4 Apr 2027.' },
  { id: 'Australia/Sydney', offset: 'UTC+11:00', abbr: 'AEDT', dst: 'Daylight time now — returns to UTC+10:00 on 4 Apr 2027.' },
  { id: 'Asia/Tokyo', offset: 'UTC+09:00', abbr: 'JST', dst: 'This zone does not observe daylight saving.' },
  { id: 'Asia/Singapore', offset: 'UTC+08:00', abbr: 'SGT', dst: 'This zone does not observe daylight saving.' },
  { id: 'Asia/Kolkata', offset: 'UTC+05:30', abbr: 'IST', dst: 'This zone does not observe daylight saving.' },
  { id: 'Asia/Dubai', offset: 'UTC+04:00', abbr: 'GST', dst: 'This zone does not observe daylight saving.' },
  { id: 'Europe/Istanbul', offset: 'UTC+03:00', abbr: 'TRT', dst: 'This zone does not observe daylight saving.' },
  { id: 'Europe/Berlin', offset: 'UTC+01:00', abbr: 'CET', dst: 'Standard time now — shifts to UTC+02:00 on 28 Mar 2027.' },
  { id: 'Europe/Lisbon', offset: 'UTC+00:00', abbr: 'WET', dst: 'Standard time now — shifts to UTC+01:00 on 28 Mar 2027.' },
  { id: 'Europe/London', offset: 'UTC+00:00', abbr: 'GMT', dst: 'Standard time now — shifts to UTC+01:00 on 28 Mar 2027.' },
  { id: 'UTC', offset: 'UTC+00:00', abbr: 'UTC', dst: 'Fixed offset — never adjusts.' },
  { id: 'America/Sao_Paulo', offset: 'UTC−03:00', abbr: 'BRT', dst: 'Brazil no longer observes daylight saving.' },
  { id: 'America/New_York', offset: 'UTC−05:00', abbr: 'EST', dst: 'Standard time now — shifts to UTC−04:00 on 14 Mar 2027.' },
  { id: 'America/Chicago', offset: 'UTC−06:00', abbr: 'CST', dst: 'Standard time now — shifts to UTC−05:00 on 14 Mar 2027.' },
  { id: 'America/Denver', offset: 'UTC−07:00', abbr: 'MST', dst: 'Standard time now — shifts to UTC−06:00 on 14 Mar 2027.' },
  { id: 'America/Los_Angeles', offset: 'UTC−08:00', abbr: 'PST', dst: 'Standard time now — shifts to UTC−07:00 on 14 Mar 2027.' },
  { id: 'Pacific/Honolulu', offset: 'UTC−10:00', abbr: 'HST', dst: 'This zone does not observe daylight saving.' },
];

const BROWSER_SUGGESTED_TZ = 'Europe/Berlin';

const INITIAL_DAYS = [
  { day_of_week: 1, name: 'Monday', is_working: true, start_time: '09:00', end_time: '17:30' },
  { day_of_week: 2, name: 'Tuesday', is_working: true, start_time: '09:00', end_time: '17:30' },
  { day_of_week: 3, name: 'Wednesday', is_working: true, start_time: '10:00', end_time: '09:30' },
  { day_of_week: 4, name: 'Thursday', is_working: true, start_time: '09:00', end_time: '17:30' },
  { day_of_week: 5, name: 'Friday', is_working: true, start_time: '08:30', end_time: '14:00' },
  { day_of_week: 6, name: 'Saturday', is_working: false, start_time: '', end_time: '' },
  { day_of_week: 7, name: 'Sunday', is_working: false, start_time: '', end_time: '' },
];

const ACCOUNT_EMAIL = 'mara.okonkwo@northfold.studio';

export default function Screen() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = React.useState('Mara Okonkwo');
  const [timezone, setTimezone] = React.useState(BROWSER_SUGGESTED_TZ);
  const [tzConfirmed, setTzConfirmed] = React.useState(false);
  const [days, setDays] = React.useState(INITIAL_DAYS);
  const [dirty, setDirty] = React.useState(false);
  const [attempted, setAttempted] = React.useState(false);
  const [status, setStatus] = React.useState('idle'); // idle | saving | saved

  const timers = React.useRef([]);
  const nameRef = React.useRef(null);

  React.useEffect(function () {
    return function () { timers.current.forEach(clearTimeout); };
  }, []);

  const zone = TIMEZONES.find(function (t) { return t.id === timezone; }) || TIMEZONES[7];

  const nameError = displayName.trim() === ''
    ? 'A display name is required — teammates see it beside your hours.'
    : null;

  const invalidDays = days.filter(function (d) {
    return d.is_working && d.start_time && d.end_time && d.end_time <= d.start_time;
  });
  const blankWorkingDays = days.filter(function (d) {
    return d.is_working && (!d.start_time || !d.end_time);
  });

  const hasBlockingError = Boolean(nameError) || invalidDays.length > 0;

  const weeklyHours = days.reduce(function (sum, d) {
    if (!d.is_working || !d.start_time || !d.end_time || d.end_time <= d.start_time) return sum;
    const s = d.start_time.split(':');
    const e = d.end_time.split(':');
    return sum + ((Number(e[0]) * 60 + Number(e[1])) - (Number(s[0]) * 60 + Number(s[1]))) / 60;
  }, 0);
  const workingDayCount = days.filter(function (d) {
    return d.is_working && d.start_time && d.end_time && d.end_time > d.start_time;
  }).length;

  function touch() {
    setDirty(true);
    if (status === 'saved') setStatus('idle');
  }

  function updateDay(dow, patch) {
    setDays(function (prev) {
      return prev.map(function (d) { return d.day_of_week === dow ? Object.assign({}, d, patch) : d; });
    });
    touch();
  }

  function handleSave(e) {
    e.preventDefault();
    setAttempted(true);
    if (hasBlockingError) {
      if (nameError && nameRef.current) nameRef.current.focus();
      return;
    }
    setStatus('saving');
    const t1 = setTimeout(function () {
      setStatus('saved');
      setDirty(false);
      setTzConfirmed(true);
      const t2 = setTimeout(function () { navigate('overlap'); }, 1200);
      timers.current.push(t2);
    }, 850);
    timers.current.push(t1);
  }

  const ink = brand.primaryColor;
  const gild = brand.accentColor;
  const muted = brand.neutralColor;
  const surface = 'rgba(255,255,255,0.58)';
  const hairline = 'rgba(18,32,28,0.14)';

  function ornament(width) {
    return (
      <div aria-hidden="true" className="flex items-center justify-center gap-3" style={{ width: width || '100%' }}>
        <span className="h-px flex-1" style={{ backgroundColor: gild }} />
        <span className="inline-block h-2 w-2 rotate-45" style={{ backgroundColor: gild }} />
        <span className="inline-block h-1.5 w-1.5 rotate-45" style={{ backgroundColor: ink }} />
        <span className="inline-block h-2 w-2 rotate-45" style={{ backgroundColor: gild }} />
        <span className="h-px flex-1" style={{ backgroundColor: gild }} />
      </div>
    );
  }

  function frameOutline() {
    return (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ top: -6, left: -6, right: -6, bottom: -6, border: '1px solid ' + ink, opacity: 0.55 }}
      />
    );
  }

  const headingStyle = { fontFamily: brand.fontHeading, color: ink, letterSpacing: '0.18em' };
  const labelStyle = { fontFamily: brand.fontHeading, color: ink, letterSpacing: '0.16em' };
  const numeric = { fontVariantNumeric: 'tabular-nums' };

  return (
    <div
      className="min-h-full w-full px-4 py-10 sm:px-8"
      style={{ backgroundColor: brand.backgroundColor, fontFamily: brand.fontBody, color: ink }}
    >
      <style>{`
        .gx-focus:focus-visible { outline: 2px solid ${ink}; outline-offset: 3px; }
        .gx-row { transition: background-color 180ms ease; }
        .gx-row:hover { background-color: rgba(159,181,127,0.10); }
        .gx-primary { transition: background-color 160ms ease, color 160ms ease; }
        .gx-primary:hover:not(:disabled) { background-color: ${gild}; color: ${ink}; }
        .gx-ghost { transition: background-color 160ms ease, border-color 160ms ease; }
        .gx-ghost:hover { background-color: rgba(18,32,28,0.06); }
        .gx-enter { animation: gxEnter 260ms ease-out both; }
        @keyframes gxEnter { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        .gx-pulse { animation: gxPulse 1.6s ease-in-out infinite; }
        @keyframes gxPulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .gx-enter, .gx-pulse, .gx-row, .gx-primary, .gx-ghost { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-4xl">

        {/* Row 1 — page title */}
        <header data-wf="b-0-0" className="text-center">
          <div className="mx-auto mb-5 max-w-xs">{ornament()}</div>
          <h1 className="text-[30px] uppercase leading-tight sm:text-[38px]" style={headingStyle}>
            My Availability
          </h1>
          <p className="mt-4 text-[13px]" style={{ color: muted }}>
            Signed in as <span style={numeric}>{ACCOUNT_EMAIL}</span> · session ends after 30 minutes idle
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {dirty ? (
              <Badge
                className="gx-enter rounded-none px-3 py-1 text-[11px] uppercase"
                style={{ backgroundColor: 'transparent', border: '1px solid ' + ink, color: ink, letterSpacing: '0.14em' }}
              >
                Unsaved changes
              </Badge>
            ) : (
              <Badge
                className="rounded-none px-3 py-1 text-[11px] uppercase"
                style={{ backgroundColor: 'transparent', border: '1px solid ' + hairline, color: muted, letterSpacing: '0.14em' }}
              >
                {status === 'saved' ? 'All changes saved' : 'Last saved 4 Nov 2026, 18:12'}
              </Badge>
            )}
          </div>
          <div className="mx-auto mt-6 max-w-sm">{ornament()}</div>
        </header>

        <form onSubmit={handleSave} className="mt-10 space-y-12" noValidate>

          {/* Row 2 — profile */}
          <section data-wf="b-1-0" className="relative">
            {frameOutline()}
            <div className="relative px-5 py-8 sm:px-10" style={{ border: '1px solid ' + gild, backgroundColor: surface }}>
              <h2 className="text-center text-[15px] uppercase" style={headingStyle}>Profile</h2>
              <div className="mx-auto mt-5 max-w-[220px]">{ornament()}</div>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <Label htmlFor="display_name" className="block text-[11px] uppercase" style={labelStyle}>
                    Display name
                  </Label>
                  <Input
                    data-wf="i-1-0-0"
                    id="display_name"
                    ref={nameRef}
                    name="display_name"
                    value={displayName}
                    autoComplete="name"
                    aria-invalid={attempted && nameError ? 'true' : 'false'}
                    aria-describedby="display_name_help"
                    onChange={function (e) { setDisplayName(e.target.value); touch(); }}
                    className="gx-focus mt-3 h-11 w-full rounded-none bg-transparent px-3 text-[15px]"
                    style={{ border: '1px solid ' + (attempted && nameError ? ink : hairline), color: ink, backgroundColor: 'rgba(255,255,255,0.7)' }}
                  />
                  <p id="display_name_help" className="mt-2 text-[12px]" style={{ color: attempted && nameError ? ink : muted }}>
                    {attempted && nameError ? nameError : 'Shown beside your hours in the team overlap view.'}
                  </p>
                </div>

                <div>
                  <Label htmlFor="home_timezone" className="block text-[11px] uppercase" style={labelStyle}>
                    Home time zone (suggested from your browser
                  </Label>
                  <Select
                    data-wf="i-1-0-1"
                    id="home_timezone"
                    name="home_timezone"
                    value={timezone}
                    aria-describedby="home_timezone_help"
                    onChange={function (e) { setTimezone(e.target.value); touch(); }}
                    className="gx-focus mt-3 h-11 w-full rounded-none px-3 text-[15px]"
                    style={{ border: '1px solid ' + hairline, color: ink, backgroundColor: 'rgba(255,255,255,0.7)' }}
                  >
                    {TIMEZONES.map(function (t) {
                      return (
                        <option key={t.id} value={t.id}>
                          {t.id.replace('_', ' ') + '  ·  ' + t.offset + ' ' + t.abbr}
                        </option>
                      );
                    })}
                  </Select>
                  <p id="home_timezone_help" className="mt-2 text-[12px] leading-relaxed" style={{ color: muted }}>
                    {!tzConfirmed
                      ? 'Suggested from your browser: Europe/Berlin — confirm to save.'
                      : 'Saved as your home time zone.'}
                    <br />
                    <span style={numeric}>{zone.offset + ' ' + zone.abbr}</span> — {zone.dst}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Row 3 — standing note */}
          <section data-wf="b-2-0">
            <p
              className="mx-auto max-w-[68ch] px-5 py-4 text-center text-[13px] leading-relaxed"
              style={{ borderTop: '1px solid ' + hairline, borderBottom: '1px solid ' + hairline, color: muted }}
            >
              A display name is required. Your hours are stored in your home time zone and adjust
              automatically for daylight-saving changes.
            </p>
          </section>

          {/* Row 4 — weekly working hours */}
          <section data-wf="b-3-0" className="relative">
            {frameOutline()}
            <div className="relative px-4 py-8 sm:px-8" style={{ border: '1px solid ' + gild, backgroundColor: surface }}>
              <h2 className="text-center text-[15px] uppercase" style={headingStyle}>Weekly working hours</h2>
              <div className="mx-auto mt-5 max-w-[220px]">{ornament()}</div>

              <div className="mt-8 overflow-x-auto">
                <Table className="w-full min-w-[620px] border-collapse text-left" style={numeric}>
                  <THead>
                    <TR style={{ borderBottom: '1px solid ' + ink }}>
                      <TH data-wf="i-3-0-0" scope="col" className="px-3 pb-3 text-[11px] uppercase" style={labelStyle}>Day of week</TH>
                      <TH data-wf="i-3-0-1" scope="col" className="px-3 pb-3 text-[11px] uppercase" style={labelStyle}>Working day</TH>
                      <TH data-wf="i-3-0-2" scope="col" className="px-3 pb-3 text-[11px] uppercase" style={labelStyle}>Start time</TH>
                      <TH data-wf="i-3-0-3" scope="col" className="px-3 pb-3 text-[11px] uppercase" style={labelStyle}>End time</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {days.map(function (d) {
                      const bad = d.is_working && d.start_time && d.end_time && d.end_time <= d.start_time;
                      return (
                        <TR
                          key={d.day_of_week}
                          className="gx-row"
                          style={{ borderBottom: '1px solid ' + hairline, backgroundColor: bad ? 'rgba(18,32,28,0.05)' : 'transparent' }}
                        >
                          <TH scope="row" className="px-3 py-4 text-left align-middle text-[14px] font-normal uppercase" style={{ fontFamily: brand.fontHeading, letterSpacing: '0.1em', color: ink }}>
                            <span className="flex items-center gap-2">
                              {bad ? <AlertCircle aria-hidden="true" className="h-4 w-4" style={{ color: ink }} /> : null}
                              {d.name}
                            </span>
                          </TH>

                          <TD className="px-3 py-4 align-middle">
                            <span className="flex items-center gap-3">
                              <Checkbox
                                id={'working_' + d.day_of_week}
                                checked={d.is_working}
                                onChange={function (e) {
                                  const on = e.target.checked;
                                  updateDay(d.day_of_week, on
                                    ? { is_working: true, start_time: d.start_time || '09:00', end_time: d.end_time || '17:00' }
                                    : { is_working: false });
                                }}
                                className="gx-focus h-5 w-5 rounded-none"
                                style={{ accentColor: ink, border: '1px solid ' + ink }}
                              />
                              <Label htmlFor={'working_' + d.day_of_week} className="cursor-pointer text-[12px] uppercase" style={{ letterSpacing: '0.1em', color: d.is_working ? ink : muted }}>
                                {d.is_working ? 'Working' : 'Non-working'}
                              </Label>
                            </span>
                          </TD>

                          <TD className="px-3 py-4 align-middle">
                            <Label htmlFor={'start_' + d.day_of_week} className="sr-only">{d.name + ' start time'}</Label>
                            <Input
                              id={'start_' + d.day_of_week}
                              type="time"
                              value={d.start_time}
                              disabled={!d.is_working}
                              aria-invalid={bad ? 'true' : 'false'}
                              onChange={function (e) { updateDay(d.day_of_week, { start_time: e.target.value }); }}
                              className="gx-focus h-10 w-[128px] rounded-none px-2 text-[14px] disabled:cursor-not-allowed"
                              style={Object.assign({
                                border: '1px solid ' + (bad ? ink : hairline),
                                color: d.is_working ? ink : muted,
                                backgroundColor: d.is_working ? 'rgba(255,255,255,0.7)' : 'transparent',
                                opacity: d.is_working ? 1 : 0.55,
                              }, numeric)}
                            />
                          </TD>

                          <TD className="px-3 py-4 align-middle">
                            <Label htmlFor={'end_' + d.day_of_week} className="sr-only">{d.name + ' end time'}</Label>
                            <Input
                              id={'end_' + d.day_of_week}
                              type="time"
                              value={d.end_time}
                              disabled={!d.is_working}
                              aria-invalid={bad ? 'true' : 'false'}
                              onChange={function (e) { updateDay(d.day_of_week, { end_time: e.target.value }); }}
                              className="gx-focus h-10 w-[128px] rounded-none px-2 text-[14px] disabled:cursor-not-allowed"
                              style={Object.assign({
                                border: '1px solid ' + (bad ? ink : hairline),
                                color: d.is_working ? ink : muted,
                                backgroundColor: d.is_working ? 'rgba(255,255,255,0.7)' : 'transparent',
                                opacity: d.is_working ? 1 : 0.55,
                              }, numeric)}
                            />
                          </TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>

              {workingDayCount === 0 ? (
                <div className="mt-8">
                  <Empty
                    title="No working days ticked"
                    description="Every weekday is currently non-working, so you contribute no availability to the team overlap. Tick a day above and give it a start and end time."
                  />
                </div>
              ) : (
                <div className="mt-6 flex flex-col items-center gap-2 pt-4" style={{ borderTop: '1px solid ' + hairline }}>
                  <p className="text-[13px]" style={Object.assign({ color: ink }, numeric)}>
                    {weeklyHours.toFixed(1)} hours across {workingDayCount} working {workingDayCount === 1 ? 'day' : 'days'}
                    <span style={{ color: muted }}>{' · ' + zone.id.replace('_', ' ')}</span>
                  </p>
                  <p className="text-[12px]" style={{ color: muted }}>
                    This is a repeating weekly pattern — single days off, vacation and PTO aren’t part of this version.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Row 5 — validation / status */}
          <section data-wf="b-4-0" aria-live="polite">
            {status === 'saved' ? (
              <div className="gx-enter mx-auto flex max-w-[68ch] items-start gap-3 px-5 py-4" style={{ border: '1px solid ' + gild, backgroundColor: 'rgba(159,181,127,0.18)' }}>
                <CheckCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ink }} />
                <p className="text-[13px] leading-relaxed" style={{ color: ink }}>
                  <span className="uppercase" style={{ fontFamily: brand.fontHeading, letterSpacing: '0.12em' }}>Saved. </span>
                  Your profile and weekly hours are stored against {zone.id.replace('_', ' ')}. Opening the team overlap view…
                </p>
              </div>
            ) : (attempted && hasBlockingError) ? (
              <div className="gx-enter mx-auto flex max-w-[68ch] items-start gap-3 px-5 py-4" style={{ border: '1px solid ' + ink, borderLeftWidth: 4, backgroundColor: 'rgba(18,32,28,0.06)' }}>
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ink }} />
                <div className="text-[13px] leading-relaxed" style={{ color: ink }}>
                  <p className="uppercase" style={{ fontFamily: brand.fontHeading, letterSpacing: '0.12em' }}>Not saved</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {nameError ? <li>{nameError}</li> : null}
                    {invalidDays.map(function (d) {
                      return <li key={d.day_of_week}>{d.name}: end time must be after start time.</li>;
                    })}
                  </ul>
                  <p className="mt-2" style={{ color: muted }}>
                    Days left empty or unticked count as non-working. Nothing you typed has been discarded.
                  </p>
                </div>
              </div>
            ) : (
              <p className="mx-auto max-w-[68ch] text-center text-[13px] leading-relaxed" style={{ color: muted }}>
                {invalidDays.length > 0
                  ? invalidDays.map(function (d) { return d.name; }).join(', ') + ': end time must be after start time. Days left empty or unticked count as non-working.'
                  : blankWorkingDays.length > 0
                    ? blankWorkingDays.map(function (d) { return d.name; }).join(', ') + ' is ticked but has no hours yet — it will count as non-working until you set times.'
                    : 'Days left empty or unticked count as non-working.'}
              </p>
            )}
          </section>

          {/* Row 6 — actions */}
          <section className="grid grid-cols-12 gap-4 pb-6">
            <div className="col-span-12 md:col-span-4 md:col-start-3">
              <Button
                data-wf="b-5-0"
                type="submit"
                disabled={status === 'saving' || status === 'saved'}
                className="gx-focus gx-primary h-12 w-full rounded-none text-[12px] uppercase disabled:opacity-80"
                style={{ backgroundColor: ink, color: gild, border: '1px solid ' + ink, fontFamily: brand.fontHeading, letterSpacing: '0.2em' }}
              >
                {status === 'saving' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="gx-pulse inline-block h-2 w-2 rotate-45" aria-hidden="true" style={{ backgroundColor: gild }} />
                    Saving…
                  </span>
                ) : status === 'saved' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check aria-hidden="true" className="h-4 w-4" />
                    Saved
                  </span>
                ) : 'Save changes'}
              </Button>
            </div>
            <div className="col-span-12 md:col-span-4">
              <Button
                data-wf="b-5-1"
                type="button"
                onClick={function () { navigate('sign-in'); }}
                className="gx-focus gx-ghost h-12 w-full rounded-none bg-transparent text-[12px] uppercase"
                style={{ border: '1px solid ' + ink, color: ink, fontFamily: brand.fontHeading, letterSpacing: '0.2em' }}
              >
                Sign out
              </Button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
