import { Head, router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

interface Copropietario {
    id: number;
    nombre: string;
    apellido: string;
    departamento?: string;
    correo: string;
    estado: number;
}

interface PageProps {
    copropietarios?: Copropietario[];
}

export default function GestionCopropietarios({ copropietarios = [] }: PageProps) {

    console.log('Datos recibidos:', copropietarios);
    console.log('Cantidad de copropietarios:', copropietarios.length);

    // Debug: verificar los estados de los copropietarios
    console.log('Estados de copropietarios:', copropietarios.map(c => ({ id: c.id, nombre: c.nombre, estado: c.estado })));

    const [busqueda, setBusqueda] = useState("");
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [copropietarioAEliminar, setCopropietarioAEliminar] = useState<number | null>(null);
    const [mostrarModalReactivar, setMostrarModalReactivar] = useState(false);
    const [copropietarioAReactivar, setCopropietarioAReactivar] = useState<number | null>(null);
    const [mostrarEliminados, setMostrarEliminados] = useState(false);

    // Filtrar copropietarios según estado y búsqueda
    const copropietariosFiltrados = copropietarios
        .filter((c) => {
            // Debug: log cada filtro
            console.log(`Copropietario ${c.nombre}: estado=${c.estado}, mostrarEliminados=${mostrarEliminados}`);

            // Convertir a número por si acaso viene como string
            const estado = Number(c.estado);

            if (mostrarEliminados) {
                return estado === 0; // Mostrar eliminados/inactivos
            } else {
                return estado === 1; // Mostrar activos
            }
        })
        .filter((c) => {
            const termino = busqueda.toLowerCase();
            return (
                c.nombre.toLowerCase().includes(termino) ||
                c.apellido.toLowerCase().includes(termino)
            );
        })
        .sort((a, b) => {
            const nombreCompletoA = `${a.apellido} ${a.nombre}`.toLowerCase();
            const nombreCompletoB = `${b.apellido} ${b.nombre}`.toLowerCase();
            return nombreCompletoA.localeCompare(nombreCompletoB);
        });

    // Debug: log copropietarios filtrados
    console.log('Copropietarios filtrados:', copropietariosFiltrados);

    // Confirmar eliminación - abrir modal
    const confirmarEliminacion = (id: number) => {
        setCopropietarioAEliminar(id);
        setMostrarModalEliminar(true);
    };

    // Confirmar reactivación - abrir modal
    const confirmarReactivacion = (id: number) => {
        setCopropietarioAReactivar(id);
        setMostrarModalReactivar(true);
    };

    // Función para eliminar copropietario
    const eliminarCopropietario = async () => {
        if (copropietarioAEliminar === null) return;

        try {
            const response = await fetch(`/copropietarios/${copropietarioAEliminar}/desactivarUsuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
                },
            });

            const data = await response.json();

            if (data.success) {
                window.location.reload();
            } else {
                alert("No se pudo eliminar el copropietario.");
            }
        } catch (error) {
            console.error("Error eliminando:", error);
            alert("Ocurrió un error al eliminar.");
        } finally {
            setMostrarModalEliminar(false);
            setCopropietarioAEliminar(null);
        }
    };

    // Función para reactivar copropietario
    const reactivarCopropietario = async () => {
        if (copropietarioAReactivar === null) return;

        try {
            const response = await fetch(`/copropietarios/${copropietarioAReactivar}/reactivarUsuario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
                },
            });

            const data = await response.json();

            if (data.success) {
                window.location.reload();
            } else {
                alert("No se pudo reactivar el copropietario.");
            }
        } catch (error) {
            console.error("Error reactivando:", error);
            alert("Ocurrió un error al reactivar.");
        } finally {
            setMostrarModalReactivar(false);
            setCopropietarioAReactivar(null);
        }
    };

    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            <Head title="Gestion Copropietarios" />

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-center mb-8">Admin Edificio La Paz</h1>
                    <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
                        <a href="/dashboard-edificio" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
                        <a href="/cajas-ahorro-copropietario" className="hover:text-[#10B981] text-xl">📊 Cajas de Ahorro Copropietarios</a>
                        <a href="/administrador-micromarket" className="hover:text-[#10B981] text-xl">🏪 Administrador Micromarket</a>
                        <button onClick={handleLogout} className="hover:text-[#10B981] text-xl text-left w-full">🚪 Cerrar Sesión</button>
                    </nav>
                </div>
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 p-4 md:p-6 w-full md:max-w-5xl mx-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl overflow-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold">👥 Gestión de Copropietarios</h2>
                    <Link href="/agregar-copropietario" className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded shadow-md">
                        + Agregar Copropietario
                    </Link>
                    <input type="text" placeholder="Buscar por nombre o apellido" className="bg-white px-4 py-2 rounded-md border border-gray-300 w-full max-w-xs text-black"
                        value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                </div>



                {/* Botón para alternar mostrar eliminados o activos */}
                <div className="mb-4">
                    <button onClick={() => setMostrarEliminados(!mostrarEliminados)} className="bg-gray-500 text-white px-4 py-2 rounded">
                        {mostrarEliminados ? "Mostrar Activos" : "Mostrar Eliminados"}
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-blue-900">
                        <thead className="bg-gray-100 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">ID</th>
                                <th className="px-4 py-3 text-left font-medium">Nombre</th>
                                <th className="px-4 py-3 text-left font-medium">Apellido</th>
                                <th className="px-4 py-3 text-left font-medium">Correo</th>
                                <th className="px-4 py-3 text-left font-medium">Estado</th>
                                <th className="px-4 py-3 text-center font-medium">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {copropietariosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-500">
                                        {copropietarios.length === 0
                                            ? "No hay copropietarios cargados."
                                            : `No se encontraron copropietarios ${mostrarEliminados ? 'eliminados' : 'activos'}.`}
                                    </td>
                                </tr>
                            )}
                            {copropietariosFiltrados.map((copro) => (
                                <tr key={copro.id}>
                                    <td className="px-4 py-3 whitespace-nowrap">{copro.id}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{copro.nombre}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{copro.apellido}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{copro.correo}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded text-xs ${copro.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {copro.estado ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-center space-x-2">
                                        <Link href={`/editar-copropietario/${copro.id}`} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                                            Editar
                                        </Link>
                                        {mostrarEliminados ? (
                                            <button onClick={() => confirmarReactivacion(copro.id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                                                Reactivar
                                            </button>
                                        ) : (
                                            <button onClick={() => confirmarEliminacion(copro.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal para confirmar eliminación */}
            {mostrarModalEliminar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro?</h3>
                        <p className="text-gray-600 mb-6">Esta acción eliminará al copropietario.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setMostrarModalEliminar(false);
                                    setCopropietarioAEliminar(null);
                                }}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 text-black">
                                Cancelar
                            </button>
                            <button onClick={eliminarCopropietario} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para confirmar reactivación */}
            {mostrarModalReactivar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Confirmar reactivación?</h3>
                        <p className="text-gray-600 mb-6">Esta acción reactivará al copropietario.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setMostrarModalReactivar(false);
                                    setCopropietarioAReactivar(null);
                                }}
                                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 text-black">
                                Cancelar
                            </button>
                            <button onClick={reactivarCopropietario} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
                                Reactivar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
