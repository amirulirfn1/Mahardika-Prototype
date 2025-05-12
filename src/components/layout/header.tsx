import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserProfile } from "@/components/layout/user-profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      
      {/* Desktop Logo/Brand - hidden on small screens, shown when sidebar is collapsed */}
      <Link href="/dashboard" className="items-center gap-2 hidden group-data-[state=collapsed]/sidebar-wrapper:sm:flex md:hidden group-data-[collapsible=icon]/sidebar:sm:flex">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="sr-only">Mahardika</span>
      </Link>

      {/* Breadcrumbs placeholder - can be implemented later */}
      {/* <div className="flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Policies</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}
      
      <div className="ml-auto flex items-center gap-2">
        {/* Placeholder for Search or other actions */}
        {/* <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button> */}
        <ThemeToggle />
        <UserProfile />
      </div>
    </header>
  );
}
