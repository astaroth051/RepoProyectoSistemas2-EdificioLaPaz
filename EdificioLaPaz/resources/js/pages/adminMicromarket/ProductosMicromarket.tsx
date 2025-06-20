import { Head, router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  imagen: string;
  estado: number; // 1 = activo, 0 = inactivo
}

interface Props {
  productos: Producto[];
}

export default function ProductosMicromarket({ productos }: Props) {
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalActivar, setMostrarModalActivar] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(null);
  const [productoAActivar, setProductoAActivar] = useState<Producto | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroStock, setFiltroStock] = useState<"todos" | "conStock" | "sinStock">("todos");
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activos" | "inactivos">("activos");

  // Filtro de productos según búsqueda, stock y estado
  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideStock =
      filtroStock === "todos"
        ? true
        : filtroStock === "conStock"
        ? p.stock > 0
        : p.stock === 0;
    const coincideEstado =
      filtroEstado === "todos"
        ? true
        : filtroEstado === "activos"
        ? p.estado === 1
        : p.estado === 0;
    return coincideBusqueda && coincideStock && coincideEstado;
  });

  const handleLogout = () => {
    router.post("/logout");
  };

  const confirmarEliminacion = (producto: Producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const confirmarActivacion = (producto: Producto) => {
    setProductoAActivar(producto);
    setMostrarModalActivar(true);
  };

  const eliminarProducto = () => {
    if (productoAEliminar) {
      router.delete(`/productos-micromarket/${productoAEliminar.id}`);
      setMostrarModalEliminar(false);
      setProductoAEliminar(null);
    }
  };

  const activarProducto = () => {
    if (productoAActivar) {
      router.put(`/productos-micromarket/${productoAActivar.id}/activar`);
      setMostrarModalActivar(false);
      setProductoAActivar(null);
    }
  };

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
            <button onClick={handleLogout} className="hover:text-[#10B981] text-xl text-left w-full ">🚪 Cerrar Sesión</button>
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
          <input type="text" placeholder="Buscar producto..." className="bg-white text-black px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/3"
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>

          <select value={filtroStock} onChange={(e) => setFiltroStock(e.target.value as "todos" | "conStock" | "sinStock")}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/4">
            <option value="todos">Todos los stocks</option>
            <option value="conStock">Con stock</option>
            <option value="sinStock">Sin stock</option>
          </select>

          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value as "todos" | "activos" | "inactivos")}
            className="bg-white text-black px-4 py-2 rounded-md border border-gray-300 w-full md:w-1/4">
            <option value="activos">Productos activos</option>
            <option value="inactivos">Productos inactivos</option>
            <option value="todos">Todos los estados</option>
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
                <th className="px-4 py-3 text-left text-sm font-medium uppercase">Estado</th>
                <th className="px-4 py-3 text-center text-sm font-medium uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productosFiltrados.map((p) => (
                <tr key={p.id} className={p.estado === 0 ? "bg-gray-50 opacity-75" : ""}>
                  <td className="px-4 py-4">
                    <img src={p.imagen} alt={p.nombre} className="w-12 h-12 rounded object-cover" />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.nombre}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.categoria}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.stock}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{Number(p.precio).toFixed(2)}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.estado === 1
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {p.estado === 1 ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center space-x-2">
                    <Link
                      href={`/productos-micromarket/${p.id}/editar`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </Link>
                    {p.estado === 1 ? (
                      <button
                        onClick={() => confirmarEliminacion(p)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    ) : (
                      <button
                        onClick={() => confirmarActivacion(p)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Activar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {productosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal de eliminación */}
      {mostrarModalEliminar && productoAEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro?</h3>
            <p className="text-gray-600 mb-6">
              Esta acción desactivará el producto <strong>{productoAEliminar.nombre}</strong>.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setMostrarModalEliminar(false);
                  setProductoAEliminar(null);
                }}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 text-black"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarProducto}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Desactivar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de activación */}
      {mostrarModalActivar && productoAActivar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">¿Activar producto?</h3>
            <p className="text-gray-600 mb-6">
              Esta acción activará el producto <strong>{productoAActivar.nombre}</strong> y estará disponible nuevamente.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setMostrarModalActivar(false);
                  setProductoAActivar(null);
                }}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 text-black"
              >
                Cancelar
              </button>
              <button
                onClick={activarProducto}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Activar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
