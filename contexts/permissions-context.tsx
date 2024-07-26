'use client';

import { checkUserPermissions } from '@/lib/auth-actions/auth-action';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PermissionsContextType = {
    currentPermissions: string[];
    updatePermissions: (newPermissions: string[]) => void;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

const fetchPermissions = async (updatePermissions: (newPermissions: string[]) => void) => {
    try {
        const userPermissions = await checkUserPermissions();
        const userPermissionNames = userPermissions.map((permission: any) => permission.name);
        updatePermissions(userPermissionNames);
    } catch (error) {
        console.error("Error fetching permissions:", error);
    }
};

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
    const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);

    const updatePermissions = (newPermissions: string[]) => {
        setCurrentPermissions(newPermissions);
    };

    useEffect(() => {
        fetchPermissions(updatePermissions);
    }, []);

    return (
        <PermissionsContext.Provider value={{ currentPermissions, updatePermissions }}>
            {children}
        </PermissionsContext.Provider>
    );
};

export const usePermissions = () => {
    const context = useContext(PermissionsContext);
    if (!context) {
        throw new Error('usePermissions must be used within a PermissionsProvider');
    }
    return context;
};