import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export function createCustomer({ firstName, lastName, email, hashedPassword, customerCreatedTime } : { firstName: string, lastName: string, email: string, hashedPassword: string, customerCreatedTime: string }) {
    const result = db
        .prepare(`INSERT INTO Customers (FirstName, LastName, Email, PasswordHash, IsActive, CreatedOnUTC, LastLoginOnUTC) VALUES (?,?,?,?, 1, ?, ?)`)
        .run(firstName, lastName, email, hashedPassword, customerCreatedTime,customerCreatedTime);

    return result.lastInsertRowid;
}