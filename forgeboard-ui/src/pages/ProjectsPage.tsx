import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { projects } from "../data/mockData";

export function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link to="/projects/create"><Button>Add Project</Button></Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to="/projects/all" className="text-sm text-brand-600 hover:underline">All</Link>
        <Link to="/projects/mine" className="text-sm text-brand-600 hover:underline">My Projects</Link>
        <Link to="/projects/manage" className="text-sm text-brand-600 hover:underline">Manage</Link>
        <Link to="/projects/archived" className="text-sm text-brand-600 hover:underline">Archived</Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="px-2 py-3">Project</th><th className="px-2 py-3">Manager</th><th className="px-2 py-3">Dates</th><th className="px-2 py-3">Priority</th><th className="px-2 py-3">Tickets</th><th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-slate-100">
                  <td className="px-2 py-3 font-medium">{project.name}</td>
                  <td className="px-2 py-3">{project.manager}</td>
                  <td className="px-2 py-3 text-xs">{project.startDate} to {project.endDate}</td>
                  <td className="px-2 py-3"><Badge>{project.priority}</Badge></td>
                  <td className="px-2 py-3">{project.ticketCount}</td>
                  <td className="px-2 py-3"><Link className="text-brand-600 hover:underline" to="/projects/details">Details</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
