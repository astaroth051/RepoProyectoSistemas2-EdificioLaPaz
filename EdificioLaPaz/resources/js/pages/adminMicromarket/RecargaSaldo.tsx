import { Head, router} from "@inertiajs/react";
import { useState } from "react";
import { usePage } from "@inertiajs/react";
import type { PageProps as InertiaPageProps } from "@inertiajs/core";

interface Copropietario {
  id: number;
  nombre: string;
  apellido: string;
  numeroCuenta: string;
}

interface Flash {
  success?: string;
}

interface PageProps extends InertiaPageProps {
  flash?: Flash;
}

interface Props {
  copropietarios: Copropietario[];
}

export default function RecargaSaldo({ copropietarios }: Props) {
  const { props } = usePage<PageProps>();
  const success = props.flash?.success;
  const [saldo, setSaldo] = useState("");
  const [filtro, setFiltro] = useState("");
  const [copropietarioSeleccionado, setCopropietarioSeleccionado] = useState<Copropietario | null>(null);

  const copropietariosFiltrados = copropietarios.filter(
    (copropietario) =>
      copropietario.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      copropietario.apellido.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSeleccionarCopropietario = (copropietario: Copropietario) => {
    setCopropietarioSeleccionado(copropietario);
  };

  const handleCancelarRecarga = () => {
    setCopropietarioSeleccionado(null);
    setSaldo("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (copropietarioSeleccionado) {
      router.post(
        "/recarga-saldo",
        {
          copropietario_id: copropietarioSeleccionado.id,
          saldo: parseFloat(saldo),
        },
        {
          preserveScroll: true, // opcional
          onSuccess: () => {
            setSaldo("");
            setCopropietarioSeleccionado(null);
          },
        }
      );
    }
  };

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Recarga de Saldo" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-center mb-8">Admin MicroMarket La Paz</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <a href="/dashboard-micromarket" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
            <a href="/productos-micromarket" className="hover:text-[#10B981] text-xl">📦 Productos</a>
            <button onClick={handleLogout} className="hover:text-[#10B981] text-xl text-left w-full ">
              🚪 Cerrar Sesión
            </button>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 md:p-6 max-w-5xl mx-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl overflow-auto">
        <h2 className="text-2xl font-bold text-center mb-8">💳 Recarga de Saldo</h2>
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="filtroCopropietarios" className="block font-semibold mb-1">
            Buscar Copropietario
          </label>
          <input type="text" id="filtroCopropietarios" placeholder="Buscar por nombre o apellido" value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2 text-black bg-white"/>
        </div>

        <div className="mb-4 bg-white text-blue-900 rounded-xl shadow-md overflow-y-auto max-h-48">
          <ul className="divide-y divide-gray-200">
            {copropietariosFiltrados.map((copropietario) => (
              <li
                key={copropietario.id}
                onClick={() => handleSeleccionarCopropietario(copropietario)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  copropietarioSeleccionado?.id === copropietario.id ? "bg-gray-200" : ""
                }`}
              >
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
              <input type="number" value={saldo} onChange={(e) => setSaldo(e.target.value)} placeholder="Ej. 50" required className="w-full border border-gray-300 rounded px-4 py-2"/>
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
