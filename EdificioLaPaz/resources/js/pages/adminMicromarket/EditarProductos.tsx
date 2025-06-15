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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.put(`/productos-micromarket/${producto.id}`, {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock, 10),
      id_categoria: categoria,
      estado,
      fecha_restock: fechaRestock,
      imagen,
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
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" required/>
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2"></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Precio (Bs.)</label>
              <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2" required/>
            </div>

            <div>
              <label className="block font-semibold mb-1">Cantidad en stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2" required/>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Categoría</label>
            <select value={categoria} onChange={(e) => setCategoria(Number(e.target.value))} className="w-full border border-gray-300 rounded px-4 py-2">
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Estado</label>
              <select value={estado} onChange={(e) => setEstado(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-4 py-2">
                <option value={1}>
                    Activo
                </option>
                <option value={0}>
                    Inactivo
                </option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Fecha Restock</label>
              <input type="date" value={fechaRestock} onChange={(e) => setFechaRestock(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"/>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Imagen URL</label>
            <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"/>
            {imagen && (
              <img src={imagen} alt="Producto" className="w-32 h-32 object-cover mt-2 border border-gray-300 rounded" />
            )}

          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link href="/productos-micromarket" className="bg-gray-400 hover:bg-gray-500 text-gray-50 font-semibold px-6 py-2 rounded shadow-md">
              Cancelar
            </Link>

            <button type="submit" className="bg-[#10B981] hover:bg-[#059669] text-gray-50 font-semibold px-6 py-2 rounded shadow-md">
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
