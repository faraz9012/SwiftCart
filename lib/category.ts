import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';

import sql from 'better-sqlite3';
import { Category } from '@/app/(auth)/admin/category/columns';

const db = sql('SwiftCart.db');

export const getCategories = nextCache(
    cache(async function getCategories() {
        return db.prepare('SELECT * FROM Category WHERE isDeleted=0').all();
    }), ['allCategories'], {
        tags: ['allCategories']
    }
);

export function getCategoryById(id: number) {
    return db.prepare(`SELECT * FROM Category WHERE id=? AND isDeleted=0`).get(id) as Promise<Category>;
};

export async function getCategoryByName(name: string) {
    return db.prepare(`SELECT * FROM Category WHERE name=? AND isDeleted=0`).get(name);
};

export function getCategoryBySlug(slug: string) {
    return db.prepare('SELECT * FROM Category WHERE slug = ? AND isDeleted = 0').get(slug);
};

export async function insertCategory({ name, slug, desc, image, parentCategoryId, published }: { name: string, slug: string, desc: string, image: string, parentCategoryId: number, published: boolean }) {
    try {
        const result = await db.prepare(`
          INSERT INTO Category (name, slug, description, image, parentCategoryId, published, createdOnUTC)
          VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) -- Use database function
        `).run(name, slug, desc, image, parentCategoryId, (published) ? 1 : 0);

        return result;
    } catch (error) {
        console.error("Error inserting category:", error);
    }
};

export async function bulkDeleteCategories(id: number[]) {
    for (const categoryId of id) {
        const deleteStatement = db.prepare(`UPDATE Category SET isDeleted=1 WHERE id = ?`);
        await deleteStatement.run(categoryId);
    }
};

export async function deleteCategory(id: number) {
    try {
        const result = await db.prepare(`
        UPDATE Category SET isDeleted=1 WHERE id = ?
        `).run(id);

        return result;
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};

export async function updateCategory({ id, name, slug, desc, image, parentCategoryId, published }: { id: number, name: string, slug: string, desc: string, image: string, parentCategoryId: number, published: boolean }) {
    try {
        const result = await db.prepare(`
          UPDATE Category 
          SET name = ?, slug = ?, description = ?, image = ?, parentCategoryId = ?, published = ?, updatedOnUTC = CURRENT_TIMESTAMP
          WHERE id = ? 
        `).run(name, slug, desc, image, parentCategoryId, (published ? 1 : 0), id);

        return result;
    } catch (error) {
        console.error("Error inserting category:", error);
    }
};