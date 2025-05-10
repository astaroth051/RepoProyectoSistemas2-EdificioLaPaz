import { Head } from "@inertiajs/react";

export default function DashboardEdificio() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <Head title="Dashboard Edificio" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-center mb-8">Admin Edificio La Paz</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
            <a href="/gestion-copropietarios" className="hover:text-[#10B981] text-xl">🤝 Gestión de Copropietarios</a>
            <a href="/cajas-ahorro-copropietario" className="hover:text-[#10B981] text-xl">📊 Cajas de Ahorro Copropietarios</a>
            <a href="/administrador-micromarket" className="hover:text-[#10B981] text-xl">🏪 Administrador Micromarket</a>
            <a href="/logout" className="hover:text-[#10B981] text-xl">🚪 Cerrar Sesión</a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-white rounded-tl-3xl w-full max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6 mt-0">Panel de Administración del Edificio La Paz</h2>

        {/* Información del administrador */}
        <div className="bg-white text-blue-900 rounded-xl p-6 shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">👤 Información del Administrador</h3>
          <ul className="space-y-2 text-base">
            <li><strong>Nombre:</strong> Carlos Mendoza</li>
            <li><strong>Correo:</strong> carlos.mendoza@edificiolapaz.com</li>
            <li><strong>Teléfono:</strong> +591 71234567</li>
            <li><strong>Gestión actual:</strong> 2023 - 2025</li>
          </ul>
        </div>

        {/* Resumen del edificio */}
        <div className="bg-white text-blue-900 rounded-xl p-6 shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">🏢 Resumen del Edificio</h3>
          <ul className="space-y-2 text-base">
            <li><strong>Nombre:</strong> Edificio La Paz</li>
            <li><strong>Ubicación:</strong> Av. Costanera #123, La Paz</li>
            <li><strong>Número de departamentos:</strong> 48</li>
            <li><strong>Áreas comunes:</strong> Terraza, sala de reuniones</li>
          </ul>
        </div>

        {/* Recordatorios importantes */}
        <div className="bg-white text-blue-900 rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">🔔 Recordatorios Importantes</h3>
            <button
            className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg shadow-md text-sm"
            onClick={() => alert("Aquí podrás agregar un nuevo recordatorio (función futura)")}
            >
            + Agregar
            </button>
        </div>
        <ul className="list-disc list-inside space-y-2 text-base">
            <li>Reunión de copropietarios programada para el 15 de mayo a las 19:00.</li>
            <li>Se iniciará la limpieza del tanque de agua el 20 de mayo.</li>
            <li>Recordatorio: el pago de mantenimiento vence el 10 de cada mes.</li>
        </ul>
        </div>
      </main>
    </div>
  );
}
