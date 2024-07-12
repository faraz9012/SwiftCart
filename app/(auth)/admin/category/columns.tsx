"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

import { ArrowUpDown } from "lucide-react";
import {RowActions} from "./row-actions";

export type Category = {
  id: number
  name: string
  slug?: string
  description?: string
  image?: string
  parentCategoryId: number
  published: number
  createdOn: string
  updatedOn?: string
}

const useParentCategoryName = (categories: Category[], parentCategoryId: number) => {
  const parentCategory = categories.find(category => category.id === parentCategoryId);
  return parentCategory ? parentCategory.name : "---";
};

export const columns = (categories:any): ColumnDef<Category>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <>
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
      <span className="sr-only">Select all rows</span>
      </>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "parentCategoryId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Parent category
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const parentCategoryId = parseFloat(row.getValue("parentCategoryId"));
      const parentCategoryName = useParentCategoryName(categories, parentCategoryId);
      return <div className="font-medium">{parentCategoryName}</div>;
    },
  },
  {
    accessorKey: "published",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = parseFloat(row.getValue("published"));
      const formattedStatus = (status == 1) ? "Published" : "Unpublished"; 
 
      return <div className="font-medium">{formattedStatus}</div>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <RowActions row={row} />
      )
    },
  },
]
