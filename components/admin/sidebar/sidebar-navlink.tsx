'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { SIDEBAR_NAVIGATION } from "../../constants/sidebar-navigation";
import Logo from "@/components/logo";
// import { checkUserPermissions } from "@/lib/auth-actions/auth-action";

export default function SideNavLink() {
  
  const pathname = usePathname();
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");
  // const filteredSideNav = SIDEBAR_NAVIGATION.filter(() =>checkUserPermissions())

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
            {SIDEBAR_NAVIGATION.map((item) => (
              item.permissions && (
                <TooltipProvider key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.route}
                        className={`flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === item.route ? "bg-black hover:text-white text-white dark:bg-slate-200 dark:text-gray-950 dark:hover:text-gray-950" : ""}`}
                      >
                        {item.icon && <item.icon className="size-5" />}
                        <span className="sr-only">{item.icon && item.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            ))}
          </>
        )
      }
    </>
  );

}
