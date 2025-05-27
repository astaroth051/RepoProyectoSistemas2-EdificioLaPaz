import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect, FormEvent } from "react";


interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen?: string;
}

interface Props {
  producto: Producto;
}

// Este sería un producto de ejemplo (en producción vendría desde props o backend)


export default function EditarProducto({ producto }: Props) {
  const [formData, setFormData] = useState({
      nombre: "", 
      descripcion: "",
      precio: 0,
      stock: 0,
      categoria: "",
      imagen: "",
  })
  useEffect(()=>{
    if (producto){
      setFormData({
        nombre: producto.nombre || "", 
        descripcion: producto.descripcion ||"",
        precio: Number(producto.precio) ,
        stock: Number(producto.stock) ,
        categoria: producto.categoria || "",
        imagen: producto.imagen || "",
      });
    }
  }, [producto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "precio" || name === "stock" ? Number(value) : value, 
    });
  };

  const handleSubmit = async (e: FormEvent)  => {
  e.preventDefault();

  try {
    await router.post(`/editar-productos/${producto.id}/update`, {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: formData.precio,
      stock: formData.stock,
      categoria: formData.categoria,
      imagen: formData.imagen,
    });
    alert("Producto actualizado correctamente.");
  } catch (error) {
    console.error("Error actualizando el producto:", error);
  }
};
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <Head title="Editar Producto" />

      <main className="w-full max-w-3xl bg-[#1E3A8A] border-2 border-[#10B981] text-white rounded-xl p-6 md:p-8 shadow-lg overflow-auto">
        <h2 className="text-2xl font-bold text-center mb-8">✏️ Editar Producto</h2>

        <form onSubmit={handleSubmit} className="bg-white text-blue-900 p-6 rounded-xl shadow-md space-y-6">
          <div>
            <label className="block font-semibold mb-1">Nombre del Producto</label>
            <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción</label>
            <input 
            type="text" 
            name="descripcion" 
            value={formData.descripcion} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Precio (Bs.)</label>
              <input 
                type="number" 
                name="precio" 
                value={formData.precio} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded px-4 py-2" 
                 required />
            </div>

            <div>
              <label className="block font-semibold mb-1">Cantidad en stock</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded px-4 py-2" 
                  required />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Categoría</label>
            <input 
              type="text" 
              name="categoria" 
              value={formData.categoria} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Imagen del producto (opcional)</label>
            <input 
            type="text" 
            name="imagen" 
            value={formData.imagen} 
            onChange={handleChange} 
            className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link href="/gestion-articulos" className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow-md">
              Cancelar
            </Link>
            <form onSubmit={handleSubmit}>
            <button type="submit" className="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-6 py-2 rounded shadow-md">
              Guardar Cambios
            </button>
            </form>
          </div>
        </form>
      </main>
    </div>
  );
}
