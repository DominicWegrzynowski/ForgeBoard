import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const rows = [
  { name: "Blog Site", created: "Created February 20, 2022", endDate: "June 20, 2022", pm: "Jane Appuser", team: "3 members", status: "Inactive" },
  { name: "Electricity Usage Application", created: "Created September 11, 2023", endDate: "November 06, 2023", pm: "Demo ProjectManager", team: "4 members", status: "Inactive" },
  { name: "Encrypted Communication Platform", created: "Created July 12, 2023", endDate: "January 24, 2024", pm: "Demo ProjectManager", team: "6 members", status: "Inactive" }
];

export function AllProjectsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Projects</h2>
          <p className="text-sm text-slate-500">A UI clone of the AllProjects data table layout.</p>
        </div>
        <Link to="/projects/create"><Button>Create Project</Button></Link>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-2 py-3">Project</th>
              <th className="px-2 py-3">End Date</th>
              <th className="px-2 py-3">Progress</th>
              <th className="px-2 py-3">Project Manager</th>
              <th className="px-2 py-3">Team</th>
              <th className="px-2 py-3">Status</th>
              <th className="px-2 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-slate-100">
                <td className="px-2 py-3">
                  <p className="font-semibold">{row.name}</p>
                  <p className="text-xs text-slate-500">{row.created}</p>
                </td>
                <td className="px-2 py-3">{row.endDate}</td>
                <td className="px-2 py-3">
                  <div className="h-2 w-36 rounded-full bg-sky-100">
                    <div className="h-2 w-full rounded-full bg-sky-500" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">100% to completion</p>
                </td>
                <td className="px-2 py-3">{row.pm}</td>
                <td className="px-2 py-3">{row.team}</td>
                <td className="px-2 py-3"><Badge>{row.status}</Badge></td>
                <td className="px-2 py-3">
                  <div className="flex gap-2">
                    <Link to="/projects/details" className="text-brand-600 hover:underline">View</Link>
                    <Link to="/projects/edit" className="text-brand-600 hover:underline">Edit</Link>
                    <Link to="/projects/archive" className="text-rose-600 hover:underline">Archive</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

