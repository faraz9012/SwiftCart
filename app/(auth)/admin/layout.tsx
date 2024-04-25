import Sidebar from "@/components/admin/sidebar/sidebar";

export default function RootLayout({
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