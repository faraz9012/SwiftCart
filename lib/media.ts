import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';

import sql from 'better-sqlite3';

const db = sql('SwiftCart.db');

export type Image = {
    id: number;
    name: string;
    mimeType: string;
    srcAttribute: string;
    altAttribute: string;
    titleAttribute: string;
}

export const getAllPictures = nextCache(
    cache(async function getAllPictures() {
        return db.prepare('SELECT * FROM Picture').all();
    }), ['allPictures'], {
    tags: ['allPictures']
}
);

export function getProductImageById(id: number) {
    return db.prepare('SELECT * FROM Picture WHERE id=?').get(id) as Image;
}