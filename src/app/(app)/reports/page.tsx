
"use client";

import type { Report } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import { FilePieChart, Download, Eye, MoreHorizontal } from "lucide-react";
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Sample data - replace with actual data fetching
const sampleReports: Report[] = [
  { id: "REP001", month: "2024-06", generatedDate: "2024-07-01", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", totalSales: 28500.50 },
  { id: "REP002", month: "2024-05", generatedDate: "2024-06-01", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", totalSales: 25200.00 },
  { id: "REP003", month: "2024-04", generatedDate: "2024-05-01", pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", totalSales: 31050.75 },
];

const getReportColumns = (
    onView: (pdfUrl: string) => void,
    onDownload: (pdfUrl: string, fileName: string) => void
): ColumnDef<Report>[] => [
  { accessorKey: "month", header: "Month" },
  { 
    accessorKey: "generatedDate", 
    header: "Generated Date",
    cell: ({ row }) => new Date(row.original.generatedDate).toLocaleDateString(),
  },
  { 
    accessorKey: "totalSales", 
    header: "Total Sales (RM)",
    cell: ({ row }) => `RM ${row.original.totalSales.toFixed(2)}`,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const report = row.original;
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
            <DropdownMenuItem onClick={() => onView(report.pdfUrl)}>
              <Eye className="mr-2 h-4 w-4" /> View Report
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDownload(report.pdfUrl, `Report-${report.month}.pdf`)}>
              <Download className="mr-2 h-4 w-4" /> Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export default function ReportsPage() {
  const { toast } = useToast();

  const handleViewReport = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  const handleDownloadReport = (pdfUrl: string, fileName: string) => {
    // This is a simplified download. For real scenarios, especially with auth, a server endpoint might be better.
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank'); // Try to open in new tab if direct download fails for some browsers/PDFs
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Download Started", description: `Report ${fileName} should be downloading.` });
  };

  const reportColumns = React.useMemo(() => getReportColumns(handleViewReport, handleDownloadReport), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center"><FilePieChart className="mr-3 h-8 w-8 text-primary" />Monthly Reports</h1>
          <p className="text-muted-foreground">
            Access and download generated monthly sales reports.
          </p>
        </div>
        {/* Button to manually trigger report generation, if applicable */}
        {/* <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Generate Current Month Report
        </Button> */}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            List of all automatically generated monthly reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable columns={reportColumns} data={sampleReports} filterPlaceholder="Filter by month, date or sales..." />
        </CardContent>
      </Card>
    </div>
  );
}

