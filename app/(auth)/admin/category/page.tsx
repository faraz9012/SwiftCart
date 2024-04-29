import { getCategories } from "@/lib/category";
import { Category, columns } from './columns';
import { DataTable } from "@/components/admin/data-table";

export default async function CategoryPage() {
  const categories = await getCategories() as Category[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="">
        <h1 className="text-lg font-semibold md:text-2xl">Category</h1>
        <h2>Category insights see how your categories are doing</h2>
      </div>
      
      <DataTable columns={columns} data={categories} />
    </div>
  );
}