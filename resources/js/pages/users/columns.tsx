"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table-header"

export type User = {
  id: number
  name: string
  email: string
  email_verified_at: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => {
      return <span>{row.index + 1}.</span>
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "email_verified_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verification" />
    ),
    cell: ({ row }) => {
      let tmp: string = row.getValue("email_verified_at")
      if (tmp) {
        tmp = (new Date(tmp)).toLocaleDateString("id-ID")
        return <span className="text-green-600">{tmp}</span>
      } else {
        return <span className="text-gray-400">unverified</span>
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id.toString())}>Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
