"use client";

import type { Policy } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Edit3, Trash2, FileDown, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


export const getPolicyColumns = (
    onDelete: (policyId: string) => void
  ): ColumnDef<Policy>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Policy ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => row.getValue("customerName") || "N/A",
  },
  {
    accessorKey: "vehiclePlate",
    header: "Vehicle Plate",
    cell: ({ row }) => row.getValue("vehiclePlate") || "N/A",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => new Date(row.getValue("startDate")).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => new Date(row.getValue("endDate")).toLocaleDateString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Policy["status"];
      let variant: "default" | "secondary" | "destructive" | "outline" = "default";
      if (status === "active") variant = "secondary"; // Using secondary for green-like
      if (status === "expired") variant = "destructive";
      if (status === "pendingRenewal") variant = "outline"; // Using outline for warning-like (yellowish with current theme)

      return <Badge variant={variant} className={
        status === "active" ? "bg-green-500/80 hover:bg-green-500 text-white" :
        status === "pendingRenewal" ? "bg-yellow-500/80 hover:bg-yellow-500 text-black" :
        status === "expired" ? "bg-red-500/80 hover:bg-red-500 text-white" : ""
      }>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const policy = row.original;
      const router = useRouter();
      const { toast } = useToast();

      const handleViewPdf = () => {
        if (policy.pdfUrl) {
            window.open(policy.pdfUrl, "_blank");
        } else {
            toast({ title: "No PDF", description: "PDF document is not available for this policy.", variant: "destructive" });
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push(`/policies/${policy.id}/edit`)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Policy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewPdf} disabled={!policy.pdfUrl}>
              <Eye className="mr-2 h-4 w-4" />
              View PDF
            </DropdownMenuItem>
             <DropdownMenuItem onClick={() => console.log("Download PDF for ", policy.id)} disabled={!policy.pdfUrl}>
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => onDelete(policy.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Policy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
