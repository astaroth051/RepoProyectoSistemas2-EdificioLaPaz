import { Head } from "@inertiajs/react";
import { useState } from "react";

interface Copropietario {
  id: number;
  nombre: string;
  apellido: string;
  numeroCuenta: string;
}

// Simulación de datos de los copropietarios
const copropietariosEjemplo: Copropietario[] = [
  { id: 1, nombre: "Ana María", apellido: "Gonzales", numeroCuenta: "1234567890" },
  { id: 2, nombre: "Carlos", apellido: "Pérez", numeroCuenta: "0987654321" },
  { id: 3, nombre: "Sofía", apellido: "Rodríguez", numeroCuenta: "1122334455" },
];

export default function RecargaSaldo() {
  const [monto, setMonto] = useState("");
  const [filtro, setFiltro] = useState("");
  const [copropietarioSeleccionado, setCopropietarioSeleccionado] = useState<Copropietario | null>(null);

  const copropietariosFiltrados = copropietariosEjemplo.filter(
    (copropietario) =>
      copropietario.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      copropietario.apellido.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSeleccionarCopropietario = (copropietario: Copropietario) => {
    setCopropietarioSeleccionado(copropietario);
  };

  const handleCancelarRecarga = () => {
    setCopropietarioSeleccionado(null);
    setMonto(""); // Opcional: también puedes resetear el monto
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (copropietarioSeleccionado) {
      alert(
        `Recarga de Bs. ${monto} para ${copropietarioSeleccionado.nombre} ${copropietarioSeleccionado.apellido}`
      );
      setMonto("");
    } else {
      alert("Por favor, selecciona un copropietario.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Recarga de Saldo" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-center mb-8"> Admin MicroMarket La Paz</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <a href="/dashboard-micromarket" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
            <a href="/productos-micromarket" className="hover:text-[#10B981] text-xl">📦 Productos</a>
            <a href="/logout" className="hover:text-[#10B981] text-xl">🚪 Cerrar Sesión</a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-6 max-w-5xl mx-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl overflow-auto">
        <h2 className="text-2xl font-bold text-center mb-8">💳 Recarga de Saldo</h2>

        <div className="mb-4">
          <label htmlFor="filtroCopropietarios" className="block font-semibold mb-1">
            Buscar Copropietario
          </label>
          <input type="text" id="filtroCopropietarios" placeholder="Buscar por nombre o apellido" value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2 text-black bg-white"/>
        </div>

        <div className="mb-4 bg-white text-blue-900 rounded-xl shadow-md overflow-y-auto max-h-48">
          <ul className="divide-y divide-gray-200">
            {copropietariosFiltrados.map((copropietario) => (
              <li key={copropietario.id} onClick={() => handleSeleccionarCopropietario(copropietario)} className={`px-4 py-2 cursor-pointer hover:bg-gray-100 
                ${
                  copropietarioSeleccionado?.id === copropietario.id ? "bg-gray-200" : ""
                }`}>
                {copropietario.nombre} {copropietario.apellido}
              </li>
            ))}
            {copropietariosFiltrados.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No se encontraron copropietarios.</li>
            )}
          </ul>
        </div>

        {copropietarioSeleccionado && (
          <form onSubmit={handleSubmit} className="bg-white text-blue-900 p-6 rounded-xl shadow-md space-y-6">
            <div>
              <label className="block font-semibold mb-1">Nombre del Copropietario</label>
              <input type="text" value={copropietarioSeleccionado.nombre} disabled className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"/>
            </div>

            <div>
              <label className="block font-semibold mb-1">Apellido del Copropietario</label>
              <input type="text" value={copropietarioSeleccionado.apellido} disabled className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"/>
            </div>

            <div>
              <label className="block font-semibold mb-1">Número de Cuenta</label>
              <input type="text" value={copropietarioSeleccionado.numeroCuenta} disabled className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"/>
            </div>

            <div>
              <label className="block font-semibold mb-1">Monto a Recargar (Bs.)</label>
              <input type="number" value={monto}onChange={(e) => setMonto(e.target.value)}placeholder="Ej. 50" required className="w-full border border-gray-300 rounded px-4 py-2"/>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={handleCancelarRecarga} className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow-md">
                Cancelar
              </button>
              <button type="submit" className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-6 py-2 rounded shadow-md">
                Recargar
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}