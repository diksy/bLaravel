import AppLayout from "@/layouts/app-layout"
import { columns, User } from "./columns"
import { DataTable } from "@/components/data-table"
import { BreadcrumbItem } from "@/types";
import users from "@/routes/users";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User List',
        href: users.index().url,
    },
];

export default function UserPage({ data }: { data: any }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User List" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden md:min-h-min">
          <DataTable columns={columns} data={data} menus={(
            <Link href={users.create()}><Button variant="outline">Add New</Button></Link>
          )} />
        </div>
      </div>
    </AppLayout>
  )
}
