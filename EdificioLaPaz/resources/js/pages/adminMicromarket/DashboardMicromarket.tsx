import { Head, router } from "@inertiajs/react";

interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  total: number;
}

interface Props {
  totalProductos: number;
  productosBajoStock: number;
  totalVentasMes: number;
  historialVentas?: Venta[]; // opcional, pero con valor por defecto
}

export default function DashboardMicromarket({
  totalProductos,
  productosBajoStock,
  totalVentasMes,
  historialVentas = [], // valor por defecto para evitar undefined
}: Props) {
  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Dashboard Micromarket" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-center mb-8"> Admin MicroMarket La Paz</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <a href="/productos-micromarket" className="hover:text-[#10B981] text-xl">📦 Productos</a>
            <a href="/recarga-saldo" className="hover:text-[#10B981] text-xl">📲 Recarga Saldo</a>
            <button onClick={handleLogout} className="hover:text-[#10B981] text-xl text-left w-full">🚪 Cerrar Sesión</button>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-6 w-full md:max-w-5xl mx-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl overflow-auto">
        <h2 className="text-2xl font-bold mb-6">🛒 Panel del Micromarket</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white text-blue-900 p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Total de Productos</h3>
            <p className="text-3xl font-semibold">{totalProductos}</p>
          </div>

          <div className="bg-white text-blue-900 p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Ventas del Mes</h3>
            <p className="text-3xl font-semibold">
              Bs. {Number(totalVentasMes).toFixed(2)}
            </p>
          </div>

          <div className="bg-white text-blue-900 p-4 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Productos con Bajo Stock</h3>
            <p className="text-3xl font-semibold">{productosBajoStock}</p>
          </div>
        </div>

        {/* Historial de ventas */}
        <section className="mt-10 bg-white text-blue-900 p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">📊 Historial de Ventas</h3>
            <a href="/historial-ventas/imprimir" target="_blank" rel="noopener noreferrer" className="bg-[#10B981] text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Imprimir PDF 🖨️
            </a>
          </div>

          <div className="overflow-auto max-h-[300px]">
            <table className="min-w-full text-left border">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2 border">Fecha</th>
                  <th className="p-2 border">Cliente</th>
                  <th className="p-2 border">Total (Bs.)</th>
                </tr>
              </thead>
              <tbody>
                {historialVentas.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-2 text-center">
                      No hay ventas registradas.
                    </td>
                  </tr>
                ) : (
                  historialVentas.map((venta) => (
                    <tr key={venta.id} className="border-t hover:bg-blue-50">
                      <td className="p-2 border">{venta.fecha}</td>
                      <td className="p-2 border">{venta.cliente}</td>
                      <td className="p-2 border">Bs. {venta.total.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
