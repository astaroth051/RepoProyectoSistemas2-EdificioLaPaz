import { Head, Link } from "@inertiajs/react";

export default function EditarCopropietario() {
  // Simulación de datos del copropietario reemplazar con datos reales
  const copropietario = {
    nombre: "Ana",
    apellido: "Torres",
    departamento: "B-203",
    celular: "78945678",
    ci: "6543210",
    verificado: "si",
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Editar Copropietario" />
        {/* Main */}
      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-white rounded-tl-3xl w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Editar Copropietario</h2>

        <form className="bg-white text-blue-900 rounded-xl p-6 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input type="text" defaultValue={copropietario.nombre} className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Apellido</label>
              <input type="text" defaultValue={copropietario.apellido} className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Departamento</label>
              <input type="text" defaultValue={copropietario.departamento} className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Celular</label>
              <input type="tel" defaultValue={copropietario.celular} className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Carnet de Identidad</label>
              <input type="text" defaultValue={copropietario.ci} className="w-full px-4 py-2 rounded border border-gray-300"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Verificación de existencia</label>
              <select defaultValue={copropietario.verificado} className="w-full px-4 py-2 rounded border border-gray-300">
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
            {/* Botones */}
          <div className="flex justify-between mt-6">
            <Link href="/gestion-copropietarios" className="bg-gray-300 text-blue-900 px-4 py-2 rounded hover:bg-gray-400">
              Cancelar
            </Link>
            <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
