import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BarChart, Users, FileClock, TrendingUp, Trophy, AlertTriangle, PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

// Placeholder data
const kpiData = [
  { title: "Total Active Policies", value: "1,234", icon: FileClock, trend: "+2.1% this month" },
  { title: "New Customers", value: "56", icon: Users, trend: "+10 this week" },
  { title: "Revenue This Month", value: "RM 25,670", icon: BarChart, trend: "+8.5% vs last month" },
  { title: "Renewal Rate", value: "85%", icon: TrendingUp, trend: "Target: 90%" },
];

const expiringPolicies = [
  { id: "POL789", customer: "Siti Aminah", vehicle: "WXY 123", endDate: "2024-08-15", status: "pendingRenewal" },
  { id: "POL101", customer: "John Doe", vehicle: "ABC 456", endDate: "2024-08-22", status: "pendingRenewal" },
  { id: "POL202", customer: "Ravi Kumar", vehicle: "QWE 789", endDate: "2024-09-01", status: "pendingRenewal" },
];

const leaderboardData = [
  { rank: 1, name: "Ahmad Kassim", points: 12500, tier: "Platinum", avatar: "https://picsum.photos/seed/leader1/40/40" },
  { rank: 2, name: "Mei Ling Tan", points: 9800, tier: "Gold", avatar: "https://picsum.photos/seed/leader2/40/40" },
  { rank: 3, name: "David Chen", points: 7200, tier: "Gold", avatar: "https://picsum.photos/seed/leader3/40/40" },
  { rank: 4, name: "Priya Sharma", points: 5100, tier: "Silver", avatar: "https://picsum.photos/seed/leader4/40/40" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin! Here's an overview of your agency.</p>
        </div>
        <Link href="/policies/new" passHref>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Policy
            </Button>
        </Link>
      </div>

      {/* KPIs */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <StatCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Expiring Policies */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div >
                <CardTitle>Expiring Policies Soon</CardTitle>
                <CardDescription>Policies needing renewal in the next 60 days.</CardDescription>
            </div>
            <Link href="/policies?status=pendingRenewal" passHref>
                <Button variant="outline" size="sm">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </CardHeader>
          <CardContent>
            {expiringPolicies.length > 0 ? (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expiringPolicies.map((policy) => (
                    <TableRow key={policy.id}>
                        <TableCell className="font-medium">{policy.id}</TableCell>
                        <TableCell>{policy.customer}</TableCell>
                        <TableCell>{policy.vehicle}</TableCell>
                        <TableCell>{new Date(policy.endDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                        <Link href={`/policies/${policy.id}/edit`} passHref>
                            <Button variant="ghost" size="sm">Renew</Button>
                        </Link>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                    <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No policies expiring soon.</p>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Points Leaderboard */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="text-yellow-500"/> Loyalty Leaderboard</CardTitle>
            <CardDescription>Top customers by loyalty points.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboardData.map((customer) => (
              <div key={customer.rank} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md">
                <span className="text-lg font-semibold text-muted-foreground w-6">{customer.rank}.</span>
                <Avatar className="h-10 w-10 border-2 border-primary/50" data-ai-hint="profile picture">
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">{customer.points.toLocaleString()} points</p>
                </div>
                <Badge variant={customer.tier === "Platinum" ? "default" : customer.tier === "Gold" ? "secondary" : "outline"}
                  className={
                    customer.tier === "Platinum" ? "bg-purple-600 text-white" :
                    customer.tier === "Gold" ? "bg-yellow-500 text-black" :
                    customer.tier === "Silver" ? "bg-slate-400 text-white" : ""
                  }
                >
                  {customer.tier}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
