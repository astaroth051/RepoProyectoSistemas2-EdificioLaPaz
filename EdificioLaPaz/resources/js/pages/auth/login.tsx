import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <AuthLayout title="Ingresa a tu cuenta" description="Ingresa tu email y contraseña para acceder a tu cuenta.">
            <Head title="Inicio de Sesión" />

            {status && (
                <div className="mb-4 rounded-md bg-green-100 px-4 py-2 text-center text-sm font-medium text-green-700 shadow-sm">
                    {status}
                </div>
            )}

            <form className="flex flex-col gap-6 rounded-xl border border-teal-100 bg-white p-6 shadow-md transition-all duration-300 ease-in-out text-black"
                onSubmit={submit}>
                <div className="grid gap-6">
                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#2cb5eb]">Correo electrónico</Label>
                        <Input id="email" type="email" required autoFocus tabIndex={1} autoComplete="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@ejemplo.com" className="rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"/>
                        <InputError message={errors.email} />
                    </div>

                    {/* Password */}
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-[#2cb5eb]">Contraseña</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm text-[#2e937c] hover:underline" tabIndex={5}>
                                    ¿Olvidó la contraseña?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Input id="password" type={showPassword ? 'text' : 'password'} required tabIndex={2} autoComplete="current-password" value={data.password}
                                onChange={(e) => setData('password', e.target.value)} placeholder="••••••••"
                                className="pr-10 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"/>
                            <button type="button" onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none" tabIndex={6}>
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}/>
                        <Label htmlFor="remember" className="text-[#2cb5eb]">Recuérdame</Label>
                    </div>

                    {/* Submit */}
                    <Button variant="customBlue" type="submit" className="mt-4 w-full bg-[#2cb5eb] text-white hover:bg-[#239bcc]" tabIndex={4}
                        disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Iniciar sesión
                    </Button>
                </div>

                {/* Registro */}
                <div className="text-center text-sm text-gray-500">
                    ¿Aún no tienes una cuenta?{' '}
                    <TextLink href={route('register-user')} className="text-[#1B5A4B] hover:underline" tabIndex={5}>
                        Contáctate
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
