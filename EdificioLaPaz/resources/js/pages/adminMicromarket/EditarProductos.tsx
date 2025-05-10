import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen?: string;
}

// Este sería un producto de ejemplo (en producción vendría desde props o backend)
const productoEjemplo: Producto = {
  id: 1,
  nombre: "Coca-Cola 500ml",
  descripcion: "Bebida refrescante",
  precio: 7,
  stock: 15,
  imagen: "https://via.placeholder.com/150",
};

export default function EditarProducto() {
  const [nombre, setNombre] = useState(productoEjemplo.nombre);
  const [descripcion, setDescripcion] = useState(productoEjemplo.descripcion);
  const [precio, setPrecio] = useState(productoEjemplo.precio.toString());
  const [stock, setStock] = useState(productoEjemplo.stock.toString());
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nombre,
      descripcion,
      precio,
      stock,
      imagen: imagen ? imagen.name : "imagen anterior",
    });
    alert("Producto editado");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <Head title="Editar Producto" />

      <main className="w-full max-w-3xl bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-xl p-6 md:p-8 shadow-lg overflow-auto">
        <h2 className="text-2xl font-bold text-center mb-8">✏️ Editar Producto</h2>

        <form onSubmit={handleSubmit} className="bg-white text-blue-900 p-6 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block font-semibold mb-1">Nombre del Producto</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" required/>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Precio (Bs.)</label>
              <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" required/>
            </div>

            <div>
              <label className="block font-semibold mb-1">Cantidad en stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2"required/>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Imagen del producto (opcional)</label>
            <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files?.[0] || null)} className="w-full"/>
            {productoEjemplo.imagen && (
              <img src={productoEjemplo.imagen} alt="Producto actual" className="w-32 h-32 object-cover mt-2 border border-gray-300 rounded"/>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link href="/productos-micromarket" className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow-md">
              Cancelar
            </Link>
            <button type="submit" className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-6 py-2 rounded shadow-md">
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
