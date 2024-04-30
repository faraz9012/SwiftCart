import { cookies } from "next/headers";

import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3";

const db = sqlite("SwiftCart.db");

const adapter = new BetterSqlite3Adapter(db, {
	user: "user",
	session: "session"
});

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: false ?? process.env.NODE_ENV === "production"
        }
    }
});

export async function createAuthSession(userId:number | bigint) {

    const session = await lucia.createSession((userId).toString(), {}).catch(err => console.log("Error: "+err));
    if(!session) return null;
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  }