import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const rows = [
  { name: "Bruce Appuser", email: "developer6@bugtracker.com", roles: ["Developer"], selected: "Developer" },
  { name: "Sue Appuser", email: "submitter2@bugtracker.com", roles: ["Submitter"], selected: "Submitter" },
  { name: "Demo NewUser", email: "demonew@bugtracker.com", roles: ["Submitter"], selected: "Submitter" },
  { name: "Jane Appuser", email: "projectmanager2@bugtracker.com", roles: ["ProjectManager"], selected: "ProjectManager" }
];

export function ManageRolesPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Manage Roles</h2>
      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-2 py-3">Name</th>
              <th className="px-2 py-3">Current Role</th>
              <th className="px-2 py-3">Manage Role</th>
              <th className="px-2 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.email} className="border-b border-slate-100">
                <td className="px-2 py-3">
                  <p className="font-semibold">{row.name}</p>
                  <p className="text-xs text-slate-500">{row.email}</p>
                </td>
                <td className="px-2 py-3">
                  <div className="flex flex-wrap gap-2">
                    {row.roles.map((role) => (
                      <Badge key={role}>{role}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-2 py-3 text-slate-600">{row.selected} (dropdown placeholder)</td>
                <td className="px-2 py-3"><Button variant="secondary">Assign Role</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

