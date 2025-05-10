import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  imagen: string;
}

export default function ProductosMicromarket() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroStock, setFiltroStock] = useState<"todos" | "conStock" | "sinStock">("todos");

  const [productos] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Arroz 5kg",
      categoria: "Alimentos",
      stock: 12,
      precio: 50,
      imagen: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      nombre: "Aceite vegetal",
      categoria: "Alimentos",
      stock: 0,
      precio: 30,
      imagen: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      nombre: "Detergente 1L",
      categoria: "Limpieza",
      stock: 5,
      precio: 15,
      imagen: "https://via.placeholder.com/60",
    },
  ]);

  const productosFiltrados = productos
    .filter(p => {
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideStock =
        filtroStock === "todos"
          ? true
          : filtroStock === "conStock"
          ? p.stock > 0
          : p.stock === 0;
      return coincideBusqueda && coincideStock;
    });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Productos Micromarket" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-center mb-8">Admin MicroMarket La Paz</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <a href="/dashboard-micromarket" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
            <a href="/recarga-saldo" className="hover:text-[#10B981] text-xl">📲 Recarga Saldo</a>
            <a href="/logout" className="hover:text-[#10B981] text-xl">🚪 Cerrar Sesión</a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-6 w-full md:max-w-5xl mx-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">📦 Productos del Micromarket</h2>
          <Link href="/agregar-productos" className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded shadow-md inline-block text-center">
            + Agregar Producto
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <input type="text" placeholder="Buscar producto..." className="bg-white text-black px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/2" 
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
          <select value={filtroStock} onChange={(e) => setFiltroStock(e.target.value as "todos" | "conStock" | "sinStock")} className="bg-white text-black px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/3">
            <option value="todos">Todos</option>
            <option value="conStock">Con stock</option>
            <option value="sinStock">Sin stock</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-blue-900">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase">Imagen</th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase">Categoría</th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-medium uppercase">Precio (Bs.)</th>
                <th className="px-4 py-3 text-center text-sm font-medium uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productosFiltrados.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-4">
                    <img src={p.imagen} alt={p.nombre} className="w-12 h-12 rounded object-cover" />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.nombre}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.categoria}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.stock}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.precio.toFixed(2)}</td>
                  <td className="px-4 py-4 text-center space-x-2">
                    {/*<Link href={`/editar-productos/${p.id}`} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">*/}
                    <Link href={`/editar-productos`} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                      Editar
                    </Link>
                    <button onClick={() => alert(`Eliminar producto: ${p.nombre}`)}className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {productosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No se encontraron productos.
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
