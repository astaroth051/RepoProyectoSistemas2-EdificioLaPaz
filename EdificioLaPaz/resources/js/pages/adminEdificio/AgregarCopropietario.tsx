import { Head, Link } from "@inertiajs/react";

export default function AgregarCopropietario() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Agregar Copropietario" />
    {/* Main */}
      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-white rounded-tl-3xl w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Agregar Nuevo Copropietario</h2>

        <form className="bg-white text-blue-900 rounded-xl p-6 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input type="text" placeholder="Ej: Ricardo" className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Apellido</label>
              <input type="text" placeholder="Ej: Arjona" className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Departamento</label>
              <input type="text" placeholder="Ej: A-102" className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Celular</label>
              <input type="tel" placeholder="Ej: 78945612" className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Carnet de Identidad</label>
              <input type="text" placeholder="Ej: 12345678" className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Verificación de existencia</label>
              <select className="w-full px-4 py-2 rounded border border-gray-300">
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Caja de Ahorro</label>
              <select className="w-full px-4 py-2 rounded border border-gray-300">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
          </div>
            {/* Botones */}
          <div className="flex justify-between mt-6">
            <Link href="/gestion-copropietarios" className="bg-gray-300 text-blue-900 px-4 py-2 rounded hover:bg-gray-400">
              Cancelar
            </Link>
            <button type="submit" className="bg-[#10B981] text-white px-6 py-2 rounded hover:bg-[#059669]">
              Guardar Copropietario
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
