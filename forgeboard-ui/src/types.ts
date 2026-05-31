export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type Status = "New" | "Development" | "Testing" | "Resolved";

export type Project = {
  id: string;
  name: string;
  manager: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  members: string[];
  ticketCount: number;
};

export type Ticket = {
  id: string;
  title: string;
  project: string;
  submitter: string;
  developer: string;
  created: string;
  priority: Priority;
  status: Status;
  description: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type DashboardMember = {
  id: string;
  name: string;
  projectsCount: number;
  role: string;
};
