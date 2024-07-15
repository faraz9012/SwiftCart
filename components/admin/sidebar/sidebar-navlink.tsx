'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { SIDEBAR_NAVIGATION, SidebarNavigation } from "../../constants/sidebar-navigation";
import Logo from "@/components/shared/logo";
import { checkUserPermissions } from "@/lib/auth-actions/auth-action";
import { TransitionLink } from "@/components/shared/transition-link";

export default function SideNavLink() {
  
  const pathname = usePathname();
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");
  
  const [filteredNav, setFilteredNav] = useState<SidebarNavigation[]>([]);
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const userPermissions = await checkUserPermissions();

        const userPermissionNames = userPermissions.map((permission:any) => permission.name);

        const filteredNavigation = SIDEBAR_NAVIGATION.filter(item =>
          item.permissions.every(permission => userPermissionNames.includes(permission))
        );

        setFilteredNav(filteredNavigation);
      } catch (error) {
        console.error("Error fetching permissions:", error); 
      }
    };

    fetchPermissions();
  }, []);

  return (
    <>
      {
        !isMobile && (
          <>
            <div
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full md:h-8 md:w-8 md:text-base"
            >
              <Logo />
              <span className="sr-only">Swift-Cart</span>
            </div>
            {filteredNav.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TransitionLink
                      href={item.route}
                      className={`flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === item.route ? "bg-black hover:text-white text-white dark:bg-slate-200 dark:text-gray-950 dark:hover:text-gray-950" : ""}`}
                    >
                      {item.icon && <item.icon className="size-5" />}
                      <span className="sr-only">{item.icon && item.title}</span>
                    </TransitionLink>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </>
        )
      }
    </>
  );

}
