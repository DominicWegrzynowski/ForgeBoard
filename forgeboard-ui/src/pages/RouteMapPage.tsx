import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { appRoutes } from "../data/routeCatalog";

export function RouteMapPage() {
  const grouped = appRoutes.reduce<Record<string, typeof appRoutes>>((acc, route) => {
    if (!acc[route.section]) acc[route.section] = [];
    acc[route.section].push(route);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Route Map</h2>
      <p className="text-sm text-slate-600">All scaffolded pages that mirror the MVC app surface area.</p>

      {Object.entries(grouped).map(([section, routes]) => (
        <Card key={section}>
          <h3 className="mb-3 text-lg font-semibold">{section}</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="rounded-lg border border-slate-200 p-3 text-sm hover:bg-slate-50"
              >
                <p className="font-medium">{route.label}</p>
                <p className="text-xs text-slate-500">{route.path}</p>
              </Link>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
