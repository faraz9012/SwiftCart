"use server"

import { revalidatePath, revalidateTag } from 'next/cache';
import { getAllPermissions, getAllPermissionsMapping, getAllUserRoles, updateUserRolesPermission, deleteAllPermissionsByRoleId } from "@/lib/user";
import { checkUserPermissions } from '@/lib/auth-actions/auth-action';

export async function getAllUserRolesServerAction() {
    return await getAllUserRoles();
}

export async function getAllPermissionsServerAction() {
    return await getAllPermissions();
}

export async function getAllPermissionsMappingServerAction() {
    return await getAllPermissionsMapping();
}

export async function updateUserRolesServerAction(selectedPermissionsArray: { roleId: number, permissionIds: number[] }[]) {
    
    // Group selected permissions by roleId
    try {
        selectedPermissionsArray.forEach(async (selectedPermission)=> {
            await deleteAllPermissionsByRoleId(selectedPermission.roleId);
            
            if (selectedPermission.permissionIds.length > 0) {
                selectedPermission.permissionIds.forEach(async (permission) => {
                    await updateUserRolesPermission(permission, selectedPermission.roleId);
                });
            }

        });

        // Fetch updated permissions
        const updatedPermissions = await checkUserPermissions();

        // Revalidate the path to ensure the UI updates
        revalidateTag("allPermissionsMapping");

        return { success: true, message: "Permissions updated successfully.",updatedPermissions};
    } catch (error) {
        console.error(`Failed to update permissions:`, error);
        return { success: false, message: "Failed to update permissions." };
    }
}