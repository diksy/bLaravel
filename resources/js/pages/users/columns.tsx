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
import { Link, router } from "@inertiajs/react"
import users from "@/routes/users"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: number
  name: string
  email: string
  email_verified_at: string
  role: "Administrator" | "Guest"
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      return row.index + 1;
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "email_verified_at",
    header: "Verification",
    cell: ({ row }) => {
      if (row.getValue("email_verified_at") == null) {
        return <span className="text-red-600">not verified</span>;
      } else {
        const tmp = new Date(row.getValue("email_verified_at"));
        return <span className="text-green-600">{tmp.toLocaleDateString("id-ID")}</span>;
      }
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{row.getValue("name")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={users.edit(row.getValue("id"))}>Edit</Link></DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              if(confirm("Are you sure want to remove " + row.getValue("name") + "?")) {
                router.delete(users.destroy(row.getValue("id")));
              }
            }}>Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]
