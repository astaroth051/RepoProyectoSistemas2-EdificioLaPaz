import React from 'react';
import { Head } from '@inertiajs/react';

const PlanDePagos: React.FC = () => {
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
            <a href="/logout" className="hover:text-[#10B981] text-xl">🚪 Cerrar Sesión</a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="p-4 sm:p-6 md:p-8 mt-6 overflow-y-auto bg-[#1E3A8A] rounded-lg border-4 border-[#10B981] mx-auto max-w-7xl max-h-[75vh]">
      <p className="text-2xl text-center mb-6 font-semibold text-white">Plan de Pagos Micromarket Edificio La Paz</p>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-wrap justify-center gap-6">
          {/* Cuotas */}
          <div className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col items-center gap-4">
            <p className="text-[#1E3A8A] text-2xl font-semibold">Cantidad de Cuotas</p>
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className="w-full text-center text-black">
                <input type="radio" name="cuotas" value={num} className="mr-2" />
                {num} Cuota{num > 1 && 's'}
              </label>
            ))}
          </div>

          {/* Calendario */}
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <div className="mb-4 flex justify-between items-center">
              <span className="font-semibold text-[#1E3A8A] text-2xl">December 2020</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <span key={day} className="font-semibold text-[#1E3A8A]">{day}</span>
              ))}
              {[...Array(35)].map((_, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 font-semibold rounded border-2 ${
                    i === 9
                      ? 'bg-white border-[#10B981] text-[#235fb7]'
                      : i < 1 || i > 31
                      ? 'text-gray-400'
                      : 'text-black'
                  }`}
                >
                  {(i < 1 && 30) || (i >= 1 && i <= 31 && i) || (i > 31 && i - 31)}
                </button>
              ))}
            </div>
          </div>

          {/* Resumen de Pago */}
          <div className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col items-center gap-2">
            <p className="text-2xl text-[#1E3A8A] font-semibold">Resumen de Pago</p>
            <div className="text-lg text-black">
              <p><strong>Precio Total:</strong> 100 Bs</p>
              <p><strong>Precio por Cuota:</strong> 20 Bs</p>
            </div>
          </div>

          {/* Productos en Lista */}
          <div className="bg-white p-6 rounded-lg w-full max-w-sm flex flex-col items-center gap-3">
            <label htmlFor="productoslista" className="text-2xl text-[#1E3A8A] font-semibold">Productos en Lista</label>
            <select
              id="productoslista"
              name="productoslista"
              className="p-2 rounded w-52 text-black"
              disabled
              defaultValue=""
            >
              <option value="" disabled>Productos</option>
              <option value="producto1" disabled>Producto 1</option>
              <option value="producto2" disabled>Producto 2</option>
              <option value="producto3" disabled>Producto 3</option>
              <option value="producto4" disabled>Producto 4</option>
            </select>
          </div>

          {/* Botón Confirmar */}
          <div className="bg-white p-6 rounded-lg w-full max-w-sm flex justify-center">
            <button type="submit" className="bg-[#1E3A8A] hover:bg-[#758dcf] text-white py-3 px-6 rounded-2xl text-lg transition">
              Confirmar Plan
            </button>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};

export default PlanDePagos;