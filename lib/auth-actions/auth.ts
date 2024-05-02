import { cookies } from "next/headers";

import { Lucia, TimeSpan } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3";

const db = sqlite("SwiftCart.db");

const adapter = new BetterSqlite3Adapter(db, {
    user: "User",
    session: "Session"
});


export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: false ?? process.env.NODE_ENV === "production",
            path: "/"
        }
    },
    sessionExpiresIn: new TimeSpan(1, "d"),
    getUserAttributes: (attr) => attr,
});

export async function createAuthSession(userId: number | bigint) {
    const session = await lucia.createSession((userId).toString(), {}).catch(err => console.log("Error: " + err));
    if (!session) return null;
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
}

export async function verifyAuth() {
    const sessionCookie = cookies().get(lucia.sessionCookieName);

    if (!sessionCookie) {
        return {
            user: null,
            session: null,
        };
    }

    const sessionId = sessionCookie.value;

    if (!sessionId) {
        return {
            user: null,
            session: null,
        };
    }

    const result = await lucia.validateSession(sessionId);

    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
    } catch { }

    return result;
}