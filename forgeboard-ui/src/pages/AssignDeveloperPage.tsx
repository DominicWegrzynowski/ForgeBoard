import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export function AssignDeveloperPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Assign Developer</h2>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold">Select Developer</h3>
          <div className="mt-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-600">
            Developer dropdown placeholder (UI only)
          </div>
          <div className="mt-4 flex gap-2">
            <Button>Assign</Button>
            <Link to="/tickets/80"><Button variant="secondary">Cancel</Button></Link>
          </div>
        </Card>

        <Card>
          <h3 className="text-2xl font-bold">Design the Database</h3>
          <p className="mt-2 text-sm text-slate-600">Determine which entities will need to exist in the database and their relationships.</p>
          <p className="mt-4 text-sm font-semibold">Project: Health Insurance Management System</p>
          <div className="mt-2 h-3 rounded-full bg-sky-100">
            <div className="h-3 w-full rounded-full bg-sky-500" />
          </div>
          <p className="mt-1 text-xs text-slate-500">100%</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">Current Developer</h3>
          <div className="mt-4 rounded-lg border border-slate-200 p-4 text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-slate-200" />
            <p className="mt-3 text-xl font-semibold">Demo Developer</p>
            <p className="text-sm text-slate-500">demodev@bugtracker.com</p>
            <Link to="/profile"><Button className="mt-3">Profile</Button></Link>
          </div>
        </Card>

        <Card>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p className="text-slate-500">Created</p><p>09/20/2023</p>
            <p className="text-slate-500">Project Deadline</p><p>12/13/2023</p>
            <p className="text-slate-500">Type</p><p><Badge>New Development</Badge></p>
            <p className="text-slate-500">Priority</p><p><Badge tone="red">Urgent</Badge></p>
            <p className="text-slate-500">Status</p><p><Badge tone="green">Development</Badge></p>
          </div>
        </Card>
      </div>
    </div>
  );
}

