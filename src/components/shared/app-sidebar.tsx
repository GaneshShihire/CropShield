'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Bot,
  DollarSign,
  Landmark,
  LayoutDashboard,
  Leaf,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/price-prediction',
    label: 'Price Prediction',
    icon: DollarSign,
  },
  {
    href: '/disease-detection',
    label: 'Disease Detection',
    icon: Bot,
  },
  {
    href: '/schemes',
    label: 'Govt. Schemes',
    icon: Landmark,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground',
              'group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8'
            )}
          >
            <Leaf className="h-5 w-5" />
          </div>
          <span className="truncate text-lg font-semibold font-headline group-data-[collapsible=icon]:hidden">
            CropShield
          </span>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        {menuItems.map(({ href, label, icon: Icon }) => (
          <SidebarMenuItem key={href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === href}
              tooltip={label}
            >
              <Link href={href}>
                <Icon />
                <span className="truncate">{label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </Sidebar>
  );
}
