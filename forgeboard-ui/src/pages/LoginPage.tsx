import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Sign In</h1>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Login</Button>
        <p className="text-sm text-slate-500">No account? <Link to="/register" className="text-brand-600">Register</Link></p>
      </Card>
    </div>
  );
}
