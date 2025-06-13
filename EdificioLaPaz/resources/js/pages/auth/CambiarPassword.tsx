import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react'; // Importar el ícono LoaderCircle

import InputError from '@/components/input-error'; // Asumiendo que este componente ya existe y es como en la primera página
import { Button } from '@/components/ui/button'; // Componente de botón de Shadcn UI
import { Input } from '@/components/ui/input'; // Componente de input de Shadcn UI
import { Label } from '@/components/ui/label'; // Componente de label de Shadcn UI
import AuthLayout from '@/layouts/auth-layout'; // Asumiendo que este layout existe y es el mismo de la primera página

interface Props {
    modo?: 'forzado' | 'recuperacion';
}

const CambiarPassword = ({ modo = 'recuperacion' }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/cambiar-contrasena', {
            onSuccess: () => {
                console.log('Contraseña cambiada exitosamente');
                // Inertia manejará automáticamente la redirección del controlador
            },
            onError: (errors) => {
                console.log('Errores:', errors);
            },
        });
    };

    return (
        <AuthLayout
            title={modo === 'forzado' ? 'Primera vez: cambia tu contraseña' : 'Cambiar Contraseña'}
            description="Por favor, ingrese su nueva contraseña."
        >
            <Head title="Cambiar Contraseña" />

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 text-black">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Nueva contraseña"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirmar Contraseña"
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <Button type="submit" className="mt-4 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Cambiar contraseña
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default CambiarPassword;
