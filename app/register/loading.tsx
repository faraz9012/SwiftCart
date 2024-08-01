import { Skeleton } from "@/components/ui/skeleton";

export default function RegisterPageLoader() {
    return (
        <div className="w-full h-dvh lg:grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:block relative bg-black">
        <Skeleton className="h-full w-full" />
        <div className="absolute inset-0 bg-zinc-900 opacity-65"></div>
        <div className="absolute top-8 p-4 flex items-center">
          <Skeleton className="h-[25px] w-[25px] mr-2" />
          <Skeleton className="h-[25px] w-[160px]" />
        </div>
        <div className="absolute bottom-8 z-20 p-4">
          <blockquote className="space-y-2">
            <Skeleton className="h-[25px] w-[650px]" />
            <Skeleton className="h-[25px] w-[550px]" />
            <footer className="text-sm">
              <Skeleton className="h-[25px] w-[75px]" />
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid p-4 gap-6">
          <div className="grid gap-2">
            <Skeleton className="h-8 w-[150px] mx-auto" />
            <Skeleton className="h-4 w-[350px] mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-8 w-[200px]" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-8 w-[200px]" />
            </div>
          </div>

          <div className="grid gap-2">
            <Skeleton className="h-4 w-[40px]" />
            <Skeleton className="h-8 w-[410px]" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-8 w-[410px]" />
          </div>
          <Skeleton className="h-8 w-[410px]" />
          <Skeleton className="h-4 w-[250px] mx-auto" />
        </div>
      </div>
    </div>
    );
}