"use client";

import { DataTable } from "@/components/admin/data-table";
import { toast } from 'sonner';
import { columns, Product } from '@/app/(auth)/admin/product/columns';
import { Image } from "@/lib/media";

import { deleteProductsServerAction } from "./actions";

export default async function ProductDataTable({ products, pictures }: { products: Product[], pictures:Image[] }) {

    return (
        <DataTable
            columns={columns(pictures)}
            data={products}
            filterKey="name"
            onDelete={async (row) => {
                const ids:any = row.map((r) => r.original.id);
                await deleteProductsServerAction(ids).then((res) => {
                    if (!res) return;
                    
                    res.success ? toast.success(res.message) : toast.error(res.message);

                });
            }}
            disabled={false} />
    );
}