import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { notifications } from "../data/mockData";

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Notifications</h2>
      <Card className="space-y-3">
        {notifications.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between">
              <p className="font-medium">{item.title}</p>
              {item.read ? <Badge>Read</Badge> : <Badge tone="blue">New</Badge>}
            </div>
            <p className="mt-1 text-sm text-slate-600">{item.message}</p>
            <p className="mt-1 text-xs text-slate-400">{item.createdAt}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
