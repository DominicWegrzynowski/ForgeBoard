import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, Users, UserCog, Briefcase, Code2 } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { dashboardKpiDisplay, dashboardMembers, projects, tickets } from "../data/mockData";
import { cn } from "../lib/cn";

function TableToolbar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-3", className)}>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        Show
        <select className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-600/30" defaultValue="10">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        entries
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-600">
        Search:
        <input
          type="search"
          className="w-40 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-600/30 sm:w-52"
          placeholder=""
          readOnly
        />
      </label>
    </div>
  );
}

function TablePagination({ showingFrom, showingTo, total }: { showingFrom: number; showingTo: number; total: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
      <p>
        Showing {showingFrom} to {showingTo} of {total} entries
      </p>
      <div className="flex gap-1">
        <button type="button" className="rounded border border-slate-300 bg-white px-3 py-1 text-slate-500 hover:bg-slate-50">
          Previous
        </button>
        <button type="button" className="rounded border border-brand-600 bg-brand-600 px-3 py-1 text-white">
          1
        </button>
        <button type="button" className="rounded border border-slate-300 bg-white px-3 py-1 text-slate-500 hover:bg-slate-50">
          Next
        </button>
      </div>
    </div>
  );
}

/** Simple CSS pie chart — UI only */
function PriorityPieChart() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <div
        className="h-44 w-44 shrink-0 rounded-full border-4 border-white shadow-inner"
        style={{
          background:
            "conic-gradient(#dc2626 0deg 90deg, #ea580c 90deg 162deg, #2563eb 162deg 270deg, #16a34a 270deg 360deg)"
        }}
        title="Project priorities (placeholder)"
      />
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-600" />
          Urgent — 25%
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-orange-600" />
          High — 20%
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-blue-600" />
          Medium — 30%
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-green-600" />
          Low — 25%
        </li>
      </ul>
    </div>
  );
}

type BarSegment = { label: string; color: string; pct: number };

