import { Folders, Home, Package, ShoppingCart } from "lucide-react"

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
        id: 'Categories',
        icon: Folders,
        title: "Categories",
        route: "/admin/category",
    },
    {
        id: 'Products',
        icon: Package,
        title: "Products",
        route: "/admin/product",
    },
    {
        id: 'Orders',
        icon: ShoppingCart,
        title: "Orders",
        route: "/admin/order",
    },
];