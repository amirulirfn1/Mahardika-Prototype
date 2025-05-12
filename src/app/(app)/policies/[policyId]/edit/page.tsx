"use client";

import { PolicyForm } from "@/components/policies/policy-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Policy } from "@/lib/types";
import { useParams } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Placeholder data - replace with actual data fetching
const samplePolicies: Policy[] = [
  { id: "POL001", ownerUid: "CUST001", vehicleId: "VEH001", customerName: "Ali Baba", vehiclePlate: "WWW 123", type: "Comprehensive", startDate: "2023-01-15", endDate: "2024-01-14", totalPrice: 1200, status: "active", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: "POL003", ownerUid: "CUST003", vehicleId: "VEH003", customerName: "Muthu Samy", vehiclePlate: "PPP 789", type: "Comprehensive", startDate: "2023-07-01", endDate: "2024-06-30", totalPrice: 1500, status: "pendingRenewal" },
];


export default function EditPolicyPage() {
  const params = useParams();
  const policyId = params.policyId as string;
  
  const [policy, setPolicy] = React.useState<Policy | null | undefined>(undefined); // undefined for loading state
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate fetching policy data
    setLoading(true);
    const fetchedPolicy = samplePolicies.find(p => p.id === policyId);
    setTimeout(() => { // Simulate network delay
        setPolicy(fetchedPolicy || null);
        setLoading(false);
    }, 500);
  }, [policyId]);

  if (loading) {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-9 w-3/4 mb-2" />
                <Skeleton className="h-5 w-1/2" />
            </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <Skeleton className="h-7 w-1/4 mb-1" />
                    <Skeleton className="h-5 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <div className="flex justify-end gap-2">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  if (!policy) {
    return <div className="text-center py-10">Policy not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Policy: {policy.id}</h1>
        <p className="text-muted-foreground">
          Update the details for this insurance policy.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
          <CardDescription>Modify the fields below as needed.</CardDescription>
        </CardHeader>
        <CardContent>
          <PolicyForm initialData={policy} />
        </CardContent>
      </Card>
    </div>
  );
}
