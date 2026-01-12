'use server';

import { createUser, getAllPermissions, getPermissionsByUserId, getUserByEmail, getUserRolesByUserId, updateUserRole } from "../user";
import { hashUserPassword, verifyPassword } from "./hash";
import { getUTCDateTime } from "../common-methods";
import { createAuthSession, destroySession, verifyAuth } from "./auth";
import { UserRoles } from "@/components/constants/user-roles";

export async function Register({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) {

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
        return { success: false, message: "Email is required." }
    }

    const hashedPassword = hashUserPassword(password);
    const customerCreatedTime = getUTCDateTime();

    try {
        const createResult = createUser({
            firstName,
            lastName,
            email: normalizedEmail,
            hashedPassword,
            customerCreatedTime
        });

        if (!createResult || createResult.changes === 0) {
            return { success: false, message: "It seems like an account with this email already exists." }
        }

        // set the registered role
        await updateUserRole(createResult.id, UserRoles.Registered)

        if (!process.env.SESSION_SECRET) {
            return { success: false, message: "SESSION_SECRET is not set." }
        }
        await createAuthSession(createResult.id);
        return { success: true, message: "Registration successful!" }
    }
    catch (error: any) {
        let errorMessage = "Uh-Oh! Something went wrong."
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            errorMessage = "It seems like an account with this email already exists.";
        }
        if (error?.message?.includes("SESSION_SECRET is not set")) {
            errorMessage = "SESSION_SECRET is not set."
        }
        return { success: false, message: errorMessage }
    }
}

export async function LoginUser({ email, password }: { email: string, password: string }) {

    try {
        const user: any = getUserByEmail(email.toLowerCase());
        if (!user) {
            return { success: false, message: "Could not authenticate user, please check your credentials." }
        }

        const isValidPassword = verifyPassword(user.passwordHash, password);

        if (!isValidPassword) {
            return { success: false, message: "Could not authenticate user, please check your credentials." }
        }

        if (!process.env.SESSION_SECRET) {
            return { success: false, message: "SESSION_SECRET is not set." }
        }
        await createAuthSession(user.id);
        return { success: true, message: "Login successful!" }
    }
    catch (error: any) {
        let errorMessage = "Uh-Oh! Something went wrong."
        if (error?.message?.includes("SESSION_SECRET is not set")) {
            errorMessage = "SESSION_SECRET is not set."
        }
        return { success: false, message: errorMessage }
    }
}

export async function LogoutUser() {
    try {
        await destroySession();
        return { success: true, message: "See you later! You're now logged out." }
    }
    catch (error: any) {
        let errorMessage = "Uh-Oh! Something went wrong."
        return { success: false, message: errorMessage }
    }
}

export async function checkUserPermissions() {
    const auth = await verifyAuth();
    const userId:any = auth?.user?.id;
    if (!userId) return [];

    const permissions = await getPermissionsByUserId(userId);
    if (permissions.length > 0) {
        return permissions;
    }

    const roles = await getUserRolesByUserId(userId);
    const isSuperAdmin = roles.some((role: any) => role.systemName === "SuperAdmin");
    if (isSuperAdmin) {
        return await getAllPermissions();
    }

    if (auth?.user?.email === "admin@yourstore.com") {
        return await getAllPermissions();
    }

    return permissions;
}
