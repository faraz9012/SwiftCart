export interface UserRole {
    id: number;
    systemName: string;
    name: string;
}
export interface Permission {
    id: number;
    systemName: string;
    name: string;
    category: string;
}
export interface PermissionMapping {
    id: number;
    permission_id: number;
    role_id: number;
}

export enum UserRoles {
    SuperAdmin = 1,
    Admin = 2,
    Registered = 3,
    Guests = 4
}

export enum Permissions {
    AccessAdminPanel = "Access admin area",
    ManageProducts = "Admin area. Manage Products",
    ManageCategories = "Admin area. Manage Categories",
    ManageOrders = "Admin area. Manage Orders",
    ManageConfigurations = "Admin area. Manage Configurations",
}