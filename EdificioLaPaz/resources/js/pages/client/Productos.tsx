import { useState } from "react";
import { Head } from '@inertiajs/react';

export default function Productos() {
  const [busqueda, setBusqueda] = useState("");

  const buscarProducto = () => {
    alert(`Buscando: ${busqueda}`);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white min-h-screen">
      <Head title="Productos" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between md:block">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4"/>
          <h1 className="text-2xl font-bold text-center mb-8">Bienvenido</h1>
          <nav className="flex flex-col gap-4 text-sm font-semibold">
            <a href="/dashboard-client" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
            <a href="/caja-de-ahorro" className="hover:text-[#10B981] text-xl">💰 Caja de Ahorro</a>
            <a href="/plan-de-pagos" className="hover:text-[#10B981] text-xl">📋 Plan de Pagos</a>
            <a href="/logout" className="hover:text-[#10B981] text-xl">🚪 Cerrar Sesión</a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal*/}
      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-gray-900 rounded-tl-3xl flex justify-center items-center w-full max-w-7xl mx-auto">
        <div className="w-full">
          {/* Título */}
          <h2 className="text-center text-2xl font-bold text-white mb-3">
            Productos Micromarket Edificio La Paz
          </h2>
          
          {/* Buscador */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-4 items-center bg-white rounded-full px-6 py-3 shadow-md w-full sm:w-1/2 md:w-1/3">
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar producto..."
                className="outline-none text-gray-800 w-full"
              />
              <button
                onClick={buscarProducto}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-1 rounded-full"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Ficha Compra */}
          <section className="bg-white p-6 rounded-xl shadow-md mb-10">
            <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">Ficha Compra</h1>
            <div className="grid grid-cols-5 gap-4 font-semibold text-center text-blue-900">
              {["Producto", "Cantidad", "Precio Unitario", "Precio Total", "Código Ficha"].map((item) => (
                <div key={item} className="bg-blue-100 p-2 rounded">{item}</div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-4 mt-2 text-center text-sm">
              {Array(5).fill("Ejemplo").map((text, i) => (
                <div key={i} className="bg-gray-100 p-2 rounded text-blue-800">{text}</div>
              ))}
            </div>
          </section>

          {/* Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {productos.map((prod, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden text-center hover:shadow-xl transition p-4 relative"
              >
                <img
                  src={prod.img}
                  alt={prod.nombre}
                  className="w-full h-40 object-contain rounded-md mb-4 bg-gray-100"
                />
                <div className="space-y-2 text-blue-900">
                  <p><strong>Nombre:</strong> {prod.nombre}</p>
                  <p><strong>Categoría:</strong> {prod.categoria}</p>
                  <p><strong>Estado:</strong> {prod.estado}</p>
                  <p><strong>Precio:</strong> {prod.precio}</p>
                  <p><strong>Cantidad:</strong> {prod.cantidad}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const productos = [
  {
    img: "https://carbonell.mx/wp-content/uploads/2023/06/800X800_OlivaClasico_2023-2.png",
    nombre: "Aceite de Oliva",
    categoria: "Alimentos",
    estado: "Disponible",
    precio: "30 Bs",
    cantidad: 15,
  },
  {
    img: "https://aguai.com.bo/wp/wp-content/uploads/2023/02/BOLSA-5-KG-MORENA-EDIT-2-e1630588561180.png",
    nombre: "Azúcar Morena",
    categoria: "Alimentos",
    estado: "Disponible",
    precio: "22 Bs",
    cantidad: 10,
  },
  {
    img: "https://static.wixstatic.com/media/d62617_8e0cbb0902f34c6bb053cb8f0288d2af~mv2.png/v1/fit/w_500,h_500,q_90/file.png",
    nombre: "Jabón Líquido",
    categoria: "Limpieza",
    estado: "Disponible",
    precio: "18 Bs",
    cantidad: 20,
  },
  {
    img: "https://huevoscolorado.com/cdn/shop/products/HuevosMaple30.png?v=1587971745",
    nombre: "Huevo Maple",
    categoria: "Alimentos",
    estado: "Disponible",
    precio: "27 Bs",
    cantidad: 18,
  },
];