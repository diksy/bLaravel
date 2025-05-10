import { columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/users',
    },
];

export default function UserPage({ data }: { data: any }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Users" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="relative min-h-[100vh] flex-1 overflow-hidden md:min-h-min">
                <DataTable columns={columns} data={data} createURL="/users/create" searchID="name" />
            </div>
        </div>
    </AppLayout>
  )
}
