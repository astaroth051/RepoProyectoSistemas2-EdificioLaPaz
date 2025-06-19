import { Head, Link, router } from "@inertiajs/react";
import { FormEvent, useState } from "react";

type Departamento = {
  id: number;
  descripcion: string;
};

interface Props {
  departamentos: Departamento[];
}

export default function AgregarCopropietario({ departamentos }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    telefono: "",
    email: "",
    password: "12345678",
    rol: "copropietario",
    departamento_id: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Limpiar error específico del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Validaciones en tiempo real
    switch (name) {
      case "name":
      case "lastname":
        // Solo permitir letras, espacios y caracteres especiales del español
        if (value === "" || validateTextOnly(value)) {
          // Capitalizar automáticamente
          const capitalizedValue = capitalizeWords(value);
          setFormData({ ...formData, [name]: capitalizedValue });
        }
        break;

      case "telefono":
        // Solo permitir números y máximo 8 dígitos
        if (value === "" || (/^\d+$/.test(value) && value.length <= 8)) {
          setFormData({ ...formData, [name]: value });
        }
        break;

      case "password":
        // No permitir modificar la contraseña
        break;

      default:
        setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (!validateTextOnly(formData.name)) {
      newErrors.name = "El nombre solo puede contener letras";
    }

    // Validar apellido
    if (!formData.lastname.trim()) {
      newErrors.lastname = "El apellido es obligatorio";
    } else if (!validateTextOnly(formData.lastname)) {
      newErrors.lastname = "El apellido solo puede contener letras";
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

    // Validar departamento
    if (!formData.departamento_id) {
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
              <label className="block font-semibold mb-1">Nombre *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Ricardo"
                className={`w-full px-4 py-2 rounded border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Apellido *</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Ej: Arjona"
                className={`w-full px-4 py-2 rounded border ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Celular *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 78945612"
                className={`w-full px-4 py-2 rounded border ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                maxLength={8}
                required
              />
              {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
              <p className="text-gray-500 text-xs mt-1">Debe contener exactamente 8 números</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej: correo@ejemplo.com"
                className={`w-full px-4 py-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                readOnly
                className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 cursor-not-allowed"
                title="La contraseña está predefinida y no se puede modificar"
              />
              <p className="text-gray-500 text-xs mt-1">Contraseña predefinida (no modificable)</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">Rol</label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300"
              >
                <option value="copropietario">Copropietario</option>
                <option value="dueño">Dueño</option>
                <option value="administrador">Administrador Micromarket</option>
              </select>
              <p className="text-gray-500 text-xs mt-1">Rol predeterminado: Copropietario</p>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Departamento *</label>
              <select
                name="departamento_id"
                value={formData.departamento_id}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.departamento_id ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Seleccionar departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep.id} value={dep.id}>
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
              className="bg-[#10B981] text-white px-6 py-2 rounded hover:bg-[#059669] transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
