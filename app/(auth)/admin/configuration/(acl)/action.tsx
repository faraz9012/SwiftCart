"use server"

import { getAllPermissionByRoleId, getAllPermissions, getAllPermissionsMapping, getAllUserRoles, updateUserRolesPermission, deleteUserRolesPermissionMapping } from "@/lib/user";

export async function getAllUserRolesServerAction() {
    return await getAllUserRoles();
}

export async function getAllPermissionsServerAction() {
    return await getAllPermissions();
}

export async function getAllPermissionsMappingServerAction() {
    return await getAllPermissionsMapping();
}

export async function updateUserRolesServerAction(selectedPermissionsArray:any) {
    let {roleId, permissionId} = selectedPermissionsArray;
    
    try {
        const currentUserRolePermissions = await getAllPermissionByRoleId(roleId);

        if(!currentUserRolePermissions) {
            await updateUserRolesPermission(permissionId, roleId);
            return { success: true, message: "Permissions updated successfully." };
        }

         
    } catch {

    }
}