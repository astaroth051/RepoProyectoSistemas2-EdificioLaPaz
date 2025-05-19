import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import axios from 'axios';

interface ProductoCompra {
    id_productos: number;
    nombre: string;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
    stock: number;
}

interface PageProps {
    codigo_ficha: string;
    productos: ProductoCompra[];
    total: number;
    fecha: string;
    [key: string]: unknown;
}

export default function PlanDePagos() {
    const { codigo_ficha, productos, total, fecha } = usePage<PageProps>().props;

    const [cuotas, setCuotas] = useState<number>(1);
    const [frecuencia, setFrecuencia] = useState<'diario' | 'diaPorMedio' | 'cada3dias'>('diario');
    const [fechasPagos, setFechasPagos] = useState<Date[]>([]);

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth(); // 0-indexed
    const diaActual = hoy.getDate();

    const calcularFechasDePago = () => {
        const fechas: Date[] = [];
        let incremento = 1;

        if (frecuencia === 'diario') incremento = 1;
        else if (frecuencia === 'diaPorMedio') incremento = 2;
        else if (frecuencia === 'cada3dias') incremento = 3;

        let dia = diaActual;
        for (let i = 0; i < cuotas; i++) {
            const fecha = new Date(año, mes, dia);
            if (fecha.getMonth() === mes) {
                fechas.push(fecha);
            }
            dia += incremento;
        }

        setFechasPagos(fechas);
    };

    useEffect(() => {
        calcularFechasDePago();
    }, [cuotas, frecuencia]);

    const esDiaPago = (d: number) => {
        return fechasPagos.some(f => f.getDate() === d && f.getMonth() === mes && f.getFullYear() === año);
    };

    const diasMes = new Date(año, mes + 1, 0).getDate();

    const confirmarPlan = async () => {
        console.log("Enviando a backend:", {
            codigo_ficha,
            productos,
            total,
            fecha,
            cuotas,
            frecuencia
        });
        try {
            const payload = {
                codigo_ficha,
                productos,
                total,
                fecha,
                cuotas,
                frecuencia
            };

            const response = await axios.post('/guardar-venta-con-plan', payload);
            if (response.status === 201) {
                alert("Compra y plan de pagos registrados con éxito.");

                // 🧹 Limpiar localStorage
                localStorage.removeItem("carrito");
                localStorage.removeItem("codigoFicha");
                localStorage.removeItem("totalCompra");

                // 🔁 Redirigir a productos (sin pasar props del carrito)
                router.visit("/productos");
            }
        } catch (error) {
            console.error("Error al guardar el plan de pagos:", error);
            alert("Ocurrió un error al registrar la compra.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen font-sans bg-[#F6F6FA] text-white overflow-x-hidden">
            <Head title="Plan de Pagos" />

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-center mb-8">Bienvenido</h1>
                    <nav className="flex flex-col gap-4 text-sm font-semibold items-center md:items-start">
                        <a href="/dashboard-client" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
                        <a href="/productos" className="hover:text-[#10B981] text-xl">📦 Productos</a>
                        <a href="/caja-de-ahorro" className="hover:text-[#10B981] text-xl">💰 Caja de Ahorro</a>
                    </nav>
                </div>
            </aside>

            {/* Contenido principal */}
            <main className="p-4 sm:p-6 md:p-8 mt-6 overflow-y-auto bg-[#1E3A8A] rounded-lg border-4 border-[#10B981] mx-auto max-w-7xl max-h-[75vh]">
                <p className="text-2xl text-center mb-6 font-semibold text-white">Plan de Pagos Micromarket Edificio La Paz</p>
                <div className="flex flex-wrap justify-center gap-6">

                    {/* Selección de cuotas */}
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col items-center gap-4">
                        <p className="text-[#1E3A8A] text-2xl font-semibold">Cantidad de Cuotas</p>
                        {[1, 2, 3, 4, 5].map(num => (
                            <label key={num} className="w-full text-center text-black">
                                <input
                                    type="radio"
                                    name="cuotas"
                                    value={num}
                                    checked={cuotas === num}
                                    onChange={() => setCuotas(num)}
                                    className="mr-2"
                                />
                                {num} cuota{num > 1 ? 's' : ''}
                            </label>
                        ))}

                        {/* Frecuencia */}
                        <p className="text-[#1E3A8A] text-xl font-semibold mt-4">Frecuencia de Pago</p>
                        {[
                            { value: 'diario', label: 'Cada día' },
                            { value: 'diaPorMedio', label: 'Día por medio' },
                            { value: 'cada3dias', label: 'Cada 3 días' },
                        ].map(opt => (
                            <label key={opt.value} className="text-black">
                                <input
                                    type="radio"
                                    name="frecuencia"
                                    value={opt.value}
                                    checked={frecuencia === opt.value}
                                    onChange={() => setFrecuencia(opt.value as any)}
                                    className="mr-2"
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>

                    {/* Calendario */}
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm">
                        <div className="mb-4 flex justify-between items-center">
                            <span className="font-semibold text-[#1E3A8A] text-2xl">
                                {new Date(año, mes).toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'].map(day => (
                                <span key={day} className="font-semibold text-[#1E3A8A]">{day}</span>
                            ))}
                            {[...Array(diasMes)].map((_, i) => {
                                const dia = i + 1;
                                const seleccionado = esDiaPago(dia);
                                return (
                                    <div
                                        key={dia}
                                        className={`w-9 h-9 font-semibold rounded border-2 flex items-center justify-center
                                            ${seleccionado ? 'bg-white border-[#10B981] text-[#235fb7]' : 'text-black border-gray-200'}`}
                                    >
                                        {dia}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Resumen de Pago */}
                    <div className="bg-white p-6 rounded-lg mt-4 w-full max-w-sm">
                        <h2 className="text-xl font-bold text-center mb-2 text-[#1E3A8A]">Resumen de Pago</h2>
                        <p className="text-black text-center">
                            <strong>Precio Total:</strong> {total.toFixed(2)} Bs
                        </p>
                        <p className="text-black text-center">
                            <strong>Precio por Cuota:</strong> {(total / cuotas).toFixed(2)} Bs
                        </p>
                    </div>

                    {/* Productos en Lista */}
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col items-center gap-3">
                        <label htmlFor="productoslista" className="text-2xl text-[#1E3A8A] font-semibold">Productos en Lista</label>
                        <div className="bg-white rounded-lg">
                            {productos.length > 0 ? (
                                productos.map((item, index) => (
                                    <p key={index} className="text-black text-center">
                                        {item.nombre} - {item.cantidad} unidad{item.cantidad > 1 ? 'es' : ''}
                                    </p>
                                ))
                            ) : (
                                <p className="text-center text-gray-600">No hay productos seleccionados.</p>
                            )}
                        </div>
                    </div>

                    {/* Botón Confirmar */}
                    {/* Botones de acción */}
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm flex justify-between gap-4">
                        <button
                            onClick={() => {
                                localStorage.setItem("carrito", JSON.stringify(productos.map(p => ({
                                    producto: {
                                        id: p.id_productos,
                                        nombre: p.nombre,
                                        precio: p.precio_unitario,
                                        stock: p.stock,
                                    },
                                    cantidad: p.cantidad
                                }))));
                                localStorage.setItem("codigoFicha", codigo_ficha);
                                localStorage.setItem("totalCompra", total.toString());
                                window.location.href = "/productos";
                            }}
                            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-xl text-lg"
                        >
                            ← Editar Carrito
                        </button>

                        <button
                            type="submit"
                            onClick={confirmarPlan}
                            className="bg-[#1E3A8A] hover:bg-[#758dcf] text-white py-3 px-6 rounded-2xl text-lg transition"
                        >
                            Confirmar Plan
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
