import { useEffect, useState, FormEvent } from "react";
import { Head, Link, router } from "@inertiajs/react";

interface Copropietario {
  id_user: number;
  name: string;
  lastname: string;
  telefono: string;
  email: string;
  rol: string;
}

interface Props {
  copropietario: Copropietario;
}

export default function EditarCopropietario({ copropietario }: Props) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    rol: "",
  });

  useEffect(() => {
    if (copropietario) {
      setFormData({
        nombre: copropietario.name || "",
        apellido: copropietario.lastname || "",
        telefono: copropietario.telefono || "",
        email: copropietario.email || "",
        rol: copropietario.rol || "",
      });
    }
  }, [copropietario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    router.post(`/api/copropietarios/${copropietario.id_user}/update`, {
      name: formData.nombre,
      lastname: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
      rol: formData.rol,
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Editar Copropietario" />

      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-white rounded-tl-3xl w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Editar Copropietario</h2>

        <form onSubmit={handleSubmit} className="bg-white text-blue-900 rounded-xl p-6 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Rol</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              >
                <option value="">Seleccionar Rol</option>
                <option value="copropietario">Copropietario</option>
                <option value="admin">Administrador</option>
                <option value="administrador micromarket">Administrador Micromarket</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link
              href="/gestion-copropietarios"
              className="bg-gray-300 text-blue-900 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
