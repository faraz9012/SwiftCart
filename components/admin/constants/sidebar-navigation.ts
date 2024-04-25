import { Home, Package, ShoppingCart } from "lucide-react"

interface SidebarNavigation {
    id: string;
    icon?: any;
    title: string;
    route: string;
}

export const SIDEBAR_NAVIGATION: SidebarNavigation[] = [
    {
        id: 'dashboard',
        icon: Home,
        title: "Dashboard",
        route: "/admin",
    },
    {
        id: 'Products',
        icon: Package,
        title: "Products",
        route: "/admin/products",
    },
    {
        id: 'Orders',
        icon: ShoppingCart,
        title: "Orders",
        route: "/admin/orders",
    },
];