"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutUser } from "@/lib/auth-actions/auth-action";
import { toast } from "sonner";

    async function signOut() {
        const response = await LogoutUser();
        if (response.success) {
            toast.success(response.message);
        }
        else {
            toast.error(response?.message || "Something went wrong while logging you out.");
        }
    }

export default function MainHeaderDropdownItems(
    { isAuthenticated } : { isAuthenticated : boolean }) {

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAuthenticated ?
                    <Link href="/admin">
                        <DropdownMenuItem>
                            Dashboard
                        </DropdownMenuItem>
                    </Link> : null
                }

                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={isAuthenticated ? "/" : "/login"}>
                    <DropdownMenuItem onClick={isAuthenticated ? signOut : undefined}>
                        {isAuthenticated ? "Logout" : "Login"}
                        </DropdownMenuItem>
                    </Link>
                <Link href="/">
              </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}