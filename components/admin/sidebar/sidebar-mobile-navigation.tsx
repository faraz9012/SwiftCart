'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import { PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { SIDEBAR_NAVIGATION, SidebarNavigation } from "../../constants/sidebar-navigation";
import Logo from "@/components/shared/logo";
import { checkUserPermissions } from "@/lib/auth-actions/auth-action";

export default function SideNavMobileLink() {
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
       { isMobile && (
            <>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/admin"
                                className="group flex items-center gap-4 mt-2"
                            >
                                <Logo />
                                <span className="sr-only">Swift-Cart</span>
                                <span className="mt-2">Swift Cart</span>
                            </Link>
                            {filteredNav.map((item) => (
                                <Link
                                    id={item.id}
                                    href={item.route}
                                    title={item.title}
                                    key={item.id}
                                    className={`flex items-center gap-4 px-2.5
                                     ${pathname === item.route ? "text-black border-b-2 w-fit border-b-black dark:text-white dark:border-b-white"
                                      : "text-muted-foreground "}`}
                                >

                                    {item.icon && <item.icon className="size-5" />}
                                    {item.title}
                                </Link>
                            ))}

                        </nav>
                    </SheetContent>
                </Sheet>
            </>
        )}
       </>
    );

}
