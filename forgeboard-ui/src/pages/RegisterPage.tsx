import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold">Create Account</h1>
        <Input placeholder="Full Name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Register</Button>
        <p className="text-sm text-slate-500">Already have account? <Link to="/login" className="text-brand-600">Login</Link></p>
      </Card>
    </div>
  );
}
