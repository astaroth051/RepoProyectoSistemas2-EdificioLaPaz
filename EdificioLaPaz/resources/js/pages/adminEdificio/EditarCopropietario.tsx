import { useEffect, useState, FormEvent } from "react";
import { Head, Link, router } from "@inertiajs/react";

interface Copropietario {
  id_user: number;
  name: string;
  lastname: string;
  telefono: string;
  email: string;
  rol: string;
  departamento_id?: number;
}

interface Departamento {
  id_departamentos: number;
  descripcion: string;
}

interface Props {
  copropietario: Copropietario;
  departamentos: Departamento[];
}

export default function EditarCopropietario({ copropietario, departamentos }: Props) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    rol: "",
    departamento_id: 0,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Función para validar que solo contenga letras y espacios
  const validateTextOnly = (text: string): boolean => {
    const textRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return textRegex.test(text);
  };

  // Función para validar teléfono (solo 8 números)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
  };

  // Función para validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para capitalizar primera letra de cada palabra
  const capitalizeWords = (text: string): string => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    if (copropietario) {
      setFormData({
        nombre: copropietario.name || "",
        apellido: copropietario.lastname || "",
        telefono: copropietario.telefono || "",
        email: copropietario.email || "",
        rol: copropietario.rol || "",
        departamento_id: copropietario.departamento_id || 0,
      });
    }
  }, [copropietario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Limpiar error específico del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Validaciones en tiempo real
    switch (name) {
      case "nombre":
      case "apellido":
        // Solo permitir letras, espacios y caracteres especiales del español
        if (value === "" || validateTextOnly(value)) {
          // Capitalizar automáticamente
          const capitalizedValue = capitalizeWords(value);
          setFormData(prev => ({ ...prev, [name]: capitalizedValue }));
        }
        break;

      case "telefono":
        // Solo permitir números y máximo 8 dígitos
        if (value === "" || (/^\d+$/.test(value) && value.length <= 8)) {
          setFormData(prev => ({ ...prev, [name]: value }));
        }
        break;

      case "departamento_id":
        setFormData(prev => ({
          ...prev,
          [name]: Number(value)
        }));
        break;

      default:
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (!validateTextOnly(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras";
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (!validateTextOnly(formData.apellido)) {
      newErrors.apellido = "El apellido solo puede contener letras";
    }

    // Validar teléfono
    if (!formData.telefono) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!validatePhone(formData.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 8 números";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
    }

    // Validar rol
    if (!formData.rol) {
      newErrors.rol = "Debe seleccionar un rol";
    }

    // Validar departamento
    if (!formData.departamento_id || formData.departamento_id === 0) {
      newErrors.departamento_id = "Debe seleccionar un departamento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Por favor corrija los errores en el formulario");
      return;
    }

    router.post(`/api/copropietarios/${copropietario.id_user}/update`, {
      name: formData.nombre,
      lastname: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
      rol: formData.rol,
      departamento_id: formData.departamento_id,
    }, {
      onSuccess: () => {
        router.visit("/gestion-copropietarios");
      },
      onError: (errors) => {
        console.error("Errores:", errors);
        alert("Hubo un error al actualizar el copropietario.");
      },
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
              <label className="block font-semibold mb-1" htmlFor="nombre">Nombre *</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="apellido">Apellido *</label>
              <input
                id="apellido"
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="telefono">Teléfono *</label>
              <input
                id="telefono"
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                maxLength={8}
                required
              />
              {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
              <p className="text-gray-500 text-xs mt-1">Debe contener exactamente 8 números</p>
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="rol">Rol *</label>
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.rol ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Seleccionar Rol</option>
                <option value="copropietario">Copropietario</option>
                <option value="dueño">Dueño</option>
              </select>
              {errors.rol && <p className="text-red-500 text-sm mt-1">{errors.rol}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="departamento_id">Departamento *</label>
              <select
                id="departamento_id"
                name="departamento_id"
                value={formData.departamento_id}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.departamento_id ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Seleccionar Departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep.id_departamentos} value={dep.id_departamentos}>
                    {dep.descripcion}
                  </option>
                ))}
              </select>
              {errors.departamento_id && <p className="text-red-500 text-sm mt-1">{errors.departamento_id}</p>}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link
              href="/gestion-copropietarios"
              className="bg-gray-300 text-blue-900 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
