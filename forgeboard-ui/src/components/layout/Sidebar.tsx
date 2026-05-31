import { type ReactNode, useState } from "react";
import { ChevronDown, ChevronRight, FolderKanban, KeyRound, LayoutPanelTop, ListTodo, ShieldCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { appRoutes, authRoutes } from "../../data/routeCatalog";

const primaryPaths = ["/dashboard", "/projects", "/tickets", "/notifications", "/profile", "/route-map"];

const quickProjectPaths = ["/projects/all", "/projects/mine", "/projects/create", "/projects/manage", "/projects/unassigned", "/projects/archived"];
const quickTicketPaths = ["/tickets/all", "/tickets/mine", "/tickets/create", "/tickets/unassigned", "/tickets/assign-developer", "/tickets/archived"];
const adminPaths = ["/invites", "/invites/create", "/roles/manage", "/companies", "/companies/create"];

function renderLinks(paths: string[]) {
  return paths
    .map((path) => appRoutes.find((route) => route.path === path))
    .filter((route): route is NonNullable<typeof route> => Boolean(route))
    .map((route) => (
      <NavLink
        key={route.path}
        to={route.path}
        className={({ isActive }) =>
          `block rounded-lg px-3 py-2 text-sm transition ${
            isActive ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"
          }`
        }
      >
        {route.label}
      </NavLink>
    ));
}

type SidebarSectionProps = {
  title: string;
  paths: string[];
  icon: ReactNode;
  defaultOpen?: boolean;
};

function SidebarSection({ title, paths, icon, defaultOpen = false }: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="mt-6">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-left hover:bg-slate-50"
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
          {icon}
          {title}
        </span>
        {isOpen ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
      </button>

      {isOpen ? <nav className="mt-2 space-y-1">{renderLinks(paths)}</nav> : null}
    </section>
  );
}

export function Sidebar() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <aside className="hidden h-screen w-80 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4 lg:block">
      <div className="rounded-xl bg-brand-600 p-4 text-white">
        <p className="text-sm opacity-90">Welcome</p>
        <h1 className="text-lg font-bold">BugTracker UI</h1>
        <p className="mt-2 text-xs opacity-90">React frontend clone starter</p>
      </div>

      <SidebarSection title="Primary" paths={primaryPaths} icon={<LayoutPanelTop size={14} />} />
      <SidebarSection title="Projects" paths={quickProjectPaths} icon={<FolderKanban size={14} />} />
      <SidebarSection title="Tickets" paths={quickTicketPaths} icon={<ListTodo size={14} />} />
      <SidebarSection title="Admin" paths={adminPaths} icon={<ShieldCheck size={14} />} />

      <section className="mt-6">
        <button
          type="button"
          onClick={() => setAuthOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-left hover:bg-slate-50"
        >
          <span className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
            <KeyRound size={14} />
            Auth
          </span>
          {authOpen ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
        </button>
        {authOpen ? (
          <nav className="mt-2 space-y-1">
            {authRoutes.map((route) => (
              <NavLink key={route.path} to={route.path} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                {route.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </section>
    </aside>
  );
}
