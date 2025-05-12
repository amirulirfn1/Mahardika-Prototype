"use client";

import * // Placeholder data - replace with actual data fetching
import type { Policy } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { getPolicyColumns } from "@/components/policies/policy-columns";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const samplePolicies: Policy[] = [
  { id: "POL001", ownerUid: "CUST001", vehicleId: "VEH001", customerName: "Ali Baba", vehiclePlate: "WWW 123", type: "Comprehensive", startDate: "2023-01-15", endDate: "2024-01-14", totalPrice: 1200, status: "active", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: "POL002", ownerUid: "CUST002", vehicleId: "VEH002", customerName: "Siti Nurhaliza", vehiclePlate: "JJJ 456", type: "ThirdParty", startDate: "2023-03-20", endDate: "2024-03-19", totalPrice: 450, status: "expired", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: "POL003", ownerUid: "CUST003", vehicleId: "VEH003", customerName: "Muthu Samy", vehiclePlate: "PPP 789", type: "Comprehensive", startDate: "2023-07-01", endDate: "2024-06-30", totalPrice: 1500, status: "pendingRenewal", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: "POL004", ownerUid: "CUST004", vehicleId: "VEH004", customerName: "Tan Ah Kow", vehiclePlate: "AAA 111", type: "Comprehensive", startDate: "2022-12-01", endDate: "2023-11-30", totalPrice: 1350, status: "expired" },
  { id: "POL005", ownerUid: "CUST005", vehicleId: "VEH005", customerName: "Priya Patel", vehiclePlate: "BBB 222", type: "ThirdParty", startDate: "2023-09-10", endDate: "2024-09-09", totalPrice: 500, status: "active" },
];


export default function PoliciesPage() {
  const { toast } = useToast();
  const [policies, setPolicies] = React.useState<Policy[]>(samplePolicies);
  const [policyToDelete, setPolicyToDelete] = React.useState<string | null>(null);


  const handleDeletePolicy = (policyId: string) => {
    // Placeholder for actual delete logic
    console.log("Delete policy:", policyId);
    setPolicies(prevPolicies => prevPolicies.filter(p => p.id !== policyId));
    toast({
      title: "Policy Deleted",
      description: `Policy ${policyId} has been (simulated) deleted.`,
    });
    setPolicyToDelete(null);
  };
  
  const confirmDeletePolicy = (policyId: string) => {
    setPolicyToDelete(policyId);
  };

  const policyColumns = React.useMemo(() => getPolicyColumns(confirmDeletePolicy), []);


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Policy Management</h1>
          <p className="text-muted-foreground">
            View, create, and manage insurance policies.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <Link href="/policies/new" passHref>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Policy
            </Button>
          </Link>
        </div>
      </div>

      <DataTable columns={policyColumns} data={policies} filterPlaceholder="Filter policies by ID..." filterColumn="id" />

      {policyToDelete && (
        <AlertDialog open={!!policyToDelete} onOpenChange={() => setPolicyToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                policy <span className="font-semibold">{policyToDelete}</span> and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setPolicyToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeletePolicy(policyToDelete)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
