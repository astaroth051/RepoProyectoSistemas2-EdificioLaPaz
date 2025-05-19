import React, { useState } from "react";
import { router, Head } from "@inertiajs/react";

interface Usuario {
  id_user: number;
  name: string;
  lastname: string;
  cajaAhorro?: {
    estado: number; // 1 activo, 0 inactivo
    fecha_desactivacion: string | null;
  } | null;
}

interface PageProps extends Record<string, unknown> {
  usuarios: Usuario[];
  errors?: string | null;
  success?: string | null;
}

const CajasAhorroCopropietarios: React.FC<PageProps> = ({ usuarios, errors, success }) => {
  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const nombreCompleto = `${usuario.name} ${usuario.lastname}`.toLowerCase();
    return nombreCompleto.includes(busqueda.toLowerCase());
  });

  function crearCaja(usuario_id: number) {
    router.post("/cajas-ahorro/crear", { usuario_id });
  }

  function activarCaja(usuario_id: number) {
    router.post(`/cajas-ahorro/activar/${usuario_id}`);
  }

  function desactivarCaja(usuario_id: number) {
    router.post(`/cajas-ahorro/desactivar/${usuario_id}`);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Cajas de Ahorro Copropietarios" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-center mb-8">Admin Edificio La Paz</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <a href="/gestion-copropietarios" className="hover:text-[#10B981] text-xl">
              🤝 Gestión de Copropietarios
            </a>
            <a href="/administrador-micromarket" className="hover:text-[#10B981] text-xl">
              🏪 Administrador Micromarket
            </a>
            <a href="/logout" className="hover:text-[#10B981] text-xl">
              🚪 Cerrar Sesión
            </a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-white rounded-tl-3xl w-full max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 mt-0">📊 Cajas de Ahorro Copropietarios</h2>

        {/* Mensajes flash */}
        {errors && (
          <div className="bg-red-200 text-red-800 p-3 mb-4 rounded shadow">{errors}</div>
        )}
        {success && (
          <div className="bg-green-200 text-green-800 p-3 mb-4 rounded shadow">{success}</div>
        )}

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar copropietario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm text-left rounded-xl overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Apellido</th>
                <th className="px-6 py-3">Estado de Caja</th>
                <th className="px-6 py-3">Fecha Desactivación</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => {
                const caja = usuario.cajaAhorro;

                return (
                  <tr key={usuario.id_user} className="border-t hover:bg-gray-100 text-gray-800">
                    <td className="px-6 py-4">{usuario.name}</td>
                    <td className="px-6 py-4">{usuario.lastname}</td>
                    <td className="px-6 py-4">
                      {caja ? (
                        caja.estado === 1 ? (
                          <span className="text-green-600 font-semibold">Activo</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Inactivo</span>
                        )
                      ) : (
                        <span className="text-gray-500">Sin caja</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {caja && caja.estado === 0 && caja.fecha_desactivacion
                        ? new Date(caja.fecha_desactivacion.replace(" ", "T")).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {!caja && (
                        <button
                          onClick={() => crearCaja(usuario.id_user)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md text-sm"
                        >
                          Crear Caja
                        </button>
                      )}
                      {caja && caja.estado === 1 && (
                        <button
                          onClick={() => desactivarCaja(usuario.id_user)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md text-sm"
                        >
                          Desactivar Caja
                        </button>
                      )}
                      {caja && caja.estado === 0 && (
                        <button
                          onClick={() => activarCaja(usuario.id_user)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md text-sm"
                        >
                          Reactivar Caja
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center px-6 py-4 text-gray-500">
                    No se encontraron copropietarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CajasAhorroCopropietarios;
