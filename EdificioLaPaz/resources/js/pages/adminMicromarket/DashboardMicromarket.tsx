import { Head } from "@inertiajs/react";
import { useState } from "react";

interface Pedido {
  id: number;
  cliente: string;
  productos: string[];
  total: number;
}

export default function DashboardMicromarket() {
  const [pedidosPendientes, setPedidosPendientes] = useState<Pedido[]>([
    { id: 1, cliente: "Ana Gonzales", productos: ["Leche", "Pan"], total: 15.50 },
    { id: 2, cliente: "Carlos Pérez", productos: ["Café", "Azúcar", "Galletas"], total: 22.00 },
    { id: 3, cliente: "Sofía Rodríguez", productos: ["Fideos", "Salsa de tomate"], total: 18.75 },
  ]);

  const handlePedidoEntregado = (idPedido: number) => {
    setPedidosPendientes((pedidos) => pedidos.filter((pedido) => pedido.id !== idPedido));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Dashboard Micromarket" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-center mb-8">Admin MicroMarket La Paz</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <a href="/productos-micromarket" className="hover:text-[#10B981] text-xl">📦 Productos</a>
            <a href="/recarga-saldo" className="hover:text-[#10B981] text-xl">📲 Recarga Saldo</a>
            <a href="/logout" className="hover:text-[#10B981] text-xl">🚪 Cerrar Sesión</a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-6 w-full md:max-w-5xl mx-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl overflow-auto">
        <h2 className="text-2xl font-bold mb-6">🛒 Panel del Micromarket</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white text-blue-900 p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Total de Productos</h3>
            <p className="text-3xl font-semibold">48</p>
          </div>

          <div className="bg-white text-blue-900 p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Ventas del Mes</h3>
            <p className="text-3xl font-semibold">Bs. 1,250.00</p>
          </div>

          <div className="bg-white text-blue-900 p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Productos con Bajo Stock</h3>
            <p className="text-3xl font-semibold">5</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">📦 Pedidos Pendientes</h3>
          {pedidosPendientes.length > 0 ? (
            <ul className="bg-white text-blue-900 rounded-xl shadow-md overflow-hidden">
              {pedidosPendientes.map((pedido) => (
                <li key={pedido.id} className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{pedido.cliente}</p>
                    <p className="text-sm text-gray-600">Productos: {pedido.productos.join(", ")}</p>
                    <p className="text-sm text-gray-600">Total: Bs. {pedido.total.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handlePedidoEntregado(pedido.id)}
                    className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-opacity-50"
                  >
                    Entregado
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="bg-white text-blue-900 p-4 rounded-xl shadow-md text-center">No hay pedidos pendientes.</p>
          )}
        </div>
      </main>
    </div>
  );
}