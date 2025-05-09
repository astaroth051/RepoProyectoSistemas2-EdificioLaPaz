import { Head } from '@inertiajs/react';

export default function RegisterUser() {
    return (
        <>
            <Head title="Registro de Usuario - Micromarket La Paz">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-green-50 via-teal-100 to-blue-50 text-gray-800 lg:justify-center p-6 lg:p-8">
                <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                    <div className="flex-1 rounded-b-lg bg-white p-6 shadow-lg lg:rounded-l-lg lg:rounded-b-none lg:p-12">
                        <h1 className="text-2xl font-semibold text-teal-700 mb-2">Registro no disponible</h1>
                        <p className="mb-4 text-gray-600">
                            Para registrarte en el sistema, por favor contacta al administrador del edificio. Él se encargará de crear tu cuenta.
                        </p>

                        <div className="space-y-2 text-sm text-gray-700">
                            <p><strong>Administrador:</strong> Juan Pérez</p>
                            <p><strong>Teléfono:</strong> +591 71234567</p>
                            <p><strong>Email:</strong> administrador@edificio.com</p>
                            <p><strong>Horario de atención:</strong> Lunes a Viernes, 08:00 – 17:00</p>
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
