import React, { useState } from "react";
import { Head } from "@inertiajs/react";

interface Copropietario {
 id: number;
 nombre: string;
 apellido: string;
 activo: boolean;
}

export default function CajasAhorroCopropietarios() {
 const [busqueda, setBusqueda] = useState("");
 const [copropietarios, setCopropietarios] = useState<Copropietario[]>([
  { id: 1, nombre: "Ana", apellido: "Torres", activo: false },
  { id: 2, nombre: "Luis", apellido: "Pérez", activo: false},
  { id: 3, nombre: "María", apellido: "López", activo: true },
  { id: 4, nombre: "Carlos", apellido: "Gómez", activo: false},
 ]);

 const toggleEstado = (id: number) => {
  setCopropietarios(prev =>
   prev.map(copro =>
    copro.id === id
     ? {
       ...copro,
       activo: !copro.activo,
      }
     : copro
   )
  );
 };

 // Filtro + ordenamiento ascendente
 const copropietariosFiltrados = copropietarios
  .filter(c => {
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
  <div className="flex flex-col min-h-screen bg-white">
  <Head title="Gestion Administrador Micromarket" />

  <div className="md:flex flex-1">
    {/* Sidebar */}
    <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
     <div>
      <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-center mb-8">Admin Edificio La Paz</h1>
      <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
       <a href="/dashboard-edificio" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
       <a href="/gestion-copropietarios" className="hover:text-[#10B981] text-xl">🤝 Gestión de Copropietario</a>
       <a href="/cajas-ahorro-copropietario" className="hover:text-[#10B981] text-xl">📊 Cajas de Ahorro Copropietarios</a>
      </nav>
     </div>
    </aside>

    {/* Main */}
    <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto overflow-x-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl">
     <h2 className="text-2xl font-bold text-center mb-4">Gestion Administrador Micromarket</h2>

     <div className="mb-4 text-center">
      <input type="text" placeholder="Buscar por nombre o apellido" className="bg-white px-4 py-2 rounded-md border border-gray-300 w-full max-w-md text-black" value={busqueda} onChange={e => setBusqueda(e.target.value)}/>
     </div>

     <div className="bg-white text-blue-900 rounded-xl shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-left">
       <thead className="bg-gray-100 text-blue-800">
        <tr>
         <th className="px-6 py-3 text-sm font-semibold">Nombre</th>
         <th className="px-6 py-3 text-sm font-semibold">Apellido</th>
         <th className="px-6 py-3 text-sm font-semibold">Estado Administrador</th>
         <th className="px-6 py-3 text-sm font-semibold">Acción</th>
        </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
        {copropietariosFiltrados.map(copro => (
         <tr key={copro.id}>
          <td className="px-6 py-4">{copro.nombre}</td>
          <td className="px-6 py-4">{copro.apellido}</td>
          <td className="px-6 py-4">
           {copro.activo ? (
            <span className="text-green-600 font-semibold">Activo</span>
           ) : (
            <span className="text-red-600 font-semibold">Inactivo</span>
           )}
          </td>
          <td className="px-6 py-4">
           <button
            onClick={() => toggleEstado(copro.id)}
            className={`px-4 py-2 rounded text-white font-semibold shadow-md ${
             copro.activo
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
            }`}
           >
            {copro.activo ? "Desactivar" : "Activar"}
           </button>
          </td>
         </tr>
        ))}
        {copropietariosFiltrados.length === 0 && (
         <tr>
          <td colSpan={5} className="text-center py-6 text-gray-500">
           No se encontraron copropietarios.
          </td>
         </tr>
        )}
       </tbody>
      </table>
     </div>
    </main>
   </div>
  </div>
 );
}
