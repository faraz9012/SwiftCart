'use client';

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { getAllPermissionsMappingServerAction, getAllPermissionsServerAction, getAllUserRolesServerAction, updateUserRolesServerAction } from "./action";
import { toast } from "sonner";
import { Permission, PermissionMapping, UserRole } from "@/components/constants/user-roles";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/contexts/permissions-context";

const getUserRoles = async (): Promise<UserRole[]> => {
    try {
        const userRoles: any = await getAllUserRolesServerAction();
        if (!userRoles) {
            toast.error("Something went wrong, please try again.");
            return [];
        }
        return userRoles;
    } catch (error) {
        toast.error("Something went wrong, please try again.");
        return [];
    }
};

const getPermissions = async (): Promise<Permission[]> => {
    try {
        const permissions: any = await getAllPermissionsServerAction();
        if (!permissions) {
            toast.error("Something went wrong, please try again.");
            return [];
        }
        return permissions;
    } catch (error) {
        toast.error("Something went wrong, please try again.");
        return [];
    }
};

const getPermissionsMapping = async (): Promise<PermissionMapping[]> => {
    try {
        const permissionsMapping: any = await getAllPermissionsMappingServerAction();
        if (!permissionsMapping) {
            toast.error("Something went wrong, please try again.");
            return [];
        }
        return permissionsMapping;
    } catch (error) {
        toast.error("Something went wrong, please try again.");
        return [];
    }
};

export function AccessControlList() {
    const [userRoles, setUserRoles] = useState<UserRole[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [permissionsMapping, setPermissionsMapping] = useState<PermissionMapping[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<{ [key: string]: Set<number> }>({});
    const { updatePermissions } = usePermissions();

    useEffect(() => {
        getUserRoles().then(setUserRoles);
        getPermissions().then(setPermissions);
        getPermissionsMapping().then((data) => {
            setPermissionsMapping(data);
            const initialSelectedPermissions: { [key: string]: Set<number> } = {};
            data.forEach((mapping: PermissionMapping) => {
                if (!initialSelectedPermissions[mapping.role_id]) {
                    initialSelectedPermissions[mapping.role_id] = new Set();
                }
                initialSelectedPermissions[mapping.role_id].add(mapping.permission_id);
            });
            setSelectedPermissions(initialSelectedPermissions);
        });
    }, []);

    const handleCheckboxChange = (roleId: number, permissionId: number, isChecked: boolean) => {
        setSelectedPermissions((prevSelected) => {
            const updatedSelected = { ...prevSelected };
            console.log(updatedSelected);
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
        const selectedPermissionsArray: { roleId: number, permissionId: number }[] = [];
        for (const roleId in selectedPermissions) {
            selectedPermissions[roleId].forEach((permissionId) => {
                selectedPermissionsArray.push({ roleId: Number(roleId), permissionId });
            });
        }

        const response:any = await updateUserRolesServerAction(selectedPermissionsArray);
        let updatedPermissionNames = response.updatedPermissions.map((permission: any) => permission.name);

        if (response.success) {
            toast.success(response.message);
            updatePermissions(updatedPermissionNames); 
        } else {
            toast.error(response.message || "Something went wrong.");
        }
    };

    return (
        <Table>
            <TableCaption>Access control list is a list of permissions attached to customer roles. This list specifies the access rights of users to objects.</TableCaption>
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
                                        onClick={(e:any)=> {
                                            allowPermission = !allowPermission;
                                            handleCheckboxChange(userRole.id, permission.id, allowPermission)
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
        </Table>
    );
}