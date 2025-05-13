import { useEffect, useState, FormEvent } from "react";
import { Head, Link, router } from "@inertiajs/react";
import axios from 'axios';

interface Props {
  id: number;
}

export default function EditarCopropietario({ id }: Props) {
  const [copropietario, setCopropietario] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    rol: "",
  });

  useEffect(() => {
    axios.get(`/api/copropietarios/${id}/edit`)
      .then((res) => setCopropietario(res.data))
      .catch((err) => console.error("Error al cargar datos:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCopropietario({ ...copropietario, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.post(`/api/copropietarios/${id}/update`, copropietario);
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
                value={copropietario.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={copropietario.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={copropietario.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={copropietario.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Rol</label>
              <select
                name="rol"
                value={copropietario.rol}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              >
                <option value="">Seleccionar Rol</option>
                <option value="copropietario">Copropietario</option>
                <option value="admin">Administrador</option>
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
