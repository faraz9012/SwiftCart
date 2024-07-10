"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
  Search,
  Settings,
} from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import DynamicBreadcrumb from "../dynamic-breadcrumb";
import { usePathname } from "next/navigation";
import SideNavLink from "./sidebar-navlink";
import SideNavMobileLink from "./sidebar-mobile-navigation";
import { LogoutUser } from "@/lib/auth-actions/auth-action";
import { toast } from "sonner";


const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const response = await LogoutUser();
    if (response.success) {
      toast.success(response.message);
      router.push("/");
    }
    else {
      toast.error(response?.message || "Something went wrong will logging you out.");
    }
  }
  return (
    // <div className="flex min-h-screen w-full flex-col">
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5" title="sidebar">
          <SideNavLink />
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/admin/settings"
                  className={`flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === "/admin/settings" ? "bg-black text-white dark:bg-slate-200 dark:text-gray-950" : ""}`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SideNavMobileLink />
          <DynamicBreadcrumb />

          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              aria-label="Search"
              autoComplete="on"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/images/placeholder-user.webp"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/">
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </>
    // </div>
  )
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false });