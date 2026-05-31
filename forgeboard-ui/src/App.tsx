import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { appRoutes } from "./data/routeCatalog";
import {
  AllProjectsPage,
  AssignDeveloperPage,
  AssignMembersPage,
  DashboardPage,
  LoginPage,
  ManageRolesPage,
  NotFoundPage,
  NotificationsPage,
  ProfilePage,
  ProjectDetailsPage,
  ProjectsPage,
  RegisterPage,
  RouteMapPage,
  ScaffoldPage,
  TicketDetailsPage,
  TicketsPage
} from "./pages";

function InApp({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

const customPaths = new Set([
  "/dashboard",
  "/projects",
  "/tickets",
  "/tickets/:id",
  "/projects/all",
  "/projects/assign-members",
  "/projects/details",
  "/tickets/assign-developer",
  "/roles/manage",
  "/notifications",
  "/profile",
  "/route-map"
]);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<InApp><DashboardPage /></InApp>} />
      <Route path="/projects" element={<InApp><ProjectsPage /></InApp>} />
      <Route path="/projects/all" element={<InApp><AllProjectsPage /></InApp>} />
      <Route path="/projects/assign-members" element={<InApp><AssignMembersPage /></InApp>} />
      <Route path="/projects/details" element={<InApp><ProjectDetailsPage /></InApp>} />
      <Route path="/tickets" element={<InApp><TicketsPage /></InApp>} />
      <Route path="/tickets/:id" element={<InApp><TicketDetailsPage /></InApp>} />
      <Route path="/tickets/assign-developer" element={<InApp><AssignDeveloperPage /></InApp>} />
      <Route path="/roles/manage" element={<InApp><ManageRolesPage /></InApp>} />
      <Route path="/notifications" element={<InApp><NotificationsPage /></InApp>} />
      <Route path="/profile" element={<InApp><ProfilePage /></InApp>} />
      <Route path="/route-map" element={<InApp><RouteMapPage /></InApp>} />

      {appRoutes
        .filter((route) => !customPaths.has(route.path))
        .map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <InApp>
                <ScaffoldPage title={route.label} description={route.description} currentPath={route.path} />
              </InApp>
            }
          />
        ))}

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
