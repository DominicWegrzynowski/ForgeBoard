import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function AssignMembersPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Manage Team</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold">Project Team</h3>
          <p className="text-sm text-slate-500">3 team members</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="font-semibold">Jane Appuser</p>
              <p className="text-sm text-slate-500">ProjectManager2@bugtracker.com</p>
              <p className="text-xs text-slate-400">Project Manager</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="font-semibold">Carol Appuser</p>
              <p className="text-sm text-slate-500">Developer</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="font-semibold">Demo NewUser</p>
              <p className="text-sm text-slate-500">Submitter</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">Manage Developers</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="mb-2 text-sm font-semibold">Company Developers</p>
              <p className="text-sm text-slate-600">Bruce Appuser</p>
              <p className="text-sm text-slate-600">Demo Developer</p>
              <p className="text-sm text-slate-600">James Appuser</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="mb-2 text-sm font-semibold">On Project</p>
              <p className="text-sm text-slate-600">Carol Appuser</p>
              <p className="text-sm text-slate-600">Demo NewUser</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button>Assign Members</Button>
            <Link to="/projects/details"><Button variant="secondary">Back to Project</Button></Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

