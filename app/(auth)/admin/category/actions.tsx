'use server';

import { bulkDeleteCategories, getCategoryById, getCategoryByName, insertCategory } from '@/lib/category';
import { generateSlug, getUTCDateTime } from '@/lib/common-methods';


export async function deleteCategories(id: number[]) {
    if(!id) return;
    try {
        await bulkDeleteCategories(id);
        return {success: true, message: "Category(s) deleted"}
    } catch (error) {
        return {success: true, message: `Something went wrong ${error}`}

    }
}

export async function createCategory({ name, desc, image, parentCategoryId, published}: { name: string, desc: string, image: string, parentCategoryId:number, published:boolean}) {

    const slug = await generateSlug(name);

    try {
        const categoryExist = await getCategoryByName(name);

        if (categoryExist) return { success: false, message: "It seems like a category with this name already exists." };

        const category = await insertCategory({ name, slug, desc, image, parentCategoryId, published });

        if (!category) return { success: false, message: "An error occured! Please try again." }

        return { success: true, message: "New category created!" }
    }
    catch (error: any) {
        let errorMessage = "Uh-Oh! Something went wrong."
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            errorMessage = "It seems like a category with this name already exists.";
            return { success: false, message: errorMessage }
        }
    }
}