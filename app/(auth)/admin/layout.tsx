import Sidebar from "@/components/admin/sidebar/sidebar";

import { verifyAuth } from "@/lib/auth-actions/auth";
import { redirect } from "next/navigation";

export default async function AuthRootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated.user && !isAuthenticated.session) {
      redirect("/");
    }
    return (
        <Sidebar>
          {children}
        </Sidebar>
    );
  }