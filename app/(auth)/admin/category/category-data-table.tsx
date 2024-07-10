"use client";

import { Category, columns } from './columns';
import { DataTable } from "@/components/admin/data-table";
import { deleteCategories } from "./actions";
import { toast } from 'sonner';

export default function CategoryDataTable({ categories }: { categories: Category[] }) {

    return (
        <DataTable
            columns={columns(categories)}
            data={categories}
            filterKey="name"
            onDelete={async (row) => {
                const ids = row.map((r) => r.original.id);
                await deleteCategories(ids).then((res) => {
                    if (!res) return;
                    
                    res.success ? toast.success(res.message) : toast.error(res.message);

                });
            }}
            disabled={false} />
    );
}