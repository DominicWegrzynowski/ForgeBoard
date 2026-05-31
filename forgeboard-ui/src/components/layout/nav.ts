import { Bell, LayoutDashboard, ListTodo, FolderKanban, UserRound, LogIn, UserPlus } from "lucide-react";

export const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tickets", label: "Tickets", icon: ListTodo },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: UserRound }
];

export const authItems = [
  { to: "/login", label: "Login", icon: LogIn },
  { to: "/register", label: "Register", icon: UserPlus }
];
