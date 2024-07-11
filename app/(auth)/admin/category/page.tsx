import { getCategories } from "@/lib/category";
import { Category } from './columns';
import CategoryDataTable from "./category-data-table";
import AddCategoryButton from "./add-category";
import { Permissions } from '@/components/constants/user-roles';
import hasPermission from "@/hooks/use-permission-check";

async function CategoryPage() {
  const categories = await getCategories() as Category[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="block lg:flex lg:justify-between lg:items-center">
        <div className="">
          <h1 className="text-lg font-semibold md:text-2xl">Category</h1>
          <h2>Category insights see how your categories are doing</h2>
        </div>
        <div className="mt-2">
          <AddCategoryButton categories={categories} />
        </div>
      </div>
      <CategoryDataTable categories={categories} />
    </div>
  );
};

export default hasPermission(CategoryPage, [Permissions.ManageCategories]);