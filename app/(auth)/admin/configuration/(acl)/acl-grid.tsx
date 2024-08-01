"use client";

import {
    TableBody,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Permission, PermissionMapping, UserRole } from "@/components/constants/user-roles";
import { usePermissions } from "@/contexts/permissions-context";
import { useState, useEffect } from "react";
import { updateUserRolesServerAction } from "./action";

interface AclGridProps {
    currentUserRoles: UserRole[];
    allPermissions: Permission[];
    permissionMapping: PermissionMapping[];
}

export default function AclGrid({ currentUserRoles, allPermissions, permissionMapping }: AclGridProps) {
    const [userRoles, setUserRoles] = useState<UserRole[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<{ [key: string]: Set<number> }>({});
    const { updatePermissions } = usePermissions();

    useEffect(() => {
        const initialSelectedPermissions: { [key: string]: Set<number> } = {};
        permissionMapping.forEach((mapping: PermissionMapping) => {
            if (!initialSelectedPermissions[mapping.role_id]) {
                initialSelectedPermissions[mapping.role_id] = new Set();
            }
            initialSelectedPermissions[mapping.role_id].add(mapping.permission_id);
        });
        setUserRoles(currentUserRoles);
        setPermissions(allPermissions);
        setSelectedPermissions(initialSelectedPermissions);
    }, [currentUserRoles, allPermissions, permissionMapping]);

    const handleCheckboxChange = (roleId: number, permissionId: number, isChecked: boolean) => {
        setSelectedPermissions((prevSelected) => {
            const updatedSelected = { ...prevSelected };
            if (!updatedSelected[roleId]) {
                updatedSelected[roleId] = new Set();
            }
            if (isChecked) {
                updatedSelected[roleId].add(permissionId);
            } else {
                updatedSelected[roleId].delete(permissionId);
            }
            return updatedSelected;
        });
    };

    const updateUserRoles = async () => {
        const allRolesPermissions:any = userRoles.map(userRole => ({
            roleId: userRole.id,
            permissionIds: Array.from(selectedPermissions[userRole.id] || [])
        }));

        const response: any = await updateUserRolesServerAction(allRolesPermissions);
        let updatedPermissionNames = response.updatedPermissions.map((permission: any) => permission.name);

        if (response.success) {
            toast.success(response.message);
            updatePermissions(updatedPermissionNames);
            console.log(updatedPermissionNames);
        } else {
            toast.error(response.message || "Something went wrong.");
        }
    };

    return (
            <>
            <TableHeader>
                <TableRow>
                    <TableHead>Permissions</TableHead>
                    {userRoles.map((userRole) => (
                        <TableHead key={userRole.id}>{userRole.name}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {permissions.map((permission) => (
                    <TableRow key={permission.id}>
                        <TableCell>{permission.name}</TableCell>
                        {userRoles.map((userRole) => {
                            const isChecked = selectedPermissions[userRole.id]?.has(permission.id) || false;
                            let allowPermission = isChecked;

                            return (
                                <TableCell key={userRole.id}>
                                    <Checkbox
                                        id={`${userRole.id}-${permission.id}`}
                                        checked={allowPermission}
                                        aria-label={`Allow ${permission.systemName} for ${userRole.systemName}`}
                                        onClick={() => {
                                            allowPermission = !allowPermission;
                                            handleCheckboxChange(userRole.id, permission.id, allowPermission);
                                        }}
                                    />
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell colSpan={userRoles.length + 1}>
                        <Button className="mt-5" onClick={updateUserRoles}>Save changes</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
            </>
    );
}
