"use client";

import { Category, columns } from './columns';
import { DataTable } from "@/components/admin/data-table";
import { toast } from 'sonner';

export default function ProductDataTable({ products }: { products: Category[] }) {

    return (
        <DataTable
            columns={columns(products)}
            data={products}
            filterKey="name"
            onDelete={async (row) => {
                const ids = row.map((r) => r.original.id);
                // await deleteCategories(ids).then((res) => {
                //     if (!res) return;
                    
                //     res.success ? toast.success(res.message) : toast.error(res.message);

                // });
            }}
            disabled={false} />
    );
}