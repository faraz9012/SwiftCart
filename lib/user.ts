import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export function createUser({ firstName, lastName, email, hashedPassword, customerCreatedTime }: { firstName: string, lastName: string, email: string, hashedPassword: string, customerCreatedTime: string }) {
    const result = db
        .prepare(`INSERT INTO User (firstName, lastName, email, passwordHash, isActive, createdOnUTC, lastLoginOnUTC) VALUES (?,?,?,?, 1, ?, ?)`)
        .run(firstName, lastName, email, hashedPassword, customerCreatedTime, customerCreatedTime);

    return result.lastInsertRowid;
}

export function getUserByEmail(email: string) {
    return db.prepare('SELECT * FROM User WHERE email = ?').get(email)
}