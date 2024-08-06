import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';

import sql from 'better-sqlite3';
import { Product } from '@/app/(auth)/admin/product/columns';

const db = sql('SwiftCart.db');

export const getAllProducts = nextCache(
    cache(async function getAllProducts() {
        return db.prepare('SELECT * FROM Product WHERE isDeleted=0').all();
    }), ['allProducts'], {
        tags: ['allProducts']
    }
);

export function getProductById(id: number) {
    return db.prepare(`SELECT * FROM Product WHERE id=? AND isDeleted=0`).get(id) as Promise<Product>;
};

export async function bulkDeleteProducts(id: number[]) {
    for (const productId of id) {
        const deleteStatement = db.prepare(`UPDATE Product SET isDeleted=1 WHERE id = ?`);
        await deleteStatement.run(productId);
    }
};

export async function deleteProduct(id: number) {
    try {
        const result = await db.prepare(`
        UPDATE Product SET isDeleted=1 WHERE id = ?
        `).run(id);

        return result;
    } catch (error) {
        console.error("Error deleting Product:", error);
    }
};


export async function deleteProductPictureMappingByProductId(id: number) {
    try {
        const result = await db.prepare(`
        DELETE FROM ProductPictureMapping WHERE product_id = ?
        `).run(id);

        return result;
    } catch (error) {
        console.error("Error deleting product picture mapping:", error);
    }
};


export async function bulkDeleteProductPictureMappingByProductId(id: number[]) {
    for (const productId of id) {
        const deleteStatement = db.prepare(`DELETE FROM ProductPictureMapping WHERE product_id = ?`);
        await deleteStatement.run(productId);
    }
};