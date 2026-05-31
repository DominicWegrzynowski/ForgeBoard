import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export function ProjectDetailsPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Project Details</h2>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-1">
          <Card>
            <h3 className="text-2xl font-bold">Encrypted Communication Platform</h3>
            <p className="mt-2 text-sm text-slate-600">A web based encrypted communication platform used for secure communication.</p>
            <p className="mt-4 text-sm font-semibold">Project Status:</p>
            <div className="mt-2 h-3 rounded-full bg-sky-100">
              <div className="h-3 w-full rounded-full bg-sky-500" />
            </div>
            <p className="mt-1 text-xs text-slate-500">100%</p>
            <div className="mt-4 flex gap-2">
              <Link to="/projects/edit"><Button variant="secondary">Edit Project</Button></Link>
              <Link to="/projects/archive"><Button variant="ghost" className="border border-slate-200">Archive Project</Button></Link>
            </div>
          </Card>

          <Card>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p className="text-slate-500">Created</p><p>07/12/2023</p>
              <p className="text-slate-500">Deadline</p><p>01/24/2024</p>
              <p className="text-slate-500">Priority</p><p><Badge>Medium</Badge></p>
              <p className="text-slate-500">Status</p><p><Badge tone="red">Inactive</Badge></p>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Project Team</h3>
            <p className="text-sm text-slate-500">7 team members</p>
            <div className="mt-3 space-y-2 text-sm">
              <p><strong>Demo ProjectManager</strong> - Project Manager</p>
              <p>James Appuser - Developer</p>
              <p>Carol Appuser - Developer</p>
              <p>Bruce Appuser - Developer</p>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-2">
          <Card className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-2 py-3">Title</th>
                  <th className="px-2 py-3">Developer</th>
                  <th className="px-2 py-3">Status</th>
                  <th className="px-2 py-3">Priority</th>
                  <th className="px-2 py-3">Date</th>
                  <th className="px-2 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-2 py-3">Create MVC Web Application</td>
                  <td className="px-2 py-3">James Appuser</td>
                  <td className="px-2 py-3"><Badge tone="green">Development</Badge></td>
                  <td className="px-2 py-3"><Badge>High</Badge></td>
                  <td className="px-2 py-3">09/20/2023</td>
                  <td className="px-2 py-3"><Link to="/tickets/80" className="text-brand-600 hover:underline">View</Link></td>
                </tr>
                <tr>
                  <td className="px-2 py-3">Design Database</td>
                  <td className="px-2 py-3"><Link to="/tickets/assign-developer" className="text-brand-600 hover:underline">Assign Developer</Link></td>
                  <td className="px-2 py-3"><Badge>New</Badge></td>
                  <td className="px-2 py-3"><Badge tone="red">Urgent</Badge></td>
                  <td className="px-2 py-3">09/20/2023</td>
                  <td className="px-2 py-3"><Link to="/tickets/81" className="text-brand-600 hover:underline">View</Link></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}

