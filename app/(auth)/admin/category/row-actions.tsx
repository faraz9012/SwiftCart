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
import { EditCategoryButton } from "./edit-category";
import type { Category } from "./columns";

export function RowActions({ row, categories }: { row: any; categories: Category[] }) {
    const data = row.original;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex items-center gap-1 p-1 min-w-fit">
                {/* Edit */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="inline-flex">
                                <EditCategoryButton categoryToEdit={data} categories={categories} />
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            Edit
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {/* Delete  */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={async () => {
                                    await deleteCategoryById(data.id)
                                        .then((res) => {
                                            toast.success(res?.message)
                                        })
                                        .catch((err) => {
                                            toast.error(err.message)
                                        });
                                }}
                            >
                                <Trash className="size-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
