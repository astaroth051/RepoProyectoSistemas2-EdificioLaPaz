import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

interface Copropietario {
  id: number;
  nombre: string;
  apellido: string;
  departamento?: string;
  correo: string;
}

interface PageProps {
  copropietarios: Copropietario[];
}

export default function GestionCopropietarios({ copropietarios }: PageProps) {
  const [busqueda, setBusqueda] = useState("");

  const copropietariosFiltrados = copropietarios
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
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-6 w-full md:max-w-5xl mx-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl overflow-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">👥 Gestión de Copropietarios</h2>
          <Link
            href="/agregar-copropietario"
            className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded shadow-md"
          >
            + Agregar Copropietario
          </Link>
          <input
            type="text"
            placeholder="Buscar por nombre o apellido"
            className="bg-white px-4 py-2 rounded-md border border-gray-300 w-full max-w-xs text-black"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-blue-900">
            <thead className="bg-gray-100 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Nombre</th>
                <th className="px-4 py-3 text-left font-medium">Apellido</th>
                <th className="px-4 py-3 text-left font-medium">Correo</th>
                <th className="px-4 py-3 text-center font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {copropietariosFiltrados.map((copro, index) => (
                <tr key={copro.id || index}> {/* Uso del índice como fallback */}
                  <td className="px-4 py-3 whitespace-nowrap">{copro.nombre}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{copro.apellido}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{copro.correo}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-center space-x-2">
                    <Link
                      href={`/editar-copropietario/${copro.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => alert(`Eliminar copropietario: ${copro.nombre}`)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {copropietariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No se encontraron copropietarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
