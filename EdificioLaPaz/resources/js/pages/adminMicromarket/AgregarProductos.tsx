import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function AgregarProductos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState(""); 
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagen.trim()) {
      alert("Debes ingresar la URL de la imagen.");
      return;
    }

    router.post("/productos-micromarket", {
      nombre,
      descripcion,
      categoria,
      precio,
      stock,
      imagen,
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <Head title="Agregar Producto" />

      <main className="w-full max-w-3xl bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-xl p-6 md:p-8 shadow-lg overflow-auto">
        <h2 className="text-2xl font-bold text-center mb-8">➕ Agregar Nuevo Producto</h2>

        <form onSubmit={handleSubmit} className="bg-white text-blue-900 p-6 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block font-semibold mb-1">Nombre del Producto</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" required/>
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" required/>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Precio (Bs.)</label>
              <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2"
                required step="0.01" min="0"/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Categoría</label>
              <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" required/>
            </div>
            <div>
              <label className="block font-semibold mb-1">Cantidad en stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2"
                required min="0"/>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">URL de la imagen del producto</label>
            <input type="url" placeholder="https://ejemplo.com/imagen.jpg" value={imagen} onChange={(e) => setImagen(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2" required/>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link href="/productos-micromarket" className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow-md">
              Cancelar
            </Link>
            <button type="submit" className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-6 py-2 rounded shadow-md">
              Guardar Producto
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