function StackedBarRow({ label, segments }: { label: string; segments: BarSegment[] }) {
  return (
    <div className="space-y-1">
      <div className="flex h-8 w-full overflow-hidden rounded-md bg-slate-100">
        {segments.map((s) => (
          <div
            key={s.label}
            className={cn("flex items-center justify-center text-[10px] font-medium text-white", s.color)}
            style={{ width: `${s.pct}%` }}
            title={s.label}
          >
            {s.pct >= 12 ? s.label.slice(0, 3) : ""}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function TicketsByProjectChart() {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium text-slate-500">Roles by project (static demo)</p>
      <StackedBarRow
        label="P1 — Blog Site"
        segments={[
          { label: "Submitter", color: "bg-amber-500", pct: 35 },
          { label: "Developer", color: "bg-sky-600", pct: 40 },
          { label: "PM", color: "bg-slate-600", pct: 25 }
        ]}
      />
      <StackedBarRow
        label="P2 — Issue Tracker Web"
        segments={[
          { label: "Submitter", color: "bg-amber-500", pct: 25 },
          { label: "Developer", color: "bg-sky-600", pct: 50 },
          { label: "PM", color: "bg-slate-600", pct: 25 }
        ]}
      />
      <StackedBarRow
        label="P3 — Identity Improvements"
        segments={[
          { label: "Submitter", color: "bg-amber-500", pct: 30 },
          { label: "Developer", color: "bg-sky-600", pct: 45 },
          { label: "PM", color: "bg-slate-600", pct: 25 }
        ]}
      />
      <div className="flex flex-wrap gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-amber-500" /> Submitter
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-sky-600" /> Developer
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-slate-600" /> PM
        </span>
      </div>
    </div>
  );
}

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

export function DashboardPage() {
  const unassigned = tickets.filter((t) => t.developer === "Unassigned").length;
  const assigned = tickets.length - unassigned;
  const activeProjectsDisplay = dashboardKpiDisplay.activeProjects;
  const totalMembers = dashboardMembers.length;
  const notificationCount = 12;

  return (
    <div className="space-y-6">
      {/* Header + breadcrumb */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">
          <span className="text-brand-600">Dashboard</span>
          <span className="mx-1 text-slate-400">/</span>
          <span>dashboard</span>
        </p>
      </div>

      {/* Row 1 — KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Link to="/projects/all" className="block rounded-xl bg-teal-500 p-5 text-white shadow-md transition hover:brightness-105">
          <p className="text-4xl font-bold tabular-nums">{activeProjectsDisplay}</p>
          <p className="mt-1 text-sm font-medium opacity-95">Active Projects</p>
        </Link>
        <Link to="/tickets/all" className="block rounded-xl bg-slate-400 p-5 text-white shadow-md transition hover:brightness-105">
          <p className="text-4xl font-bold tabular-nums">{tickets.length}</p>
          <p className="mt-1 text-sm font-medium opacity-95">Total Tickets</p>
        </Link>
        <Link to="/tickets/unassigned" className="block rounded-xl bg-amber-400 p-5 text-slate-900 shadow-md transition hover:brightness-105">
          <p className="text-4xl font-bold tabular-nums">{unassigned}</p>
          <p className="mt-1 text-sm font-medium">Unassigned Tickets</p>
        </Link>
        <Link to="/tickets/mine" className="block rounded-xl bg-slate-700 p-5 text-white shadow-md transition hover:brightness-105">
          <p className="text-4xl font-bold tabular-nums">{assigned}</p>
          <p className="mt-1 text-sm font-medium opacity-95">Assigned Tickets</p>
        </Link>
      </div>

      {/* Row 2 — stats + charts */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="p-0 overflow-hidden">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-800">User stats</h3>
          </div>
          <ul className="divide-y divide-slate-100 text-sm">
            <li className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-slate-600">
                <Users size={16} className="text-slate-400" /> Total Users
              </span>
              <span className="font-semibold text-slate-900">{totalMembers}</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-slate-600">
                <Briefcase size={16} className="text-slate-400" /> Total Teams
              </span>
              <span className="font-semibold text-slate-900">12</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-slate-600">
                <UserCog size={16} className="text-slate-400" /> Project Management
              </span>
              <span className="font-semibold text-slate-900">4</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <span className="flex items-center gap-2 text-slate-600">
                <Code2 size={16} className="text-slate-400" /> Total Developers
              </span>
              <span className="font-semibold text-slate-900">3</span>
            </li>
          </ul>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-800">Company data</h3>
          </div>
          <ul className="divide-y divide-slate-100 text-sm">
            <li className="flex items-center justify-between px-4 py-3">
              <span className="text-slate-600">Members</span>
              <span className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500 text-xs font-bold text-white">{totalMembers}</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <span className="text-slate-600">Projects</span>
              <span className="flex h-8 w-8 items-center justify-center rounded bg-sky-500 text-xs font-bold text-white">{projects.length}</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <span className="text-slate-600">Tickets</span>
              <span className="flex h-8 w-8 items-center justify-center rounded bg-amber-500 text-xs font-bold text-white">{tickets.length}</span>
            </li>
            <li className="flex items-center justify-between px-4 py-3">
              <span className="text-slate-600">Notifications</span>
              <span className="flex h-8 w-8 items-center justify-center rounded bg-rose-500 text-xs font-bold text-white">{notificationCount}</span>
            </li>
          </ul>
        </Card>

        <Card className="p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Priority projects</h3>
          <PriorityPieChart />
        </Card>

        <Card className="p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-800">Tickets by project</h3>
          <TicketsByProjectChart />
        </Card>
      </div>

      {/* Row 3 — Members + Projects tables */}
      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="overflow-hidden p-0">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-800">Members</h3>
          </div>
          <TableToolbar />
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-3 py-3 font-semibold">Avatar</th>
                  <th className="px-3 py-3 font-semibold">Name</th>
                  <th className="px-3 py-3 font-semibold">Projects</th>
                  <th className="px-3 py-3 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dashboardMembers.map((m) => (
                  <tr key={m.id} className="bg-white hover:bg-slate-50/80">
                    <td className="px-3 py-2">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300" />
                    </td>
                    <td className="px-3 py-2 font-medium text-slate-900">{m.name}</td>
                    <td className="px-3 py-2 text-slate-600">{m.projectsCount}</td>
                    <td className="px-3 py-2">
                      <Badge>{m.role.toUpperCase()}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination showingFrom={1} showingTo={dashboardMembers.length} total={dashboardMembers.length} />
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-800">Projects</h3>
          </div>
          <TableToolbar />
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-3 py-3 font-semibold">Project</th>
                  <th className="px-3 py-3 font-semibold">Start Date</th>
                  <th className="px-3 py-3 font-semibold">End Date</th>
                  <th className="px-3 py-3 font-semibold">Team</th>
                  <th className="px-3 py-3 font-semibold">Ticket Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => (
                  <tr key={p.id} className="bg-white hover:bg-slate-50/80">
                    <td className="px-3 py-2">
                      <Link to="/projects/details" className="font-medium text-brand-600 hover:underline">
                        {p.name}
                      </Link>
                      <p className="text-xs text-slate-500">Project Manager: {p.manager}</p>
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                        {formatDisplayDate(p.startDate)}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-block rounded-md bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">
                        {formatDisplayDate(p.endDate)}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex -space-x-2">
                        {p.members.slice(0, 4).map((name, i) => (
                          <div
                            key={`${p.id}-${name}-${i}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-300 text-[10px] font-semibold text-slate-700"
                            title={name}
                          >
                            {name.slice(0, 1)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2 font-medium text-slate-800">{p.ticketCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination showingFrom={1} showingTo={projects.length} total={projects.length} />
        </Card>
      </div>

      {/* Row 4 — Tickets table full width */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-200 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-800">Tickets</h3>
        </div>
        <TableToolbar />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-3 py-3 font-semibold">Title</th>
                <th className="px-3 py-3 font-semibold">Developer</th>
                <th className="px-3 py-3 font-semibold">Status</th>
                <th className="px-3 py-3 font-semibold">Priority</th>
                <th className="px-3 py-3 font-semibold">Date</th>
                <th className="px-3 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((t) => (
                <tr key={t.id} className="bg-white hover:bg-slate-50/80">
                  <td className="px-3 py-2">
                    <Link to={`/tickets/${t.id}`} className="font-medium text-slate-900 hover:text-brand-600">
                      {t.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    {t.developer === "Unassigned" ? (
                      <Link to="/tickets/assign-developer" className="text-brand-600 hover:underline">
                        Assign Developer
                      </Link>
                    ) : (
                      <Badge tone="blue">{t.developer}</Badge>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Badge tone={t.status === "Resolved" ? "green" : t.status === "New" ? "green" : "blue"}>{t.status}</Badge>
                  </td>
                  <td className="px-3 py-2">
                    <Badge tone={t.priority === "Urgent" ? "red" : t.priority === "High" ? "amber" : "default"}>{t.priority}</Badge>
                  </td>
                  <td className="px-3 py-2 text-slate-600">{formatDisplayDate(t.created)}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/tickets/${t.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-brand-600"
                        title="View"
                      >
                        <Eye size={14} />
                      </Link>
                      <Link
                        to="/tickets/edit"
                        className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-amber-600"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination showingFrom={1} showingTo={tickets.length} total={tickets.length} />
      </Card>

      <p className="text-center text-xs text-slate-400">
        <Link to="/route-map" className="text-brand-600 hover:underline">
          Open route map
        </Link>{" "}
        for API wiring reference
      </p>
    </div>
  );
}
