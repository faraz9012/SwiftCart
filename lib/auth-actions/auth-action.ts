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
    }
    catch (error:any) {
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return "It seems like an account with this email already exists.";
        }
    }
    redirect("/");
}
