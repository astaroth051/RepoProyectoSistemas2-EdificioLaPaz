import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Micromarket La Paz">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet"/>
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-green-50 via-teal-100 to-blue-50 text-gray-800 lg:justify-center p-6 lg:p-8">
                <header className="mb-6 w-full max-w-[335px] lg:max-w-4xl text-sm">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded px-5 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700"
                            >
                                Ir al Panel
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded px-5 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Iniciar sesión
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                    <div className="flex-1 rounded-b-lg bg-white p-6 shadow-lg lg:rounded-l-lg lg:rounded-b-none lg:p-12">
                        <h1 className="text-2xl font-semibold text-teal-700 mb-2">Bienvenido a MicroMarket La Paz</h1>
                        <p className="mb-4 text-gray-600">
                            Tu tienda de confianza con productos frescos, orgánicos y autoservicio. Compra de forma rápida, segura y eficiente.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>🛒 Compra sin filas</li>
                            <li>🌱 Productos sostenibles</li>
                            <li>💳 Paga desde tu celular</li>
                        </ul>
                        <div className="mt-6">
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded bg-teal-500 px-6 py-2 text-white hover:bg-teal-600"
                            >
                                Explorar tienda
                            </Link>
                        </div>
                    </div>
                    <div className="relative w-full lg:w-[438px] bg-gradient-to-tr from-teal-200 via-green-200 to-blue-100 rounded-t-lg lg:rounded-tr-lg lg:rounded-l-none shadow-inner">
                        <img
                            src="/images/LogoMarket.png"
                            alt="Micromarket"
                            className="w-full h-full object-cover rounded-t-lg lg:rounded-tr-lg"
                        />
                    </div>
                </main>
            </div>
        </>
    );
}
