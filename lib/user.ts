import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export function createCustomer() {
    db.prepare(`INSERT INTO Customers (email, password)`)
}