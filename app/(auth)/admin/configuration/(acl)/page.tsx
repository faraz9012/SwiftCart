import { getAllPermissions, getAllPermissionsMapping, getAllUserRoles } from "@/lib/user";
import AclGrid from "./acl-grid";
import { Permission, PermissionMapping, UserRole } from "@/components/constants/user-roles";

import { Table, TableCaption } from "@/components/ui/table";
export default async function AccessControlList() {
    const userRoles: UserRole[] = await getAllUserRoles();
    const permissions: Permission[] = await getAllPermissions();
    const permissionsMapping: PermissionMapping[] = await getAllPermissionsMapping();
    
  return (
    
    <Table>
        <TableCaption>Access control list is a list of permissions attached to customer roles. This list specifies the access rights of users to objects.</TableCaption>
        <AclGrid
        currentUserRoles={userRoles} 
        allPermissions={permissions} 
        permissionMapping={permissionsMapping} 
    />
    </Table>
  );
}
