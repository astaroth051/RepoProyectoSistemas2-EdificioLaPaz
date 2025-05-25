import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

export default function AgregarProductos() {
  const { data, setData, post, errors } = useForm({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: 'Bebidas',
    imagen: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/agregar-productos');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Agregar Producto" />

      {/* Sidebar (igual que en ProductosMicromarket) */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-center mb-8">Admin MicroMarket La Paz</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <Link href="/dashboard-micromarket" className="hover:text-[#10B981] text-xl">🏠 Inicio</Link>
            <Link href="/productos-micromarket" className="hover:text-[#10B981] text-xl">📦 Productos</Link>
            <Link href="/recarga-saldo" className="hover:text-[#10B981] text-xl">📲 Recarga Saldo</Link>
            <Link href="/logout" className="hover:text-[#10B981] text-xl">🚪 Cerrar Sesión</Link>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">➕ Agregar Nuevo Producto</h2>
            <Link href="/productos-micromarket" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Volver a Productos
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="bg-white text-blue-900 rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block font-semibold mb-1">Nombre del Producto*</label>
                <input
                  type="text"
                  value={data.nombre}
                  onChange={(e) => setData('nombre', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold mb-1">Descripción</label>
                <textarea
                  value={data.descripcion}
                  onChange={(e) => setData('descripcion', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Precio (Bs.)*</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={data.precio}
                  onChange={(e) => setData('precio', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
              </div>

              <div>
                <label className="block font-semibold mb-1">Stock*</label>
                <input
                  type="number"
                  min="0"
                  value={data.stock}
                  onChange={(e) => setData('stock', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
              </div>

              <div>
                <label className="block font-semibold mb-1">Categoría*</label>
                <select
                  value={data.categoria}
                  onChange={(e) => setData('categoria', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                >
                  <option value="Bebidas">Bebidas</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Limpieza">Limpieza</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">URL de la Imagen*</label>
                <input
                  type="url"
                  value={data.imagen}
                  onChange={(e) => setData('imagen', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  required
                />
                {errors.imagen && <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
              <Link
                href="/productos-micromarket"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2 rounded"
              >
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}