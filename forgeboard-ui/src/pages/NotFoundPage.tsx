import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6 text-center">
      <div>
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-slate-600">Page not found.</p>
        <Link className="mt-4 inline-block text-brand-600" to="/dashboard">Go to dashboard</Link>
      </div>
    </div>
  );
}
