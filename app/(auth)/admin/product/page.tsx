import { Permissions } from "@/components/constants/user-roles";
import hasPermission from "@/hooks/use-permission-check";
import { Product } from '@/app/(auth)/admin/product/columns';
import { getAllProducts } from "@/lib/product";
import { getAllPictures, Image } from "@/lib/media";

import ProductDataTable from "./product-data-table";

async function ProductPage() {
  const products = await getAllProducts() as Product[];
  const pictures = await getAllPictures() as Image[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory </h1>
        <h2>Product insights see how your products are doing</h2>
      </div>
      <div
        className="mt-2"
      >
        <ProductDataTable products={products} pictures={pictures} />
      </div>
    </div>
  );
}

export default hasPermission(ProductPage, [Permissions.ManageProducts]);
