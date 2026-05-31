import type { DashboardMember, Notification, Project, Ticket } from "../types";

export const projects: Project[] = [
  {
    id: "P-101",
    name: "Issue Tracker Web",
    manager: "Dominic W.",
    startDate: "2026-01-10",
    endDate: "2026-05-20",
    priority: "High",
    members: ["Alex", "Sara", "Kim", "Noah"],
    ticketCount: 18
  },
  {
    id: "P-102",
    name: "Identity Improvements",
    manager: "Rachel P.",
    startDate: "2026-02-12",
    endDate: "2026-06-15",
    priority: "Urgent",
    members: ["Ivy", "Mason", "Ethan"],
    ticketCount: 11
  },
  {
    id: "P-103",
    name: "Notifications Center",
    manager: "Unassigned",
    startDate: "2026-03-01",
    endDate: "2026-07-08",
    priority: "Medium",
    members: ["Luna", "Jasper"],
    ticketCount: 7
  },
  {
    id: "P-104",
    name: "Blog Site",
    manager: "Jane Appuser",
    startDate: "2026-02-20",
    endDate: "2026-06-20",
    priority: "Low",
    members: ["Carol", "Demo"],
    ticketCount: 4
  },
  {
    id: "P-105",
    name: "Inventory Management",
    manager: "James Appuser",
    startDate: "2026-01-05",
    endDate: "2026-08-15",
    priority: "High",
    members: ["Bruce", "Sue", "Alex"],
    ticketCount: 9
  },
  {
    id: "P-106",
    name: "Land Research Web App",
    manager: "Demo ProjectManager",
    startDate: "2026-03-12",
    endDate: "2026-10-01",
    priority: "Medium",
    members: ["Kim", "Luna"],
    ticketCount: 5
  }
];

export const tickets: Ticket[] = [
  {
    id: "BT-401",
    title: "Crash on project details page",
    project: "Issue Tracker Web",
    submitter: "Alex",
    developer: "Kim",
    created: "2026-03-22",
    priority: "Urgent",
    status: "Development",
    description: "Details page throws null reference when project has no PM assigned."
  },
  {
    id: "BT-402",
    title: "Sidebar links overlap on mobile",
    project: "Issue Tracker Web",
    submitter: "Sara",
    developer: "Unassigned",
    created: "2026-03-25",
    priority: "High",
    status: "New",
    description: "Navigation items stack incorrectly below 768px."
  },
  {
    id: "BT-403",
    title: "Notification badge count incorrect",
    project: "Notifications Center",
    submitter: "Noah",
    developer: "Ivy",
    created: "2026-03-26",
    priority: "Medium",
    status: "Testing",
    description: "Unread count remains stale after marking items as read."
  },
  {
    id: "BT-404",
    title: "Create MVC Web Application",
    project: "Electricity Usage Application",
    submitter: "Demo Admin",
    developer: "James Appuser",
    created: "2026-03-20",
    priority: "High",
    status: "Development",
    description: "Scaffold MVC layer for reporting module."
  },
  {
    id: "BT-405",
    title: "Design Database",
    project: "Health Insurance Management System",
    submitter: "Carol Appuser",
    developer: "Unassigned",
    created: "2026-03-21",
    priority: "Urgent",
    status: "New",
    description: "Entity relationship design for core schema."
  },
  {
    id: "BT-406",
    title: "Wire up authentication flow",
    project: "Identity Improvements",
    submitter: "Mason",
    developer: "Ethan",
    created: "2026-03-23",
    priority: "Medium",
    status: "Testing",
    description: "End-to-end sign-in and token refresh."
  }
];

/** Optional display overrides for dashboard KPIs (swap for API values later). */
export const dashboardKpiDisplay = {
  activeProjects: 0
};

export const dashboardMembers: DashboardMember[] = [
  { id: "m1", name: "Bruce Appuser", projectsCount: 2, role: "Developer" },
  { id: "m2", name: "Sue Appuser", projectsCount: 1, role: "Submitter" },
  { id: "m3", name: "Demo NewUser", projectsCount: 3, role: "Submitter" },
  { id: "m4", name: "Jane Appuser", projectsCount: 4, role: "ProjectManager" },
  { id: "m5", name: "Demo Admin", projectsCount: 6, role: "Admin" },
  { id: "m6", name: "Carol Appuser", projectsCount: 2, role: "Developer" }
];

export const notifications: Notification[] = [
  {
    id: "N-1",
    title: "Ticket Assigned",
    message: "You were assigned to BT-401.",
    createdAt: "Today, 10:24 AM",
    read: false
  },
  {
    id: "N-2",
    title: "Project Updated",
    message: "Issue Tracker Web end date changed.",
    createdAt: "Yesterday, 4:11 PM",
    read: false
  },
  {
    id: "N-3",
    title: "Comment Added",
    message: "A new comment was posted on BT-403.",
    createdAt: "2 days ago",
    read: true
  }
];
