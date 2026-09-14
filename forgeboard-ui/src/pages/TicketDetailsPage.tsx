// import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
// import { tickets } from "../data/mockData";
import { useTicket} from "../services/tickets/ticketQueries";

export function TicketDetailsPage() {
  // const { id } = useParams();
  // const ticket = useMemo(() => tickets.find((t) => t.id === id) ?? tickets[0], [id]);

  const { id } = useParams();
  const ticketId = Number(id);
  const { data: ticket, isLoading, isError } = useTicket(ticketId);

  if (isLoading) {
  return <div>Loading ticket...</div>;
  }

  if (isError || !ticket) {
    return <div>Unable to load ticket.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Details</h2>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <h3 className="text-4xl font-bold">{ticket.title}</h3>
            <p className="mt-4 text-sm font-semibold">Project: {ticket.projectName}</p>
            <div className="mt-2 h-3 rounded-full bg-sky-100">
              <div className="h-3 w-full rounded-full bg-sky-500" />
            </div>
            <p className="mt-1 text-xs text-slate-500">100%</p>
            <p className="mt-3 text-sm font-semibold">Developer:</p>
            <p className="text-sm text-slate-600">{ticket.developerName ?? "Unassigned"} </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/tickets/assign-developer"><Button variant="ghost" className="border border-slate-200">Assign Developer</Button></Link>
              <Link to="/tickets/edit"><Button variant="secondary">Edit Ticket</Button></Link>
              <Link to="/tickets/archive"><Button variant="ghost" className="border border-rose-200 text-rose-700">Archive Ticket</Button></Link>
            </div>
          </Card>

          <Card>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p className="text-slate-500">Created</p><p>{ticket.created}</p>
              <p className="text-slate-500">Project Deadline</p><p>11/06/2023</p>
              <p className="text-slate-500">Type</p><p><Badge>New Development</Badge></p>
              <p className="text-slate-500">Priority</p><p><Badge tone={ticket.priorityName === "Urgent" ? "red" : "amber"}>{ticket.priorityName}</Badge></p>
              <p className="text-slate-500">Status</p><p><Badge tone="green">{ticket.statusName}</Badge></p>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Ticket Attachments</h3>
            <p className="mt-2 text-sm text-slate-600">Description input placeholder</p>
            <div className="mt-2 rounded-lg border border-slate-200 p-3 text-sm text-slate-500">
              Choose file (placeholder)
            </div>
            <div className="mt-3">
              <Link to="/ticket-attachments"><Button variant="secondary">Manage Attachments</Button></Link>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-semibold">Ticket Comments</h3>
            <div className="mt-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-500">
              Add comment... (textarea placeholder)
            </div>
            <div className="mt-3">
              <Button>Submit</Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Ticket History</h3>
            <div className="mt-3 rounded-lg border border-slate-200 p-3">
              <p className="text-xs text-slate-500">20 Sep 2023</p>
              <p className="mt-1 font-semibold">New Ticket Created</p>
              <p className="text-sm text-slate-600">By: Demo Admin</p>
              <p className="text-sm text-slate-500">A new ticket was added.</p>
            </div>
            <div className="mt-3">
              <Link to="/ticket-histories"><Button variant="secondary">View Full History</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
