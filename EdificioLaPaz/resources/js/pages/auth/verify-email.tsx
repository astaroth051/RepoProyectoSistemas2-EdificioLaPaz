import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Verificación de correo">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet"/>
            </Head>

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-teal-100 to-blue-50 p-6">
                <div className="w-full max-w-md rounded-xl bg-white shadow-xl border border-teal-200 p-8 text-center">
                    <img src="/images/LogoMarket.png" alt="Micromarket" className="mx-auto mb-6 h-16"/>
                    <h1 className="mb-4 text-2xl font-semibold text-teal-700">
                        Verificación de correo electrónico
                    </h1>
                    <p className="mb-6 text-gray-600">
                        Por favor, verifica tu correo electrónico haciendo clic en el enlace que te enviamos.
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 rounded bg-green-100 px-4 py-2 text-green-700">
                            Se ha enviado un nuevo enlace de verificación a tu correo.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <Button type="submit" disabled={processing} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin mr-2 inline" />
                            )}
                            Reenviar correo de verificación
                        </Button>
                    </form>

                    <div className="mt-6 text-sm text-gray-600">
                        <TextLink href={route('logout')} method="post" className="text-teal-600 hover:underline">
                            Cerrar sesión
                        </TextLink>
                    </div>
                </div>
            </div>
        </>
    );
}
