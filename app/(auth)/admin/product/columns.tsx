"use client"

import { ArrowUpDown } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import {RowActions} from "./row-actions";

export type Product = {
  id: number
  name: string
  slug?: string
  shortDescription?: string
  longDescription?: string
  price: number
  published: number
  createdOn: string
  updatedOn?: string
  isDeleted: boolean
}

export enum ProductStatus {
  UnPublished = 0,
  Published = 1
}

export const columns = (products:any): ColumnDef<Product>[] => [
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
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium ml-3">${row.original.price}</div>
    },
  },
  {
    accessorKey: "isDeleted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.published;
      const formattedStatus = (status == ProductStatus.Published) ? "Published" : "Unpublished"; 
 
      return <Badge variant={status == ProductStatus.Published ? "default" : "destructive"}>{formattedStatus}</Badge>
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
