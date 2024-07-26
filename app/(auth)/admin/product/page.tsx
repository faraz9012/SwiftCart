import { Permissions } from "@/components/constants/user-roles";
import { Button } from "@/components/ui/button";
import hasPermission from "@/hooks/use-permission-check";

function ProductPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory </h1>
        <h2>Product insights see how your products are doing</h2>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8 w-fit mx-auto mt-4" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </div>
  );
}

export default hasPermission(ProductPage, [Permissions.ManageProducts]);
