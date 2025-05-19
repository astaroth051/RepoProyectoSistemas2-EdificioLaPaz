import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Head, router } from '@inertiajs/react';

interface Copropietario {
    nombre: string;
    departamento: string;
    email: string;
    telefono: string;
    carnet: string;
    estado: string;
}

interface Administrador {
    nombre: string;
    telefono: string;
    correo: string;
    horario: string;
}

interface Estadisticas {
    totalGasto: number;
    cantidadCompras: number;
}

const DashboardClient: React.FC = () => {
    const [copropietario, setCopropietario] = useState<Copropietario | null>(null);
    const [admin, setAdmin] = useState<Administrador | null>(null);
    const [estadisticas, setEstadisticas] = useState<Estadisticas>({ totalGasto: 0, cantidadCompras: 0 });

    const handleLogout = () => {
        router.post('/logout');
    };

    useEffect(() => {
        // Copropietario
        fetch('/copropietario/obtener', { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => setCopropietario(data))
            .catch((err) => console.error('Error copropietario:', err.message));

        // Administrador
        fetch('/admin-micromarket/obtener', { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => setAdmin(data))
            .catch((err) => console.error('Error administrador:', err.message));

        // Estadísticas generales
        fetch('/estadisticas/cliente', { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => setEstadisticas(data))
            .catch((err) => console.error('Error estadísticas:', err.message));

        // Gráfico de gastos diarios
        fetch('/estadisticas/gastos-diarios', { credentials: 'include' })
            .then((res) => res.json())
            .then((data) => {
                const ctx = document.getElementById('gastosChart') as HTMLCanvasElement | null;
                let chartInstance: Chart | null = null;

                if (ctx) {
                    const labels = data.map((d: any) => d.dia);
                    const values = data.map((d: any) => d.total);

                    chartInstance = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Gastos por día (Bs)',
                                    data: values,
                                    backgroundColor: '#10B981',
                                    borderRadius: 6,
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    labels: {
                                        color: '#FFFFFF',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: { color: '#FFFFFF' },
                                },
                                y: {
                                    ticks: { color: '#FFFFFF' },
                                },
                            },
                        },
                    });
                }

                return () => {
                    if (chartInstance) chartInstance.destroy();
                };
            })
            .catch((err) => console.error('Error gráfico:', err.message));
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            <Head title="Panel Cliente" />

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-center mb-8">Bienvenido</h1>
                    <nav className="flex flex-col gap-4 text-sm font-semibold items-center md:items-start">
                        <a href="/productos" className="hover:text-[#10B981] text-xl">📦 Productos</a>
                        {/*<a href="/plan-de-pagos" className="hover:text-[#10B981] text-xl">📋 Plan de Pagos</a>*/}
                        <a href="/caja-de-ahorro" className="hover:text-[#10B981] text-xl">💰 Caja de Ahorro</a>
                        <button
                            onClick={handleLogout}
                            className="hover:text-[#10B981] text-xl text-left w-full text-start"
                        >
                            🚪 Cerrar Sesión
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] text-center mb-6">
                    Micromarket Edificio La Paz
                </h1>

                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    {/* Información Personal */}
                    <div className="flex-1 bg-white border-2 border-[#10B981] rounded-xl p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl text-[#1E3A8A] text-center font-semibold mb-4">
                            Información Personal
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" alt="Foto" className="w-24 h-24 rounded-full" />
                            <div className="text-sm text-[#1E3A8A] space-y-1 text-center sm:text-left">
                                {copropietario ? (
                                    <>
                                        <p><strong>Nombre:</strong> {copropietario.nombre}</p>
                                        <p><strong>Departamento:</strong> {copropietario.departamento}</p>
                                        <p><strong>Email:</strong> {copropietario.email}</p>
                                        <p><strong>Teléfono:</strong> {copropietario.telefono}</p>
                                    </>
                                ) : (
                                    <p>Cargando información del copropietario...</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Información Administrador */}
                    <div className="flex-1 bg-white border-2 border-[#10B981] rounded-xl p-4 sm:p-6 text-center">
                        <h2 className="text-lg sm:text-xl text-[#1E3A8A] font-semibold mb-4">
                            Información Administrador
                        </h2>
                        {admin ? (
                            <div className="text-black space-y-1">
                                <p><strong>Nombre:</strong> {admin.nombre}</p>
                                <p><strong>Horario Micromarket:</strong> {admin.horario}</p>
                                <p><strong>Teléfono:</strong> {admin.telefono}</p>
                                <p><strong>Correo:</strong> {admin.correo}</p>
                            </div>
                        ) : (
                            <p>Cargando información del administrador...</p>
                        )}
                    </div>
                </div>

                {/* Gráfico */}
                <div className="bg-[#1E3A8A] rounded-xl p-4 sm:p-6 mb-6 text-white h-[300px] sm:h-[400px] overflow-hidden">
                    <h2 className="text-lg font-bold mb-4">Gráfico de Gastos</h2>
                    <div className="w-full h-full relative">
                        <canvas id="gastosChart" className="absolute top-0 left-0 w-full h-full" />
                    </div>
                </div>

                {/* Resumen */}
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 bg-white border-2 border-[#10B981] rounded-xl p-4 text-center">
                        <h2 className="text-lg text-[#1E3A8A] font-semibold mb-2">Gastos del Mes</h2>
                        <p className="text-2xl font-bold text-[#1E3A8A]">
                            Bs {Number(estadisticas.totalGasto || 0).toFixed(2)}
                        </p>
                    </div>
                    <div className="flex-1 bg-white border-2 border-[#10B981] rounded-xl p-4 text-center">
                        <h2 className="text-lg text-[#1E3A8A] font-semibold mb-2">Compras del Mes</h2>
                        <p className="text-2xl font-bold text-[#1E3A8A]">
                            {estadisticas.cantidadCompras}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardClient;
