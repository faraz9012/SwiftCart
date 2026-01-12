import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { getUserById } from "@/lib/user";

type SessionData = {
    userId?: number;
};

const sessionOptions = {
    password: process.env.SESSION_SECRET as string,
    cookieName: "swiftcart_session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
    },
};

function assertSessionSecret() {
    if (!sessionOptions.password) {
        throw new Error("SESSION_SECRET is not set. Add it to .env.local and restart the server.");
    }
}

async function getSession() {
    assertSessionSecret();
    const cookieStore = await cookies();
    return getIronSession<SessionData>(cookieStore, sessionOptions);
}

async function getSessionIfConfigured() {
    if (!sessionOptions.password) return null;
    const cookieStore = await cookies();
    return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function createAuthSession(userId: number | bigint) {
    const session = await getSession();
    session.userId = Number(userId);
    await session.save();
    return session;
}

export async function verifyAuth() {
    const session = await getSessionIfConfigured();
    if (!session) {
        return {
            user: null,
            session: null,
        };
    }
    if (!session.userId) {
        return {
            user: null,
            session: null,
        };
    }

    const user = getUserById(session.userId) as { id: number; email: string } | undefined;
    if (!user) {
        await session.destroy();
        return { user: null, session: null };
    }

    return {
        user: { id: user.id, email: user.email },
        session: { userId: session.userId },
    };
}

export async function destroySession() {
    const session = await getSession();
    if (!session.userId) return "Unauthorized!";
    await session.destroy();
}
