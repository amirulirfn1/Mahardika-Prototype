"use client";

import type { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { PlusCircle, Users, ArrowUpDown, MoreHorizontal, Edit3, ShieldAlert } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";


const sampleCustomers: User[] = [
  { uid: "CUST001", email: "ali@example.com", displayName: "Ali Baba", role: "customer", loyaltyTier: "Gold", points: 7500, photoURL: "https://picsum.photos/seed/cust1/40/40" },
  { uid: "CUST002", email: "siti@example.com", displayName: "Siti Nurhaliza", role: "customer", loyaltyTier: "Silver", points: 3200, photoURL: "https://picsum.photos/seed/cust2/40/40" },
  { uid: "CUST003", email: "muthu@example.com", displayName: "Muthu Samy", role: "customer", loyaltyTier: "Bronze", points: 1800, photoURL: "https://picsum.photos/seed/cust3/40/40" },
  { uid: "STAFF001", email: "staff@mahardika.co", displayName: "Ahmad Staff", role: "staff", loyaltyTier: "Bronze", points: 0 },
];

const getCustomerColumns = (
    onEdit: (userId: string) => void,
    onChangeRole: (userId: string) => void
): ColumnDef<User>[] => [
    {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "displayName",
    header: "Name",
    cell: ({ row }) => {
        const user = row.original;
        return (
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL} alt={user.displayName || ""} data-ai-hint="profile picture" />
                    <AvatarFallback>{(user.displayName || "U").charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.displayName}</span>
            </div>
        )
    }
  },
  { 
    accessorKey: "email", 
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "role", header: "Role", cell: ({row}) => <Badge variant="outline" className="capitalize">{row.original.role}</Badge> },
  { accessorKey: "loyaltyTier", header: "Loyalty Tier", cell: ({row}) => <Badge className="capitalize">{row.original.loyaltyTier}</Badge>},
  { accessorKey: "points", header: "Points" },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
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
            <DropdownMenuItem onClick={() => onEdit(user.uid)}>
              <Edit3 className="mr-2 h-4 w-4" /> Edit User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeRole(user.uid)}>
              <ShieldAlert className="mr-2 h-4 w-4" /> Change Role/Tier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export default function CustomersPage() {
  const { toast } = useToast();

  const handleEditCustomer = (userId: string) => {
    toast({ title: "Edit Customer", description: `Edit functionality for ${userId} not implemented.` });
  };

  const handleChangeRole = (userId: string) => {
    toast({ title: "Change Role/Tier", description: `Role/Tier change for ${userId} not implemented.` });
  }
  
  const customerColumns = React.useMemo(() => getCustomerColumns(handleEditCustomer, handleChangeRole), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center"><Users className="mr-3 h-8 w-8 text-primary" />Customer Management</h1>
          <p className="text-muted-foreground">
            Manage all users including customers and staff.
          </p>
        </div>
        <Link href="/customers/new" passHref> {/* Assuming a /customers/new page */}
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New User
            </Button>
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>
            View and manage all registered users in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable columns={customerColumns} data={sampleCustomers} filterPlaceholder="Filter by email or name..." filterColumn="email" />
        </CardContent>
      </Card>
    </div>
  );
}
