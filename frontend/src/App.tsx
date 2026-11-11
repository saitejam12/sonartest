import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Icons } from "@/lib/icons";
import SignIn from "@/screens/SignIn";
import SignUp from "@/screens/SignUp";
import Overlap from "@/screens/Overlap";
import MyAvailability from "@/screens/MyAvailability";
import Team from "@/screens/Team";
import Join from "@/screens/Join";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// The app's menu, drawn around every screen except the ones routed outside it below.
function AppShellLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="border-b"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <div className="flex items-center gap-6 px-6 py-2">
          <p
            className="shrink-0 text-sm font-semibold"
            style={{ fontFamily: "var(--brand-font-heading)" }}
          >
            {"sonartest"}
          </p>
          <nav aria-label="App menu" className="flex flex-wrap items-center gap-1">
            <NavLink to="/overlap" className={navLinkClass}>
              <Icons.Home size={16} />
              {"Team Overlap"}
            </NavLink>
            <NavLink to="/my-availability" className={navLinkClass}>
              <Icons.Check size={16} />
              {"My Availability"}
            </NavLink>
            <NavLink to="/team" className={navLinkClass}>
              <Icons.User size={16} />
              {"My Team"}
            </NavLink>
            <NavLink to="/sign-in" className={navLinkClass}>
              <Icons.X size={16} />
              {"Sign out"}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShellLayout />}>
        <Route path="/overlap" element={<Overlap />} />
        <Route path="/my-availability" element={<MyAvailability />} />
        <Route path="/team" element={<Team />} />
        <Route path="/join" element={<Join />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}
