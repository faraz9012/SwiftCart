"use server"

import { revalidatePath } from 'next/cache';
import { getAllPermissions, getAllPermissionsMapping, getAllUserRoles, updateUserRolesPermission, deleteAllPermissionsByRoleId } from "@/lib/user";

export async function getAllUserRolesServerAction() {
    return await getAllUserRoles();
}

export async function getAllPermissionsServerAction() {
    return await getAllPermissions();
}

export async function getAllPermissionsMappingServerAction() {
    return await getAllPermissionsMapping();
}

export async function updateUserRolesServerAction(selectedPermissionsArray: { roleId: number, permissionId: number }[]) {
    // Group selected permissions by roleId
    const selectedPermissionsByRole = selectedPermissionsArray.reduce((acc, { roleId, permissionId }) => {
        if (!acc[roleId]) {
            acc[roleId] = [];
        }
        acc[roleId].push(permissionId);
        return acc;
    }, {} as { [key: number]: number[] });

    try {
        for (const roleId in selectedPermissionsByRole) {
            // Remove all existing permissions for the role
            await deleteAllPermissionsByRoleId(Number(roleId));

            // Add new permissions
            const permissionIds = selectedPermissionsByRole[roleId];
            for (const permissionId of permissionIds) {
                await updateUserRolesPermission(permissionId, Number(roleId));
            }
        }

        
        revalidatePath("/admin/configuration");

        return { success: true, message: "Permissions updated successfully." };
    } catch (error) {
        console.error(`Failed to update permissions:`, error);
        return { success: false, message: "Failed to update permissions." };
    }
}