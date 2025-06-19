import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";

interface Copropietario {
  id: number;
  nombre: string;
  apellido: string;
  rol: string;
}

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  showButtons?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  message,
  type,
  showButtons = false,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}) => {
  if (!visible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: "✅",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
          buttonColor: "bg-green-600 hover:bg-green-700"
        };
      case "error":
        return {
          icon: "❌",
          bgColor: "bg-red-100",
          textColor: "text-red-600",
          buttonColor: "bg-red-600 hover:bg-red-700"
        };
      case "warning":
        return {
          icon: "⚠️",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-600",
          buttonColor: "bg-yellow-600 hover:bg-yellow-700"
        };
      case "info":
        return {
          icon: "ℹ️",
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
          buttonColor: "bg-blue-600 hover:bg-blue-700"
        };
      default:
        return {
          icon: "ℹ️",
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
          buttonColor: "bg-blue-600 hover:bg-blue-700"
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop oscuro */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          {/* Header con icono */}
          <div className="flex items-center mb-4">
            <div className={`flex-shrink-0 w-10 h-10 mx-auto flex items-center justify-center rounded-full ${styles.bgColor} ${styles.textColor}`}>
              {styles.icon}
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900">{title}</h3>
          </div>

          {/* Mensaje */}
          <div className="mb-6">
            <p className="text-gray-700 text-center">{message}</p>
          </div>

          {/* Botones */}
          <div className="flex justify-center space-x-3">
            {showButtons ? (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 text-white rounded-md transition-colors ${styles.buttonColor}`}
                >
                  {confirmText}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className={`px-6 py-2 text-white rounded-md transition-colors ${styles.buttonColor}`}
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function GestionAdminMicromarket({ copropietarios: iniciales = [] }: { copropietarios?: Copropietario[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [copropietarios, setCopropietarios] = useState(iniciales);
  const [modalState, setModalState] = useState<{
    visible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    showButtons: boolean;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    showButtons: false
  });

  // Contar administradores activos
  const administradoresActivos = copropietarios.filter(c => c.rol === 'administrador').length;

  const showModal = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message: string,
    showButtons: boolean = false,
    onConfirm?: () => void,
    confirmText?: string,
    cancelText?: string
  ) => {
    setModalState({
      visible: true,
      type,
      title,
      message,
      showButtons,
      onConfirm,
      confirmText,
      cancelText
    });
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      visible: false
    }));
  };

  const executeToggle = async (id: number) => {
    try {
      const response = await fetch(`/copropietarios/${id}/toggle-rol`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
        },
      });

      const data = await response.json();
      if (data.success) {
        // Obtener el copropietario antes de actualizar para el mensaje
        const copropietario = copropietarios.find(c => c.id === id);

        // Actualizar estado local
        setCopropietarios(prev => {
          // Si estamos activando un administrador, primero desactivamos todos los demás
          if (data.rol === 'administrador') {
            return prev.map(c => ({
              ...c,
              rol: c.id === id ? 'administrador' : 'copropietario'
            }));
          } else {
            // Si estamos desactivando, solo cambiamos el rol del seleccionado
            return prev.map(c =>
              c.id === id ? { ...c, rol: data.rol } : c
            );
          }
        });

        // Mostrar mensaje de éxito con modal
        if (data.rol === 'administrador') {
          showModal(
            'success',
            'Administrador Activado',
            `${copropietario?.nombre} ${copropietario?.apellido} ahora es el administrador del micromarket.`
          );
        } else {
          showModal(
            'success',
            'Administrador Desactivado',
            `${copropietario?.nombre} ${copropietario?.apellido} ya no es administrador del micromarket.`
          );
        }
      } else {
        showModal(
          'error',
          'Error',
          'No se pudo cambiar el estado del administrador. Inténtelo nuevamente.'
        );
      }
    } catch (error) {
      console.error("Error al cambiar el rol:", error);
      showModal(
        'error',
        'Error de Conexión',
        'Ocurrió un error al comunicarse con el servidor. Inténtelo nuevamente.'
      );
    }
  };

  const toggleEstado = async (id: number) => {
    const copropietario = copropietarios.find(c => c.id === id);
    if (!copropietario) return;

    // Si el copropietario ya es administrador (quiere desactivar)
    if (copropietario.rol === 'administrador') {
      // Si es el único administrador, mostrar modal de advertencia
      if (administradoresActivos === 1) {
        showModal(
          'warning',
          'Desactivar Último Administrador',
          'Esto dejará al micromarket sin administrador activo. ¿Está seguro de que desea continuar?',
          true,
          () => {
            executeToggle(id);
            closeModal();
          },
          'Sí, Desactivar',
          'Cancelar'
        );
      } else {
        // Si hay más de un administrador, desactivar directamente
        await executeToggle(id);
      }
    } else {
      // Si quiere activar como administrador
      // Si ya hay un administrador, mostrar modal informativo
      if (administradoresActivos >= 1) {
        showModal(
          'info',
          'Múltiples Administradores',
          'Ya existe un administrador activo. Al activar este copropietario como administrador, el anterior será desactivado automáticamente. ¿Desea continuar?',
          true,
          () => {
            executeToggle(id);
            closeModal();
          },
          'Sí, Cambiar Administrador',
          'Cancelar'
        );
      } else {
        // Si no hay administradores, activar directamente
        await executeToggle(id);
      }
    }
  };

  const filtrados = copropietarios
    .filter(c => {
      const termino = busqueda.toLowerCase();
      return (
        c.nombre.toLowerCase().includes(termino) ||
        c.apellido.toLowerCase().includes(termino)
      );
    })
    .sort((a, b) =>
      `${a.apellido} ${a.nombre}`.localeCompare(`${b.apellido} ${b.nombre}`)
    );

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head title="Gestion Administrador Micromarket" />

      {/* Modal */}
      <Modal
        visible={modalState.visible}
        onClose={closeModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        showButtons={modalState.showButtons}
        onConfirm={modalState.onConfirm}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
      />

      <div className="md:flex flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between">
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-center mb-8">Admin Edificio La Paz</h1>
            <nav className="flex flex-col gap-4 text-sm font-semibold text-center md:text-left">
              <a href="/dashboard-edificio" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
              <a href="/gestion-copropietarios" className="hover:text-[#10B981] text-xl">🤝 Gestión de Copropietario</a>
              <a href="/cajas-ahorro-copropietario" className="hover:text-[#10B981] text-xl">📊 Cajas de Ahorro Copropietarios</a>
              <button onClick={handleLogout} className="hover:text-[#10B981] text-xl text-left w-full">🚪 Cerrar Sesión</button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto overflow-x-auto bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-tl-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">Gestión Administrador Micromarket</h2>

          {/* Indicador de estado del mercado */}
          <div className="mb-4 text-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              administradoresActivos > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {administradoresActivos > 0
                ? `✅ Micromarket Activo (${administradoresActivos} administrador${administradoresActivos > 1 ? 'es' : ''})`
                : '❌ Micromarket Inactivo (Sin administrador)'
              }
            </div>
          </div>

          <div className="mb-4 text-center">
            <input
              type="text"
              placeholder="Buscar por nombre o apellido"
              className="bg-white px-4 py-2 rounded-md border border-gray-300 w-full max-w-md text-black"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>

          <div className="bg-white text-blue-900 rounded-xl shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-100 text-blue-800">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold">Nombre</th>
                  <th className="px-6 py-3 text-sm font-semibold">Apellido</th>
                  <th className="px-6 py-3 text-sm font-semibold">Estado Administrador</th>
                  <th className="px-6 py-3 text-sm font-semibold">Acción</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filtrados.map(copro => (
                  <tr key={copro.id} className={copro.rol === 'administrador' ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 font-medium">{copro.nombre}</td>
                    <td className="px-6 py-4 font-medium">{copro.apellido}</td>
                    <td className="px-6 py-4">
                      {copro.rol === 'administrador' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✅ Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          ❌ Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleEstado(copro.id)}
                        className={`px-4 py-2 rounded-md text-white font-semibold shadow-md transition-colors ${
                          copro.rol === 'administrador'
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {copro.rol === 'administrador' ? "🔴 Desactivar" : "🟢 Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500">
                      No se encontraron copropietarios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Información adicional */}
          <div className="mt-6 bg-blue-100 text-blue-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">ℹ️ Información Importante:</h3>
            <ul className="text-sm space-y-1">
              <li>• Solo puede haber un administrador activo del micromarket</li>
              <li>• Si activa un nuevo administrador, el anterior será desactivado automáticamente</li>
              <li>• Si desactiva al último administrador, el micromarket quedará inactivo</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
