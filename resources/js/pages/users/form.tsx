import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/users',
    },
    {
        title: 'Create New User',
        href: '/users/create',
    },
];

type User = {
    message: string;
    name: string;
    email: string;
    password: string;
    confirmation: string;
    email_verified_at: string;
}

export default function UserForm({ user }: { user: any }) {
    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm<Required<User>>(user);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.password != data.confirmation) {
            alert("Password confirmation is not valid.");
            return false;
        }
        if (user.id > 0) {
            put(route('users.update', user.id), {
                preserveScroll: true,
            });
        } else {
            post(route('users.store'), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden md:min-h-min">
                    <div className="space-y-6">
                        {errors.message && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{errors.message}</AlertDescription>
                            </Alert>
                        )}
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name *</Label>
    
                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="Required"
                                />
    
                                <InputError className="mt-2" message={errors.name} />
                            </div>
    
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email *</Label>
    
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="Required"
                                />
    
                                <InputError className="mt-2" message={errors.email} />
                            </div>
    
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
    
                                <Input
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required={user.id > 0 ? false : true}
                                    placeholder={user.id > 0 ? "Leave blank if not change" : "Required"}
                                />
    
                                <InputError className="mt-2" message={errors.password} />
                            </div>
    
                            <div className="grid gap-2">
                                <Label htmlFor="confirmation">Password Confirmation</Label>
    
                                <Input
                                    id="confirmation"
                                    type="password"
                                    className="mt-1 block w-full"
                                    value={data.confirmation}
                                    onChange={(e) => setData('confirmation', e.target.value)}
                                    required={user.id > 0 ? false : true}
                                    placeholder={user.id > 0 ? "Leave blank if not change" : "Required"}
                                />
    
                                <InputError className="mt-2" message={errors.confirmation} />
                            </div>
    
                            <div className="grid gap-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="verification"
                                        checked={data.email_verified_at?.length > 0}
                                        onCheckedChange={() => setData("email_verified_at", data.email_verified_at?.length > 0 ? "" : "now")}
                                    />
                                    <label htmlFor="verification" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Verified
                                    </label>
                                </div>
    
                                <InputError className="mt-2" message={errors.email_verified_at} />
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save</Button>
    
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Saved</p>
                                </Transition>

                                <Link href="/users">
                                    <Button variant="outline">Back</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
