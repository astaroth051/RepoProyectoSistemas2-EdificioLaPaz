import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  stock: number;
  imagen?: string | null;
  id_categoria: number;
  estado?: number;
  fecha_restock?: string | null;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface Props {
  producto: Producto;
  categorias: Categoria[];
}

export default function EditarProducto({ producto, categorias }: Props) {
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion ?? "");
  const [precio, setPrecio] = useState(producto.precio.toString());
  const [stock, setStock] = useState(producto.stock.toString());
  const [categoria, setCategoria] = useState(producto.id_categoria);
  const [imagen, setImagen] = useState(producto.imagen ?? "");
  const [estado, setEstado] = useState(producto.estado ?? 1);
  const [fechaRestock, setFechaRestock] = useState(
    producto.fecha_restock ? producto.fecha_restock.split("T")[0] : ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Stock inicial para validar que no sea menor
  const stockInicial = producto.stock;

  // Función para capitalizar texto
  const capitalizarTexto = (texto: string): string => {
    return texto
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  };

  // Función para capitalizar la primera letra mientras se escribe
  const capitalizarPrimeraLetra = (texto: string): string => {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  };

  // Función para validar URL de imagen
  const validarUrlImagen = (url: string): boolean => {
    if (!url) return true; // La imagen es opcional en edición
    const regex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
    return regex.test(url);
  };

  // Función para validar un campo específico
  const validarCampo = (campo: string, valor: string): string => {
    switch (campo) {
      case 'nombre':
        if (!valor.trim()) return 'El nombre es obligatorio';
        if (valor.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
        // Permitir letras, números, espacios, guiones y puntos
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.]+$/.test(valor.trim())) return 'El nombre solo puede contener letras, números, espacios, guiones y puntos';
        return '';

      case 'descripcion':
        if (!valor.trim()) return 'La descripción es obligatoria';
        if (valor.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres';
        if (valor.trim().length > 200) return 'La descripción no puede tener más de 200 caracteres';
        // Permitir letras, números, espacios y caracteres especiales comunes en descripciones
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.\,\;\:\!\¡\?\¿\(\)]+$/.test(valor.trim())) return 'La descripción contiene caracteres no permitidos';
        return '';

      case 'precio':
        const precioNum = parseFloat(valor);
        if (!valor) return 'El precio es obligatorio';
        if (isNaN(precioNum)) return 'El precio debe ser un número válido';
        if (precioNum < 1) return 'El precio debe ser mayor o igual a 1 Bs';
        if (precioNum > 10000) return 'El precio no puede ser mayor a 10,000 Bs';
        return '';

      case 'stock':
        const stockNum = parseInt(valor);
        if (!valor) return 'El stock es obligatorio';
        if (isNaN(stockNum)) return 'El stock debe ser un número válido';
        if (stockNum < stockInicial) return `El stock no puede ser menor al actual (${stockInicial})`;
        if (stockNum > 200) return 'El stock no puede ser mayor a 200 unidades';
        return '';

      case 'imagen':
        if (valor.trim() && !validarUrlImagen(valor.trim())) return 'Debe ser una URL válida de imagen (jpg, jpeg, png, gif, webp)';
        return '';

      case 'categoria':
        if (!valor) return 'Debe seleccionar una categoría';
        return '';

      default:
        return '';
    }
  };

  // Función para validar todos los campos
  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {};

    nuevosErrores.nombre = validarCampo('nombre', nombre);
    nuevosErrores.descripcion = validarCampo('descripcion', descripcion);
    nuevosErrores.precio = validarCampo('precio', precio);
    nuevosErrores.stock = validarCampo('stock', stock);
    nuevosErrores.imagen = validarCampo('imagen', imagen);
    nuevosErrores.categoria = validarCampo('categoria', categoria.toString());

    // Filtrar errores vacíos
    const erroresFiltrados = Object.fromEntries(
      Object.entries(nuevosErrores).filter(([, valor]) => valor !== '')
    );

    setErrors(erroresFiltrados);
    return Object.keys(erroresFiltrados).length === 0;
  };

  // Manejadores de cambio con validación en tiempo real
  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value;

    // Capitalizar la primera letra automáticamente
    valor = capitalizarPrimeraLetra(valor);
    setNombre(valor);

    // Limpiar error si existe
    if (errors.nombre) {
      const nuevoError = validarCampo('nombre', valor);
      setErrors(prev => ({
        ...prev,
        nombre: nuevoError
      }));
    }
  };

  const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let valor = e.target.value;

    // Capitalizar la primera letra automáticamente
    valor = capitalizarPrimeraLetra(valor);
    setDescripcion(valor);

    if (errors.descripcion) {
      const nuevoError = validarCampo('descripcion', valor);
      setErrors(prev => ({
        ...prev,
        descripcion: nuevoError
      }));
    }
  };

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setPrecio(valor);

    if (errors.precio) {
      const nuevoError = validarCampo('precio', valor);
      setErrors(prev => ({
        ...prev,
        precio: nuevoError
      }));
    }
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setStock(valor);

    if (errors.stock) {
      const nuevoError = validarCampo('stock', valor);
      setErrors(prev => ({
        ...prev,
        stock: nuevoError
      }));
    }
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setImagen(valor);

    if (errors.imagen) {
      const nuevoError = validarCampo('imagen', valor);
      setErrors(prev => ({
        ...prev,
        imagen: nuevoError
      }));
    }
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = Number(e.target.value);
    setCategoria(valor);

    if (errors.categoria) {
      const nuevoError = validarCampo('categoria', valor.toString());
      setErrors(prev => ({
        ...prev,
        categoria: nuevoError
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    // Capitalizar nombre y descripción antes de enviar
    const nombreCapitalizado = capitalizarTexto(nombre.trim());
    const descripcionCapitalizada = capitalizarTexto(descripcion.trim());

    router.put(`/productos-micromarket/${producto.id}`, {
      nombre: nombreCapitalizado,
      descripcion: descripcionCapitalizada,
      precio: parseFloat(precio),
      stock: parseInt(stock, 10),
      id_categoria: categoria,
      estado,
      fecha_restock: fechaRestock,
      imagen: imagen.trim(),
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <Head title="Editar Producto" />

      <main className="w-full max-w-3xl bg-[#1E3A8A] border-2 border-[#10B981] text-gray-50 rounded-xl p-6 md:p-8 shadow-lg overflow-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">✏️ Editar Producto</h2>

        <form onSubmit={handleSubmit} className="bg-gray-50 text-gray-900 p-6 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block font-semibold mb-1">Nombre del Producto</label>
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              className={`w-full border rounded px-4 py-2 ${
                errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ej. Coca Cola 2 litros"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción</label>
            <textarea
              value={descripcion}
              onChange={handleDescripcionChange}
              className={`w-full border rounded px-4 py-2 h-24 resize-none ${
                errors.descripcion ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Describe el producto..."
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.descripcion && (
                <p className="text-red-500 text-sm">{errors.descripcion}</p>
              )}
              <p className="text-gray-500 text-sm ml-auto">
                {descripcion.length}/200 caracteres
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Precio (Bs.)</label>
              <input
                type="number"
                step="0.01"
                value={precio}
                onChange={handlePrecioChange}
                className={`w-full border rounded px-4 py-2 ${
                  errors.precio ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                min="1"
                max="10000"
                placeholder="1.00"
              />
              {errors.precio && (
                <p className="text-red-500 text-sm mt-1">{errors.precio}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Cantidad en stock</label>
              <input
                type="number"
                value={stock}
                onChange={handleStockChange}
                className={`w-full border rounded px-4 py-2 ${
                  errors.stock ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                min={stockInicial}
                max="200"
                placeholder={stockInicial.toString()}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Stock actual: {stockInicial} unidades
              </p>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Categoría</label>
            <select
              value={categoria}
              onChange={handleCategoriaChange}
              className={`w-full border rounded px-4 py-2 ${
                errors.categoria ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            {errors.categoria && (
              <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Estado</label>
              <select
                value={estado}
                onChange={(e) => setEstado(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Fecha Restock</label>
              <input
                type="date"
                value={fechaRestock}
                onChange={(e) => setFechaRestock(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">URL de la imagen del producto</label>
            <input
              type="url"
              value={imagen}
              onChange={handleImagenChange}
              className={`w-full border rounded px-4 py-2 ${
                errors.imagen ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.imagen && (
              <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>
            )}
            <p className="text-gray-600 text-sm mt-1">
              Formatos aceptados: JPG, JPEG, PNG, GIF, WEBP (opcional)
            </p>
            {imagen && (
              <img
                src={imagen}
                alt="Producto"
                className="w-32 h-32 object-cover mt-2 border border-gray-300 rounded"
              />
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link
              href="/productos-micromarket"
              className="bg-gray-400 hover:bg-gray-500 text-gray-50 font-semibold px-6 py-2 rounded shadow-md transition-colors"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="bg-[#10B981] hover:bg-[#059669] text-gray-50 font-semibold px-6 py-2 rounded shadow-md transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
