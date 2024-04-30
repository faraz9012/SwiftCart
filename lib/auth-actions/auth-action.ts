'use server';

import { redirect } from "next/navigation";

import { createCustomer } from "../customer";
import { hashUserPassword } from "./hash";
import { getUTCDateTime } from "../common-methods";

export async function Register({ firstName, lastName, email, password } : { firstName: string, lastName: string, email: string, password: string }) {

    const hashedPassword = hashUserPassword(password);
    const customerCreatedTime = getUTCDateTime();

    try {
        createCustomer({ firstName, lastName, email, hashedPassword, customerCreatedTime });
        return {success: true, message: "Registration successful!"}
    }
    catch (error:any) {
        let errorMessage = "Uh-Oh! Something went wrong."
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            errorMessage = "It seems like an account with this email already exists.";
            return {success: false, message: errorMessage}
        }
    }
    redirect("/");
}