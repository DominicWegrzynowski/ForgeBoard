import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { tickets } from "../data/mockData";

export function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tickets</h2>
        <Link to="/tickets/create"><Button>Add Ticket</Button></Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to="/tickets/all" className="text-sm text-brand-600 hover:underline">All</Link>
        <Link to="/tickets/mine" className="text-sm text-brand-600 hover:underline">My Tickets</Link>
        <Link to="/tickets/unassigned" className="text-sm text-brand-600 hover:underline">Unassigned</Link>
        <Link to="/tickets/archived" className="text-sm text-brand-600 hover:underline">Archived</Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="px-2 py-3">Title</th><th className="px-2 py-3">Developer</th><th className="px-2 py-3">Status</th><th className="px-2 py-3">Priority</th><th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-t border-slate-100">
                  <td className="px-2 py-3 font-medium">{ticket.id} - {ticket.title}</td>
                  <td className="px-2 py-3">{ticket.developer}</td>
                  <td className="px-2 py-3"><Badge tone={ticket.status === "Resolved" ? "green" : "blue"}>{ticket.status}</Badge></td>
                  <td className="px-2 py-3"><Badge tone={ticket.priority === "Urgent" ? "red" : ticket.priority === "High" ? "amber" : "default"}>{ticket.priority}</Badge></td>
                  <td className="px-2 py-3 flex gap-3">
                    <Link className="text-brand-600 hover:underline" to={`/tickets/${ticket.id}`}>View</Link>
                    <Link className="text-brand-600 hover:underline" to="/tickets/edit">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
