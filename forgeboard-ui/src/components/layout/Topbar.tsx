import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div className="w-full max-w-lg">
        <Input placeholder="Search tickets, projects, users..." className="pl-10" />
        <Search className="pointer-events-none relative -mt-7 ml-3 text-slate-400" size={16} />
      </div>
      <div className="flex items-center gap-4">
        <Link to="/tickets/create">
          <Button className="hidden sm:inline-flex">New Ticket</Button>
        </Link>
        <Link to="/notifications" className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell size={18} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
        </Link>
        <Link to="/profile" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-brand-100" />
          <div>
            <p className="text-sm font-semibold">Dominic</p>
            <Badge tone="blue">Admin</Badge>
          </div>
        </Link>
      </div>
    </header>
  );
}
