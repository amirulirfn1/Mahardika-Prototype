"use client";

import type { Vehicle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { PlusCircle, Car, ArrowUpDown, MoreHorizontal, Edit3, Archive, ArchiveRestore } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";


const sampleVehicles: Vehicle[] = [
  { id: "VEH001", ownerUid: "CUST001", ownerName: "Ali Baba", plateNumber: "WWW 123", make: "Toyota", model: "Vios", year: 2022, archived: false },
  { id: "VEH002", ownerUid: "CUST002", ownerName: "Siti Nurhaliza", plateNumber: "JJJ 456", make: "Honda", model: "City", year: 2021, archived: false },
  { id: "VEH003", ownerUid: "CUST003", ownerName: "Muthu Samy", plateNumber: "PPP 789", make: "Proton", model: "X50", year: 2023, archived: true },
  { id: "VEH004", ownerUid: "CUST001", ownerName: "Ali Baba", plateNumber: "VBE 555", make: "Perodua", model: "Myvi", year: 2020, archived: false },
];

const getVehicleColumns = (
    onToggleArchive: (vehicleId: string, currentStatus: boolean) => void,
    onEdit: (vehicleId: string) => void
): ColumnDef<Vehicle>[] => [
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
    accessorKey: "plateNumber",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Plate Number <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "make", header: "Make" },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "ownerName", header: "Owner" },
  {
    accessorKey: "archived",
    header: "Status",
    cell: ({ row }) => {
      const archived = row.getValue("archived");
      return <Badge variant={archived ? "destructive" : "secondary"} className={archived ? "bg-orange-500/80 text-white" : "bg-green-500/80 text-white"}>{archived ? "Archived" : "Active"}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicle = row.original;
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
            <DropdownMenuItem onClick={() => onEdit(vehicle.id)}>
              <Edit3 className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleArchive(vehicle.id, vehicle.archived)}>
              {vehicle.archived ? <ArchiveRestore className="mr-2 h-4 w-4" /> : <Archive className="mr-2 h-4 w-4" />}
              {vehicle.archived ? "Unarchive" : "Archive"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export default function VehiclesPage() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = React.useState<Vehicle[]>(sampleVehicles);

  const handleToggleArchive = (vehicleId: string, currentStatus: boolean) => {
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, archived: !currentStatus } : v));
    toast({
      title: `Vehicle ${currentStatus ? "Unarchived" : "Archived"}`,
      description: `Vehicle ${vehicleId} has been ${currentStatus ? "unarchived" : "archived"}.`,
    });
  };

  const handleEditVehicle = (vehicleId: string) => {
    // Placeholder for navigation to edit page or modal
    toast({ title: "Edit Vehicle", description: `Edit functionality for ${vehicleId} not implemented.` });
  };
  
  const vehicleColumns = React.useMemo(() => getVehicleColumns(handleToggleArchive, handleEditVehicle), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center"><Car className="mr-3 h-8 w-8 text-primary" />Vehicle Management</h1>
          <p className="text-muted-foreground">
            Manage all customer vehicles in the system.
          </p>
        </div>
        <Link href="/vehicles/new" passHref> {/* Assuming a /vehicles/new page */}
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Vehicle
            </Button>
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Vehicle List</CardTitle>
          <CardDescription>
            Browse and manage registered vehicles. Archived vehicles are hidden by default but can be filtered.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable columns={vehicleColumns} data={vehicles} filterPlaceholder="Filter by plate number, owner name..." />
        </CardContent>
      </Card>
    </div>
  );
}
