import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset password">
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
                        <h1 className="text-2xl font-semibold text-teal-700">Restablecer contraseña</h1>
                        <p className="text-sm text-gray-600 mt-1">Por favor, ingresa tu nueva contraseña</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input id="email" type="email" name="email" value={data.email} readOnly 
                            onChange={(e) => setData('email', e.target.value)} className="mt-1"/>
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="password">Nueva contraseña</Label>
                            <Input id="password" type="password" name="password" value={data.password}
                                onChange={(e) => setData('password', e.target.value)} autoFocus placeholder="********" className="mt-1"/>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                            <Input id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)} placeholder="********" className="mt-1"/>
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>

                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-4" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Restablecer contraseña
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
