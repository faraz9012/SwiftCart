import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export async function getCategories() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM Category').all();
}

export function getCategoryById(id:number){
    return db.prepare(`SELECT * FROM Category WHERE id=${id}`).get();
}