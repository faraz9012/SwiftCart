import { Folders, Home, Package, ShoppingCart } from "lucide-react"
import { Permissions } from "./user-roles"

interface SidebarNavigation {
    id: string;
    icon?: any;
    title: string;
    route: string;
    permissions: string[];
}

export const SIDEBAR_NAVIGATION: SidebarNavigation[] = [
    {
        id: 'dashboard',
        icon: Home,
        title: "Dashboard",
        route: "/admin",
        permissions: [Permissions.AccessAdminPanel]
    },
    {
        id: 'Categories',
        icon: Folders,
        title: "Categories",
        route: "/admin/category",
        permissions: [
            Permissions.AccessAdminPanel,
            Permissions.ManageCategories
        ]
    },
    {
        id: 'Products',
        icon: Package,
        title: "Products",
        route: "/admin/product",
        permissions: [
            Permissions.AccessAdminPanel,
            Permissions.ManageCategories
        ]
    },
    {
        id: 'Orders',
        icon: ShoppingCart,
        title: "Orders",
        route: "/admin/order",
        permissions: [
            Permissions.AccessAdminPanel,
            Permissions.ManageOrders
        ]
    },
];