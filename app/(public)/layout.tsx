import MainFooter from "@/components/main-footer/main-footer";
import MainHeader from "@/components/main-header/main-header";

export default function PublicLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
        <MainHeader />
        {children}
        <MainFooter />
      </div>
    );
  }