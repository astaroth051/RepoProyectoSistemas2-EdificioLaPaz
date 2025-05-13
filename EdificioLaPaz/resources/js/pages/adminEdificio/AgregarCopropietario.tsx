import { Head, Link, router } from "@inertiajs/react";
import { FormEvent, useState } from "react";

export default function AgregarCopropietario() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    telefono: "",
    email: "",
    password: "",
    rol: "copropietario",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    router.post("/agregar-copropietario", formData, {
      onSuccess: () => {
        router.visit("/gestion-copropietarios");
      },
      onError: (errors) => {
        console.error("Errores:", errors);
        alert("Hubo un error al agregar el copropietario.");
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Agregar Copropietario" />
      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-white rounded-tl-3xl w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Agregar Nuevo Copropietario</h2>

        <form onSubmit={handleSubmit} className="bg-white text-blue-900 rounded-xl p-6 shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Ricardo" className="w-full px-4 py-2 rounded border border-gray-300" required/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Apellido</label>
              <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Ej: Arjona" className="w-full px-4 py-2 rounded border border-gray-300"required/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Celular</label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Ej: 78945612" className="w-full px-4 py-2 rounded border border-gray-300" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Correo Electrónico</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Ej: correo@ejemplo.com" className="w-full px-4 py-2 rounded border border-gray-300" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Contraseña</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="******" className="w-full px-4 py-2 rounded border border-gray-300"required/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Rol</label>
              <select
                name="rol" value={formData.rol} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300">
                <option value="administrador">Administrador</option>
                <option value="administrador micromarket">Administrador Micromarket</option>
                <option value="copropietario">Copropietario</option>
              </select>
            </div>
          </div>

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