export type RouteItem = {
  path: string;
  label: string;
  section: string;
  description: string;
};

export const appRoutes: RouteItem[] = [
  { path: "/dashboard", label: "Dashboard", section: "Home", description: "Main dashboard with project and ticket summaries." },
  { path: "/home", label: "Home", section: "Home", description: "Landing experience equivalent to Home/Index." },
  { path: "/users", label: "All Users", section: "Home", description: "Company user listing and basic profile cards." },
  { path: "/privacy", label: "Privacy", section: "Home", description: "Privacy policy placeholder page." },
  { path: "/profile", label: "Member Profile", section: "Home", description: "Current user profile and settings entry point." },

  { path: "/projects", label: "Projects", section: "Projects", description: "Project hub with table and quick filters." },
  { path: "/projects/all", label: "All Projects", section: "Projects", description: "All active and visible projects." },
  { path: "/projects/mine", label: "My Projects", section: "Projects", description: "Projects assigned to current user." },
  { path: "/projects/create", label: "Create Project", section: "Projects", description: "Project creation form scaffold." },
  { path: "/projects/manage", label: "Manage Projects", section: "Projects", description: "Administrative project management page." },
  { path: "/projects/unassigned", label: "Unassigned Projects", section: "Projects", description: "Projects without project manager assignment." },
  { path: "/projects/archived", label: "Archived Projects", section: "Projects", description: "Archived projects index." },
  { path: "/projects/archive", label: "Archive Project", section: "Projects", description: "Archive confirmation scaffold." },
  { path: "/projects/restore", label: "Restore Project", section: "Projects", description: "Restore confirmation scaffold." },
  { path: "/projects/assign-members", label: "Assign Members", section: "Projects", description: "Assign team members to project." },
  { path: "/projects/assign-pm", label: "Assign PM", section: "Projects", description: "Assign project manager." },
  { path: "/projects/details", label: "Project Details", section: "Projects", description: "Detailed project overview page." },
  { path: "/projects/edit", label: "Edit Project", section: "Projects", description: "Project editing form scaffold." },

  { path: "/tickets", label: "Tickets", section: "Tickets", description: "Tickets list with status and priority." },
  { path: "/tickets/all", label: "All Tickets", section: "Tickets", description: "All ticket records table." },
  { path: "/tickets/mine", label: "My Tickets", section: "Tickets", description: "Tickets assigned or submitted by current user." },
  { path: "/tickets/create", label: "Create Ticket", section: "Tickets", description: "Ticket creation form scaffold." },
  { path: "/tickets/unassigned", label: "Unassigned Tickets", section: "Tickets", description: "Tickets without developer assignment." },
  { path: "/tickets/assign-developer", label: "Assign Developer", section: "Tickets", description: "Assignment workflow for ticket developer." },
  { path: "/tickets/archived", label: "Archived Tickets", section: "Tickets", description: "Archived ticket list." },
  { path: "/tickets/archive", label: "Archive Ticket", section: "Tickets", description: "Archive ticket confirmation scaffold." },
  { path: "/tickets/restore", label: "Restore Ticket", section: "Tickets", description: "Restore ticket confirmation scaffold." },
  { path: "/tickets/edit", label: "Edit Ticket", section: "Tickets", description: "Ticket edit form scaffold." },

  { path: "/notifications", label: "Notification Inbox", section: "Notifications", description: "User notification feed." },
  { path: "/notifications/create", label: "Create Notification", section: "Notifications", description: "Notification compose scaffold." },
  { path: "/notifications/details", label: "Notification Details", section: "Notifications", description: "Notification detail display." },
  { path: "/notifications/edit", label: "Edit Notification", section: "Notifications", description: "Notification edit scaffold." },
  { path: "/notifications/delete", label: "Delete Notification", section: "Notifications", description: "Delete confirmation scaffold." },

  { path: "/invites", label: "Invites", section: "Admin", description: "Company invite listing page." },
  { path: "/invites/create", label: "Create Invite", section: "Admin", description: "Invite user form scaffold." },
  { path: "/invites/details", label: "Invite Details", section: "Admin", description: "Invite detail page scaffold." },
  { path: "/invites/edit", label: "Edit Invite", section: "Admin", description: "Invite edit page scaffold." },
  { path: "/invites/delete", label: "Delete Invite", section: "Admin", description: "Invite delete confirmation scaffold." },
  { path: "/invites/process", label: "Process Invite", section: "Admin", description: "Invite acceptance/processing scaffold." },
  { path: "/roles/manage", label: "Manage User Roles", section: "Admin", description: "Role assignment and permissions page." },

  { path: "/companies", label: "Companies", section: "Admin", description: "Company index listing page." },
  { path: "/companies/create", label: "Create Company", section: "Admin", description: "Create company form scaffold." },
  { path: "/companies/details", label: "Company Details", section: "Admin", description: "Company detail view scaffold." },
  { path: "/companies/edit", label: "Edit Company", section: "Admin", description: "Company edit form scaffold." },
  { path: "/companies/delete", label: "Delete Company", section: "Admin", description: "Delete company confirmation scaffold." },

  { path: "/project-priorities", label: "Project Priorities", section: "Reference Data", description: "Project priority lookup listing." },
  { path: "/ticket-priorities", label: "Ticket Priorities", section: "Reference Data", description: "Ticket priority lookup listing." },
  { path: "/ticket-status", label: "Ticket Status", section: "Reference Data", description: "Ticket status lookup listing." },
  { path: "/ticket-types", label: "Ticket Types", section: "Reference Data", description: "Ticket type lookup listing." },

  { path: "/ticket-attachments", label: "Ticket Attachments", section: "Ticket Metadata", description: "Attachment listing and management." },
  { path: "/ticket-comments", label: "Ticket Comments", section: "Ticket Metadata", description: "Comment listing and management." },
  { path: "/ticket-histories", label: "Ticket Histories", section: "Ticket Metadata", description: "History/audit listing and management." },

  { path: "/route-map", label: "Route Map", section: "Utility", description: "Directory of all scaffolded pages and links." }
];

export const authRoutes: RouteItem[] = [
  { path: "/login", label: "Login", section: "Auth", description: "Sign-in page scaffold." },
  { path: "/register", label: "Register", section: "Auth", description: "Registration page scaffold." }
];

export function routeByPath(path: string) {
  return appRoutes.find((route) => route.path === path);
}
