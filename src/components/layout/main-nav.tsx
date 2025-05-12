"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LayoutDashboard, FileText, Car, Users, FilePieChart, SettingsIcon, LifeBuoy } from "lucide-react";
import type { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroup,
} from "@/components/ui/sidebar";


const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/policies", label: "Policies", icon: FileText },
  { href: "/vehicles", label: "Vehicles", icon: Car },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/reports", label: "Reports", icon: FilePieChart },
];

const secondaryNavItems: NavItem[] = [
  { href: "/settings", label: "Settings", icon: SettingsIcon },
  { href: "/support", label: "Support", icon: LifeBuoy },
];

export function MainNav() {
  const pathname = usePathname();

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
      return (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={{ children: item.label, side: "right", align: "center" }}
            >
              <a>
                <item.icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <nav className="flex flex-col h-full">
      <SidebarGroup className="p-2">
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarMenu>
          {renderNavItems(mainNavItems)}
        </SidebarMenu>
      </SidebarGroup>
      
      <div className="mt-auto"> {/* Pushes secondary items to the bottom */}
        <SidebarGroup className="p-2">
            <SidebarGroupLabel>General</SidebarGroupLabel>
            <SidebarMenu>
            {renderNavItems(secondaryNavItems)}
            </SidebarMenu>
        </SidebarGroup>
      </div>
    </nav>
  );
}
