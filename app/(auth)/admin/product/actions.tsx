'use server';

import { bulkDeleteProductPictureMappingByProductId, bulkDeleteProducts, deleteProduct, deleteProductPictureMappingByProductId } from "@/lib/product";
import { revalidateTag } from "next/cache";

export async function deleteProductsServerAction(id: number[]) {
    if (!id) return;
    try {
        await bulkDeleteProductPictureMappingByProductId(id);
        await bulkDeleteProducts(id);
        revalidateTag("allProducts", "default");

        return { success: true, message: "Product(s) deleted" }
    } catch (error) {
        return { success: true, message: `Something went wrong ${error}` }

    }
}

export async function deleteProductByIdServerAction(id: number) {
    if (!id) return;
    try {
        await deleteProductPictureMappingByProductId(id);
        await deleteProduct(id);
        revalidateTag("allProducts", "default");

        return { success: true, message: "Product(s) deleted" }
    } catch (error) {
        return { success: true, message: `Something went wrong ${error}` }

    }
}
