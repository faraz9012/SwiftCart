import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export function createUser({ firstName, lastName, email, hashedPassword, customerCreatedTime }:
    { firstName: string, lastName: string, email: string, hashedPassword: string, customerCreatedTime: string }) {
    const result = db
        .prepare(`INSERT INTO User (firstName, lastName, email, passwordHash, isActive, createdOnUTC, lastLoginOnUTC) VALUES (?,?,?,?, 1, ?, ?)`)
        .run(firstName, lastName, email.toLowerCase(), hashedPassword, customerCreatedTime, customerCreatedTime);

    return result.lastInsertRowid;
}

export function updateUserRole(userId:number | bigint, roleId:number) {
    return db.prepare('INSERT INTO UserRoleMapping (user_id, role_id) VALUES (?, ?);').run(userId, roleId)
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

    `).all(id)
}

export async function getAllPermissions() {
    return db.prepare(`
        SELECT * FROM PermissionRecord;
    `).all()
}

export async function getAllPermissionsMapping() {
    return db.prepare(`
        SELECT * FROM PermissionRecordMapping;
    `).all()
}

export async function getAllUserRoles() {
    return db.prepare(`
        SELECT * FROM UserRole;
    `).all()
}

export async function getAllPermissionByRoleId(roleId:number) {
    return db.prepare(`
        SELECT * FROM PermissionRecordMapping WHERE role_id=?;
    `).all(roleId)
}

export async function updateUserRolesPermission(permissionId:number, roleId:number) {
    return db.prepare(`
        INSERT INTO PermissionRecordMapping (permission_id, role_id) VALUES (?,?);
    `).run(permissionId, roleId)
}

export async function deleteUserRolesPermissionMapping(permissionId:number, roleId:number) {
    return db.prepare(`
        DELETE FROM PermissionRecordMapping WHERE permission_id = ? AND role_id = ?;
    `).run(permissionId, roleId)
}

export async function deleteAllPermissionsByRoleId(roleId: number) {
    return db.prepare(`
        DELETE FROM PermissionRecordMapping WHERE role_id = ?;
    `).run(roleId);
}