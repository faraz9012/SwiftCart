import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export async function getCategories() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare('SELECT * FROM Category').all();
}

export function getCategoryById(id: number) {
    return db.prepare(`SELECT * FROM Category WHERE id=?`).get(id);
}

export async function getCategoryByName(name: string) {
    return db.prepare(`SELECT * FROM Category WHERE name=?`).get(name);
}
export function getCategoryBySlug(slug: string) {
    return db.prepare('SELECT * FROM Category WHERE slug = ?').get(slug);
}

export async function insertCategory({ name, slug, desc, image, parentCategoryId, published }: { name: string, slug: string, desc: string, image: string, parentCategoryId:number, published:boolean }) {
    try {
        const result = await db.prepare(`
          INSERT INTO Category (name, slug, description, image, parentCategoryId, published, createdOnUTC)
          VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) -- Use database function
        `).run(name, slug, desc, image, parentCategoryId, (published) ? 1 : 0);
    
        return result;
      } catch (error) {
        console.error("Error inserting category:", error);
      }
  }

export async function bulkDeleteCategories(id: number[]) {
    for (const categoryId of id) {
        const deleteStatement = db.prepare(`DELETE FROM Category WHERE id = ?`);
        await deleteStatement.run(categoryId);
    }
}