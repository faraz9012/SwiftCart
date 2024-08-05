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