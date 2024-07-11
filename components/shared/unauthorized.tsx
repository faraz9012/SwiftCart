import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="">
        <h1 className="text-lg font-semibold md:text-2xl">Unauthorized </h1>
        <h2>Your current permissions do not allow you to view this content.</h2>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8 w-fit mx-auto mt-4" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Need Assistance?
          </h3>
          <p className="text-sm text-muted-foreground">
            Our admins are here to help! Get in touch to get permissions.
          </p>
          <Button className="mt-4">Contact Admin</Button>
        </div>
      </div>
    </div>
  );
}