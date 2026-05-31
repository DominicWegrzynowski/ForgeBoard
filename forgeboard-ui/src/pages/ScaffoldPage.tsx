import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { appRoutes, type RouteItem } from "../data/routeCatalog";

type Props = {
  title: string;
  description: string;
  currentPath: string;
};

export function ScaffoldPage({ title, description, currentPath }: Props) {
  const siblingRoutes = appRoutes
    .filter((route) => route.path !== currentPath)
    .slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to="/route-map">
          <Button variant="secondary">Open Route Map</Button>
        </Link>
      </div>

      <Card>
        <p className="text-sm text-slate-600">{description}</p>
        <p className="mt-2 text-sm text-slate-500">
          UI scaffold only. Connect forms/actions to your .NET backend handlers when ready.
        </p>
      </Card>

      <Card>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Quick Navigation</h3>
        <div className="flex flex-wrap gap-2">
          {siblingRoutes.map((route: RouteItem) => (
            <Link key={route.path} to={route.path}>
              <Button variant="ghost" className="border border-slate-200">
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
