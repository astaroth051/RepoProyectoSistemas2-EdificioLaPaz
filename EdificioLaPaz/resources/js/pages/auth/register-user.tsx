import { Head, usePage, Link } from '@inertiajs/react';
import React from 'react';

interface AdminEdificio {
  name: string;
  lastname: string;
  email: string;
  telefono: string;
}

const RegisterUser = () => {
const { admin } = usePage().props as unknown as { admin: AdminEdificio };

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

                         <div className="flex-1 bg-white border-2 border-[#10B981] rounded-xl p-4 sm:p-6 text-center">
                            <h2 className="text-lg sm:text-xl text-[#1E3A8A] font-semibold mb-4">
                                Información Administrador Del Edificio
                            </h2>
                            <div>
                                <p><strong>Nombre:</strong> {admin.name}</p>
                                <p><strong>Apellido:</strong> {admin.lastname}</p>
                                <p><strong>Teléfono:</strong> {admin.telefono}</p>
                                <p><strong>Correo:</strong> {admin.email}</p>
                            </div>
                        </div>
                         <div className="mt-6">
                            <Link href="/" className="inline-block px-6 py-2 text-white bg-[#10B981] hover:bg-[#059669] rounded-lg shadow transition duration-200">
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                    <div className="relative w-full lg:w-[438px] bg-gradient-to-tr from-teal-200 via-green-200 to-blue-100 rounded-t-lg lg:rounded-tr-lg lg:rounded-l-none shadow-inner">
                        <img src="/images/LogoMarket.png" alt="Micromarket"
                            className="w-full h-full object-cover rounded-t-lg lg:rounded-tr-lg"/>
                    </div>
                </main>
            </div>
        </>
    );
}

export default RegisterUser;