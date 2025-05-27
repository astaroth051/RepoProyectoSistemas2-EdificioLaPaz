import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-svh w-full bg-gradient-to-br from-[#e0f7ed] via-[#c6efe1] to-[#a7e9d1] flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                                <img src="/images/LogoMarket.png" alt="Logo" className="h-10 w-10" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-1 text-center">
                            <h1 className="text-2xl font-bold text-[#1b5a4b]">{title}</h1>
                            <p className="text-sm text-[#4a4a4a]">{description}</p>
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
