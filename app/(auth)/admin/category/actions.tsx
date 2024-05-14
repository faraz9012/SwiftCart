'use server';

import { bulkDeleteCategories } from '@/lib/category';


export async function deleteCategories(id: number[]) {
    if(!id) return;
    try {
        await bulkDeleteCategories(id);
        return {success: true, message: "Category(s) deleted"}
    } catch (error) {
        return {success: true, message: `Something went wrong ${error}`}

    }
}