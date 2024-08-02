import { DataTable } from "@/components/admin/data-table";
import { Permissions } from "@/components/constants/user-roles";
import hasPermission from "@/hooks/use-permission-check";

function ProductPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory </h1>
        <h2>Product insights see how your products are doing</h2>
      </div>
      <div
        className="mt-2"
      >
        {/* <DataTable

        /> */}
      </div>
    </div>
  );
}

export default hasPermission(ProductPage, [Permissions.ManageProducts]);
