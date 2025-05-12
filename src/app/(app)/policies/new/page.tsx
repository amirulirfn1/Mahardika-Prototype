import { PolicyForm } from "@/components/policies/policy-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewPolicyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Policy</h1>
        <p className="text-muted-foreground">
          Fill in the details below to add a new insurance policy.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
          <CardDescription>All fields are required unless otherwise stated.</CardDescription>
        </CardHeader>
        <CardContent>
          <PolicyForm />
        </CardContent>
      </Card>
    </div>
  );
}
