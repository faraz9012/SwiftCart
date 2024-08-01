import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreHorizontal, Trash } from "lucide-react";
import { deleteCategoryById } from "./actions";
import { toast } from "sonner";
import {EditCategoryButton} from "./edit-category";

export function RowActions(rowData: any) {
    const data = rowData.row.original;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex p-0 min-w-fit">
                {/* Edit */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div>
                            <EditCategoryButton categoryToEdit={data} />

                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            Edit
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {/* Delete  */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                onClick={async () => {
                                    await deleteCategoryById(data.id)
                                        .then((res) => {
                                            toast.success(res?.message)
                                        })
                                        .catch((err) => {
                                            toast.error(err.message)
                                        });
                                }}>
                                <Trash className="size-4" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}