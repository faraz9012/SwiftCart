import Sidebar from "@/components/admin/sidebar/sidebar";

export default async function AuthRootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        <Sidebar>
          {children}
        </Sidebar>
      </div>
    );
  }