import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <Card>
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-brand-100" />
          <div>
            <p className="text-lg font-semibold">Dominic Wegrzynowski</p>
            <p className="text-sm text-slate-500">dominic@example.com</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div><p className="text-xs text-slate-500">Role</p><p>Admin</p></div>
          <div><p className="text-xs text-slate-500">Company</p><p>BugTracker Org</p></div>
        </div>
        <Button className="mt-6">Edit Profile</Button>
      </Card>
    </div>
  );
}
