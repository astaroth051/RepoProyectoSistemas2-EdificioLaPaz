import { Head, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

interface AdminEdificio {
  name: string;
  lastname: string;
  email: string;
  telefono: string;
}

export default function DashboardEdificio() {
  const { props } = usePage<{ auth: { user: AdminEdificio } }>();
  const admin = props.auth.user;

  const [recordatorios, setRecordatorios] = useState<string[]>([]);
  const [nuevoRecordatorio, setNuevoRecordatorio] = useState("");

  const handleLogout = () => {
    router.post('/logout');
  };

  useEffect(() => {
    const almacenados = localStorage.getItem("recordatorios");
    if (almacenados) {
      setRecordatorios(JSON.parse(almacenados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recordatorios", JSON.stringify(recordatorios));
  }, [recordatorios]);

  const agregarRecordatorio = () => {
    if (nuevoRecordatorio.trim() === "") return;
    setRecordatorios([...recordatorios, nuevoRecordatorio.trim()]);
    setNuevoRecordatorio("");
  };

  const eliminarRecordatorio = (index: number) => {
    const actualizados = [...recordatorios];
    actualizados.splice(index, 1);
    setRecordatorios(actualizados);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Dashboard Edificio" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-center mb-8">
            Admin Edificio La Paz
          </h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <a href="/gestion-copropietarios" className="hover:text-[#10B981] text-xl">🤝 Gestión de Copropietarios</a>
            <a href="/cajas-ahorro-copropietario" className="hover:text-[#10B981] text-xl">📊 Cajas de Ahorro Copropietarios</a>
            <a href="/administrador-micromarket" className="hover:text-[#10B981] text-xl">🏪 Administrador Micromarket</a>
            <button onClick={handleLogout} className="hover:text-[#10B981] text-xl text-left w-full ">🚪 Cerrar Sesión</button>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-white rounded-tl-3xl w-full max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Panel de Administración del Edificio La Paz
        </h2>

        {/* Información del administrador */}
        <section className="bg-white text-blue-900 rounded-xl p-6 shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">👤 Información del Administrador</h3>
          <ul className="space-y-2 text-base">
            <li>
              <strong>Nombre:</strong> {admin.name} {admin.lastname}
            </li>
            <li>
              <strong>Correo:</strong> {admin.email}
            </li>
            <li>
              <strong>Teléfono:</strong> {admin.telefono}
            </li>
          </ul>
        </section>

        {/* Resumen del edificio */}
        <section className="bg-white text-blue-900 rounded-xl p-6 shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">🏢 Resumen del Edificio</h3>
          <ul className="space-y-2 text-base">
            <li><strong>Nombre:</strong> Edificio La Paz</li>
            <li><strong>Ubicación:</strong> Av. 20 de Octubre #2151, La Paz</li>
            <li><strong>Número de departamentos:</strong> 48</li>
            <li><strong>Áreas comunes:</strong> Terraza, sala de reuniones</li>
          </ul>
        </section>

        {/* Recordatorios importantes */}
        <section className="bg-white text-blue-900 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">🔔 Recordatorios Importantes</h3>
          </div>

          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
              type="text"
              value={nuevoRecordatorio}
              onChange={(e) => setNuevoRecordatorio(e.target.value)}
              placeholder="Escribe un nuevo recordatorio..."
              className="flex-1 p-2 rounded-lg border border-gray-300"
            />
            <button
              className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg shadow-md text-sm"
              onClick={agregarRecordatorio}
            >
              + Agregar
            </button>
          </div>

          <ul className="list-disc list-inside space-y-2 text-base">
            {recordatorios.map((recordatorio, index) => (
              <li key={`${recordatorio}-${index}`} className="flex justify-between items-center">
                <span>{recordatorio}</span>
                <button
                  onClick={() => eliminarRecordatorio(index)}
                  className="text-red-500 text-sm ml-2"
                >
                  Eliminar
                </button>
              </li>
            ))}
            {recordatorios.length === 0 && (
              <p className="text-sm text-gray-500">No hay recordatorios guardados.</p>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
