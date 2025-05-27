import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Head } from '@inertiajs/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Chart.register(...registerables);

interface Copropietario {
    nombre: string;
    saldo: number;
    seguro: number;
}

interface Movimiento {
    compra: string;
    producto: string;
    fecha: string;
    cantidad: number;
    precioTotal: number;
}

const CajaDeAhorro: React.FC = () => {
    const [copropietario, setCopropietario] = useState<Copropietario | null>(null);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [movFiltrados, setMovFiltrados] = useState<Movimiento[]>([]);
    const [filtro, setFiltro] = useState<'semana' | 'mes'>('semana');
    const [mes, setMes] = useState<number>(new Date().getMonth());
    const [anio, setAnio] = useState<number>(new Date().getFullYear());

    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        fetch('/caja-ahorro/obtener', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setCopropietario(data))
            .catch(err => console.error('Error copropietario:', err.message));

        fetch('/caja-ahorro/movimientos', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setMovimientos(data);
            })
            .catch(err => console.error('Error movimientos:', err.message));
    }, []);

    useEffect(() => {
        aplicarFiltro();
    }, [filtro, mes, anio, movimientos]);

    useEffect(() => {
        // Actualizar gráfico cuando cambien los movimientos filtrados
        if (movFiltrados.length > 0) {
            actualizarGrafico();
        }
    }, [movFiltrados, filtro]);

    const aplicarFiltro = () => {
        console.log('Aplicando filtro:', { filtro, mes, anio });
        console.log('Total movimientos:', movimientos.length);

        const ahora = new Date();

        const resultados = movimientos.filter(m => {
            let fechaMovimiento;
            try {
                // Para datetime de base de datos, crear fecha directamente
                fechaMovimiento = new Date(m.fecha);

                // Si la fecha es inválida, intentar otros formatos
                if (isNaN(fechaMovimiento.getTime())) {
                    // Intentar parseando como string
                    if (typeof m.fecha === 'string') {
                        const fechaStr = m.fecha.replace(' ', 'T'); // Convertir datetime a ISO
                        fechaMovimiento = new Date(fechaStr);
                    }
                }

                // Verificar si la fecha es válida
                if (isNaN(fechaMovimiento.getTime())) {
                    console.warn('Fecha inválida:', m.fecha);
                    return false;
                }

            } catch (error) {
                console.error('Error parseando fecha:', m.fecha, error);
                return false;
            }

            console.log('Comparando fecha:', {
                compra: m.compra,
                original: m.fecha,
                parseada: fechaMovimiento.toLocaleDateString(),
                año: fechaMovimiento.getFullYear(),
                mes: fechaMovimiento.getMonth() + 1, // +1 para mostrar mes humano
                mesSeleccionado: mes + 1
            });

            if (filtro === 'mes') {
                // Filtrar por mes y año seleccionados
                const añoMovimiento = fechaMovimiento.getFullYear();
                const mesMovimiento = fechaMovimiento.getMonth();

                const coincide = añoMovimiento === anio && mesMovimiento === mes;
                console.log('Filtro mes:', {
                    añoMovimiento,
                    mesMovimiento: mesMovimiento + 1,
                    anio,
                    mes: mes + 1,
                    coincide,
                    producto: m.producto
                });

                return coincide;
            } else {
                // Filtrar por semana actual (lunes a domingo)
                const diaSemana = ahora.getDay() === 0 ? 7 : ahora.getDay();
                const inicioSemana = new Date(ahora);
                inicioSemana.setDate(ahora.getDate() - diaSemana + 1);
                inicioSemana.setHours(0, 0, 0, 0);

                const finSemana = new Date(inicioSemana);
                finSemana.setDate(inicioSemana.getDate() + 6);
                finSemana.setHours(23, 59, 59, 999);

                return fechaMovimiento >= inicioSemana && fechaMovimiento <= finSemana;
            }
        });

        console.log('Movimientos filtrados:', resultados.length);
        console.log('Detalles filtrados:', resultados.map(r => ({
            compra: r.compra,
            fecha: r.fecha,
            total: r.precioTotal
        })));
        setMovFiltrados(resultados);
    };

    const procesarDatosGrafico = () => {
        if (filtro === 'semana') {
            // Para semana: agrupar por días de la semana
            const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            const gastosPorDia = new Array(7).fill(0);

            movFiltrados.forEach(m => {
                const fecha = new Date(m.fecha);
                const diaSemana = fecha.getDay();
                const diaIndex = diaSemana === 0 ? 6 : diaSemana - 1; // Convertir domingo (0) a índice 6
                gastosPorDia[diaIndex] += m.precioTotal;
            });

            return {
                labels: diasSemana,
                data: gastosPorDia,
                title: 'Gastos de la Semana Actual'
            };
        } else {
            // Para mes: agrupar por semanas del mes
            const semanas = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'];
            const gastosPorSemana = new Array(5).fill(0);

            movFiltrados.forEach(m => {
                const fecha = new Date(m.fecha);
                const diaDelMes = fecha.getDate();
                const semanaIndex = Math.min(Math.floor((diaDelMes - 1) / 7), 4);
                gastosPorSemana[semanaIndex] += m.precioTotal;
            });

            // Filtrar semanas que no tienen datos
            const semanasConDatos = semanas.filter((_, i) => gastosPorSemana[i] > 0);
            const datosConDatos = gastosPorSemana.filter(gasto => gasto > 0);

            return {
                labels: semanasConDatos.length > 0 ? semanasConDatos : ['Sin datos'],
                data: datosConDatos.length > 0 ? datosConDatos : [0],
                title: `Gastos de ${new Date(anio, mes).toLocaleString('es-BO', { month: 'long', year: 'numeric' })}`
            };
        }
    };

    const actualizarGrafico = () => {
        const ctx = document.getElementById('gastosChart') as HTMLCanvasElement;
        if (!ctx) return;

        // Destruir gráfico anterior si existe
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // No mostrar gráfico si no hay datos
        if (movFiltrados.length === 0) {
            return;
        }

        const datosGrafico = procesarDatosGrafico();

        chartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: datosGrafico.labels,
                datasets: [{
                    label: "Gastos en Bs",
                    data: datosGrafico.data,
                    backgroundColor: "#1E3A8A",
                    borderRadius: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: datosGrafico.title,
                        color: '#1E3A8A',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        labels: { color: "#1E3A8A" },
                    },
                },
                scales: {
                    x: {
                        ticks: { color: "#1E3A8A" },
                        grid: { color: "rgba(30,58,138,0.1)" }
                    },
                    y: {
                        ticks: { color: "#1E3A8A" },
                        grid: { color: "rgba(30,58,138,0.1)" },
                        beginAtZero: true
                    },
                },
            },
        });
    };

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Reporte de Caja de Ahorro", 70, 20);
        doc.setFontSize(12);
        doc.text(`Nombre: ${copropietario?.nombre}`, 20, 30);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 40);
        doc.text(`Tipo de Filtro: ${filtro === 'semana' ? 'Semana actual' : `Mes ${mes + 1} / ${anio}`}`, 20, 50);

        const datosTabla = movFiltrados.map(m => [
            m.compra,
            m.producto,
            m.fecha,
            m.cantidad,
            `${m.precioTotal} Bs`
        ]);

        autoTable(doc, {
            head: [["Compra", "Producto", "Fecha", "Cantidad", "Total"]],
            body: datosTabla,
            startY: 60,
        });

        doc.save("reporte-caja-ahorro.pdf");
    };

    const calcularTotalGastos = () => {
        return movFiltrados.reduce((total, m) => total + m.precioTotal, 0);
    };

    if (!copropietario) return <div className="text-black">Cargando...</div>;

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            <Head title="Caja de Ahorro" />
            <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-center mb-8">Bienvenido</h1>
                    <nav className="flex flex-col gap-4 text-sm font-semibold items-center md:items-start">
                        <a href="/dashboard-client" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
                        <a href="/productos" className="hover:text-[#10B981] text-xl">📦 Productos</a>
                        <a href="/plan-de-pagos" className="hover:text-[#10B981] text-xl">📋 Plan de Pagos</a>
                    </nav>
                </div>
            </aside>

            <main className="flex-1 p-6 md:p-10 bg-white text-black">
                <div className="bg-[#1E3A8A] p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto border-[#10B981] border-4 text-white">
                    <h1 className="text-2xl font-bold text-center mb-6">Caja de Ahorro - Edificio La Paz</h1>

                    <div className="bg-white p-8 rounded-2xl shadow-2xl mb-10 w-full max-w-3xl mx-auto text-center border-4 border-[#21983f] hover:scale-105 transition-transform duration-300">
                        <div className="flex flex-col items-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" alt="Foto" className="w-24 h-24 rounded-full mb-4 border-4 border-[#21983f] shadow-lg" />
                            <p className="text-2xl font-bold text-blue-500 mb-4">Caja de Ahorro</p>
                            <div className="text-blue-500 text-sm space-y-2">
                                <p><span className="font-semibold text-black">Nombre:</span> {copropietario.nombre}</p>
                                <p><span className="font-semibold text-black">Saldo:</span> {copropietario.saldo} Bs</p>
                                <p><span className="font-semibold text-black">Seguro:</span> {copropietario.seguro} Bs</p>
                            </div>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-blue-900">
                        <h2 className="text-xl font-semibold mb-4">🔎 Filtros de Reporte</h2>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="semana"
                                    checked={filtro === 'semana'}
                                    onChange={() => setFiltro('semana')}
                                    className="mr-2"
                                />
                                <span>Semana actual</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="mes"
                                    checked={filtro === 'mes'}
                                    onChange={() => setFiltro('mes')}
                                    className="mr-2"
                                />
                                <span>Mes específico</span>
                            </label>
                        </div>

                        {filtro === 'mes' && (
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium mb-1">Mes:</label>
                                    <select
                                        value={mes}
                                        onChange={(e) => setMes(parseInt(e.target.value))}
                                        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {[...Array(12)].map((_, i) => (
                                            <option key={i} value={i}>
                                                {new Date(0, i).toLocaleString('es-BO', { month: 'long' })}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium mb-1">Año:</label>
                                    <input
                                        type="number"
                                        value={anio}
                                        onChange={(e) => setAnio(parseInt(e.target.value))}
                                        min="2020"
                                        max="2030"
                                        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <button
                                onClick={exportarPDF}
                                className="bg-[#21983f] text-white py-2 px-6 rounded-lg hover:bg-[#1b7f35] transition"
                            >
                                Generar Reporte PDF
                            </button>
                            <div className="text-sm">
                                <p className="text-gray-600">
                                    {filtro === 'semana'
                                        ? 'Semana actual (Lunes a Domingo)'
                                        : `${new Date(anio, mes).toLocaleString('es-BO', { month: 'long', year: 'numeric' })}`
                                    }
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {movFiltrados.length} movimiento{movFiltrados.length !== 1 ? 's' : ''} encontrado{movFiltrados.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="bg-white p-6 rounded-lg shadow-lg text-blue-900 mb-6">
                        <h2 className="text-xl font-semibold mb-4">📄 Historial Filtrado</h2>
                        <div className="hidden sm:grid grid-cols-5 gap-4 font-bold border-b border-black pb-2">
                            <span>Compra</span>
                            <span>Producto</span>
                            <span>Fecha</span>
                            <span>Cantidad</span>
                            <span>Total</span>
                        </div>
                        {movFiltrados.length > 0 ? (
                            movFiltrados.map((m, i) => (
                                <div key={i} className="grid grid-cols-1 sm:grid-cols-5 gap-y-4 gap-x-2 mt-4 border-b border-gray-300 py-4">
                                    <p className="sm:hidden font-semibold">Compra:</p>
                                    <p>{m.compra}</p>
                                    <p className="sm:hidden font-semibold">Producto:</p>
                                    <p>{m.producto}</p>
                                    <p className="sm:hidden font-semibold">Fecha:</p>
                                    <p>{new Date(m.fecha).toLocaleDateString('es-BO')}</p>
                                    <p className="sm:hidden font-semibold">Cantidad:</p>
                                    <p>{m.cantidad}</p>
                                    <p className="sm:hidden font-semibold">Total:</p>
                                    <p className="font-semibold text-[#21983f]">{m.precioTotal} Bs</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 mt-8 p-8">
                                <p className="text-lg">📊 No hay movimientos en este período</p>
                                <p className="text-sm mt-2">
                                    {filtro === 'semana'
                                        ? 'No se registraron compras esta semana'
                                        : `No se registraron compras en ${new Date(anio, mes).toLocaleString('es-BO', { month: 'long', year: 'numeric' })}`
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CajaDeAhorro;
