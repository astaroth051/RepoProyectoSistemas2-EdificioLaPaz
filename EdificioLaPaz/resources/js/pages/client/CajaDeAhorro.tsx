import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Head } from '@inertiajs/react';

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

  useEffect(() => {
    fetch('/caja-ahorro/obtener', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCopropietario(data))
      .catch(err => console.error('Error copropietario:', err.message));

    fetch('/caja-ahorro/movimientos', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setMovimientos(data))
      .catch(err => console.error('Error movimientos:', err.message));

    initChart("gastosChart");
    initChart("gastosChartMensual");
  }, []);

  const initChart = (id: string) => {
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
          datasets: [{
            label: "Gastos en Bs",
            data: [50, 75, 60, 80, 95, 100, 69],
            backgroundColor: "#1E3A8A",
            borderRadius: 6,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: "black" },
            },
          },
          scales: {
            x: { ticks: { color: "black" } },
            y: { ticks: { color: "black" } },
          },
        },
      });
    }
  };

  const imprimirGrafico = (canvasId: string) => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;
    const ventana = window.open("", "_blank");
    if (ventana) {
      ventana.document.write(`
        <html>
          <head><title>Imprimir Gráfico</title></head>
          <body>
            <h2 style="text-align: center;">Reporte</h2>
            <img src="${canvas.toDataURL()}" style="display: block; margin: 0 auto;"/>
          </body>
        </html>
      `);
      ventana.document.close();
      ventana.focus();
      ventana.print();
    }
  };

  if (!copropietario) return <div className="text-black">Cargando...</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <Head title="Caja de Ahorro" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-center mb-8">Bienvenido</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold items-center md:items-start">
            <a href="/dashboard-client" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
            {/*<a href="/plan-de-pagos" className="hover:text-[#10B981] text-xl">📋 Plan de Pagos</a>*/}
            <a href="/productos" className="hover:text-[#10B981] text-xl">📦 Productos</a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white text-white overflow-x-hidden">
        <div className="bg-[#1E3A8A] p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto border-[#21983f] border-4">
          <h1 className="text-2xl font-semibold text-center mb-10">Caja de Ahorro Edificio La Paz</h1>

          {/* Info Personal */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl mb-10 w-full max-w-3xl mx-auto text-center border-4 border-[#21983f] hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" alt="Foto" className="w-24 h-24 rounded-full mb-4 border-4 border-[#21983f] shadow-lg"/>
              <p className="text-2xl font-bold text-blue-500 mb-4">Caja de Ahorro</p>
              <div className="text-blue-500 text-sm space-y-2">
                <p><span className="font-semibold text-black">Nombre:</span> {copropietario.nombre}</p>
                <p><span className="font-semibold text-black">Saldo:</span> {copropietario.saldo} Bs</p>
                <p><span className="font-semibold text-black">Seguro:</span> {copropietario.seguro} Bs</p>
              </div>
            </div>
          </div>

          {/* Historial */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-10 w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-blue-500">Últimos Movimientos</h2>
            <div className="hidden sm:grid grid-cols-5 gap-4 font-bold text-black border-b border-black pb-2">
              <span>Compra</span>
              <span>Producto</span>
              <span>Fecha</span>
              <span>Cantidad</span>
              <span>Precio Total</span>
            </div>
            {movimientos.map((m, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-5 gap-y-4 gap-x-2 mt-4 text-blue-500 border-b border-gray-300 py-4">
                <p>{m.compra}</p>
                <p>{m.producto}</p>
                <p>{m.fecha}</p>
                <p>{m.cantidad}</p>
                <p>{m.precioTotal} Bs</p>
              </div>
            ))}
          </div>

          {/* Gráficos */}
          <div className="flex flex-col items-center gap-10 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[500px] text-black">
              <h2 className="text-xl font-semibold mb-2">Historial Semanal</h2>
              <p className="mb-4">Revisa tus transacciones de la última semana.</p>
              <canvas id="gastosChart" width="400" height="100"></canvas>
              <button
                onClick={() => imprimirGrafico("gastosChart")}
                className="bg-[#21983f] text-white py-2 px-4 rounded mt-6 hover:bg-[#1b7f35] transition"
              >
                Imprimir
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[500px] text-black">
              <h2 className="text-xl font-semibold mb-2">Historial Mensual</h2>
              <p className="mb-4">Consulta tus movimientos financieros del mes.</p>
              <canvas id="gastosChartMensual" width="400" height="100"></canvas>
              <button
                onClick={() => imprimirGrafico("gastosChartMensual")}
                className="bg-[#21983f] text-white py-2 px-4 rounded mt-6 hover:bg-[#1b7f35] transition"
              >
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CajaDeAhorro;
