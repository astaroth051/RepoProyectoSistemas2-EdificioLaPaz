import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Recuperación contraseña">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-teal-100 to-blue-50 p-6 text-black">
                <div className="w-full max-w-md rounded-xl bg-white shadow-xl border border-teal-200 p-8">
                    <div className="mb-6 text-center">
                        <img src="/images/LogoMarket.png" alt="Micromarket" className="h-16 mx-auto mb-4" />
                        <h1 className="text-2xl font-semibold text-teal-700">Recuperar contraseña</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Ingresa tu correo electrónico para recibir un enlace de restablecimiento de contraseña.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 rounded bg-green-100 px-4 py-2 text-center text-sm font-medium text-green-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Dirección email</Label>
                            <Input id="email" type="email" name="email" autoComplete="off" value={data.email} autoFocus placeholder="email@example.com"
                                onChange={(e) => setData('email', e.target.value)} className="mt-1"/>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Enviar enlace de restablecimiento
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-black">
                        <span>Retornar </span>
                        <TextLink href={route('login')} className='text-gray-500'>Iniciar sesión</TextLink>
                    </div>
                </div>
            </div>
        </>
    );
}
