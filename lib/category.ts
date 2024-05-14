import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export async function getCategories() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM Category').all();
}

export function getCategoryById(id: number) {
    return db.prepare(`SELECT * FROM Category WHERE id=${id}`).get();
}

export function createCategory({ name, slug, description, image, parentCategoryId, published, categoryCreatedTime}: { name: string, slug: string, description: string, image: string, parentCategoryId:number, published:boolean, categoryCreatedTime: string }) {
    const result = db
        .prepare(`INSERT INTO Category (name, slug, description, image, parentCategoryId, published, categoryCreatedTime) VALUES (?,?,?,?,?,?,?)`)
        .run(name, slug, description, image, parentCategoryId, published, categoryCreatedTime);

    return result;
}

export async function bulkDeleteCategories(id: number[]) {
    for (const categoryId of id) {
        const deleteStatement = db.prepare(`DELETE FROM Category WHERE id = ?`);
        await deleteStatement.run(categoryId);
    }
}