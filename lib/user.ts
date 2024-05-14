import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export function createUser({ firstName, lastName, email, hashedPassword, customerCreatedTime }:
    { firstName: string, lastName: string, email: string, hashedPassword: string, customerCreatedTime: string }) {
    const result = db
        .prepare(`INSERT INTO User (firstName, lastName, email, passwordHash, isActive, createdOnUTC, lastLoginOnUTC) VALUES (?,?,?,?, 1, ?, ?)`)
        .run(firstName, lastName, email.toLowerCase(), hashedPassword, customerCreatedTime, customerCreatedTime);

    return result.lastInsertRowid;
}

export function getUserByEmail(email: string) {
    return db.prepare('SELECT * FROM User WHERE email = ?').get(email)
}

export function getPermissionsByUserId(id: number | bigint) {
    return db.prepare(`
    SELECT p.name, p.systemName, p.category
    FROM PermissionRecord p
    INNER JOIN PermissionRecordMapping rpm ON p.id = rpm.permission_id
    INNER JOIN UserRoleMapping urm ON rpm.role_id = urm.role_id
    INNER JOIN User u ON urm.user_id = u.id
    WHERE u.id = ?;

    `).get(id)
}