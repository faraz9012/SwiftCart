'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    ShoppingCart,
    Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { SIDEBAR_NAVIGATION } from "../constants/sidebar-navigation";
import Logo from "@/components/logo";

export default function SideNavMobileLink() {
    const pathname = usePathname();
    const isMobile = useMediaQuery("only screen and (max-width : 768px)");

    return (
        isMobile && (
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
                            {SIDEBAR_NAVIGATION.map((item) => (
                                <Link
                                    id={item.id}
                                    href={item.route}
                                    title={item.title}
                                    className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${pathname === item.route ? "text-white" : ""}`}
                                >

                                    {item.icon && <item.icon className="size-5" />}
                                    {item.title}
                                </Link>
                            ))}

                        </nav>
                    </SheetContent>
                </Sheet>
            </>
        )
    );

}
