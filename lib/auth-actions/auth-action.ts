'use server';

import { createUser, getUserByEmail } from "../user";
import { hashUserPassword, verifyPassword } from "./hash";
import { getUTCDateTime } from "../common-methods";
import { createAuthSession } from "./auth";

export async function Register({ firstName, lastName, email, password } : { firstName: string, lastName: string, email: string, password: string }) {

    const hashedPassword = hashUserPassword(password);
    const customerCreatedTime = getUTCDateTime();

    try {
        const customer = createUser({ firstName, lastName, email, hashedPassword, customerCreatedTime });
        await createAuthSession(customer);
        return {success: true, message: "Registration successful!"}
    }
    catch (error:any) {
        let errorMessage = "Uh-Oh! Something went wrong."
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            errorMessage = "It seems like an account with this email already exists.";
            return {success: false, message: errorMessage}
        }
    }
}

export async function LoginUser({ email, password } : { email: string, password: string }) {

    try {
        const user:any = getUserByEmail(email);
        if(!user) {
            return {success: false, message: "Could not authenticate user, please check your credentials."}
        }
        
        const isValidPassword = verifyPassword(user.passwordHash, password);
        
        if(!isValidPassword) {
            return {success: false, message: "Could not authenticate user, please check your credentials."}
        }

        await createAuthSession(user.id);
        return {success: true, message: "Login successful!"}
    }
    catch (error:any) {
        let errorMessage = "Uh-Oh! Something went wrong."
        return {success: false, message: errorMessage}
    }
}