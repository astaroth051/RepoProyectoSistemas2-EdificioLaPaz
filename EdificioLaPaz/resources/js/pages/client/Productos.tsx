import { useEffect, useState } from "react";
import axios from "axios";
import { Head } from '@inertiajs/react';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  estado: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export default function Productos() {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [codigoFicha, setCodigoFicha] = useState(`FICHA-${Math.floor(Math.random() * 10000)}`);

  // Obtener productos de la API
  const obtenerProductos = async () => {
    try {
      setCargando(true);
      setError("");

      console.log("Solicitando productos con búsqueda:", busqueda || "ninguna");

      const response = await axios.get('/api/productos', {
        params: { busqueda }
      });

      console.log("Productos recibidos:", response.data);
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos", error);
      setError("No se pudieron cargar los productos. Por favor intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Buscar productos cuando cambia el término de búsqueda
  const buscarProducto = () => {
    obtenerProductos();
  };

  // Agregar producto al carrito
  const agregarAlCarrito = (producto: Producto) => {
    // Verificar si hay stock disponible
    if (producto.cantidad <= 0) {
      alert("Lo sentimos, este producto está agotado.");
      return;
    }

    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      // Si ya está en el carrito y hay stock, aumentamos la cantidad
      if (itemExistente.cantidad < producto.cantidad) {
        setCarrito(carrito.map(item =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ));
      } else {
        alert("No hay más unidades disponibles de este producto.");
      }
    } else {
      // Si no está en el carrito, lo agregamos con cantidad 1
      setCarrito([...carrito, { producto, cantidad: 1 }]);
    }
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter(item => item.producto.id !== id));
  };

  // Calcular el total de la compra
  const totalCompra = carrito.reduce((total, item) =>
    total + (item.producto.precio * item.cantidad), 0);

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
            <a href="/productos" className="text-[#10B981] text-xl font-bold">🛒 Productos</a>
          </nav>
        </div>
      </aside>

      {/* Contenido principal*/}
      <main className="flex-1 p-6 md:p-12 bg-[#1E3A8A] border-4 border-[#10B981] text-gray-900 rounded-tl-3xl flex justify-center items-start w-full max-w-7xl mx-auto overflow-y-auto">
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
                onKeyPress={(e) => e.key === 'Enter' && buscarProducto()}
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
          {carrito.length > 0 && (
            <section className="bg-white p-6 rounded-xl shadow-md mb-10">
              <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">Ficha Compra</h1>
              <div className="grid grid-cols-5 gap-4 font-semibold text-center text-blue-900 mb-2">
                <div className="bg-blue-100 p-2 rounded">Producto</div>
                <div className="bg-blue-100 p-2 rounded">Cantidad</div>
                <div className="bg-blue-100 p-2 rounded">Precio Unitario</div>
                <div className="bg-blue-100 p-2 rounded">Precio Total</div>
                <div className="bg-blue-100 p-2 rounded">Acciones</div>
              </div>

              {carrito.map((item) => (
                <div key={item.producto.id} className="grid grid-cols-5 gap-4 mt-2 text-center items-center">
                  <div className="bg-gray-100 p-2 rounded text-blue-800">{item.producto.nombre}</div>
                  <div className="bg-gray-100 p-2 rounded text-blue-800">{item.cantidad}</div>
                  <div className="bg-gray-100 p-2 rounded text-blue-800">{item.producto.precio} Bs</div>
                  <div className="bg-gray-100 p-2 rounded text-blue-800">{(item.producto.precio * item.cantidad).toFixed(2)} Bs</div>
                  <div className="bg-gray-100 p-2 rounded">
                    <button
                      onClick={() => eliminarDelCarrito(item.producto.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6 flex justify-between items-center border-t pt-4">
                <div className="text-lg font-bold">
                  Código Ficha: <span className="text-blue-700">{codigoFicha}</span>
                </div>
                <div className="text-xl font-bold text-blue-800">
                  Total: {totalCompra.toFixed(2)} Bs
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
                  Finalizar Compra
                </button>
              </div>
            </section>
          )}

          {/* Estado de carga y errores */}
          {cargando && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              <p className="mt-2 text-white">Cargando productos...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
            </div>
          )}

          {!cargando && !error && productos.length === 0 && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
              <p className="text-center">No se encontraron productos disponibles.</p>
            </div>
          )}

          {/* Lista de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {productos.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden text-center hover:shadow-xl transition p-4 relative"
              >
                <img
                  src={prod.imagen || 'https://via.placeholder.com/150?text=Sin+Imagen'}
                  alt={prod.nombre}
                  className="w-full h-40 object-contain rounded-md mb-4 bg-gray-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/150?text=Sin+Imagen';
                  }}
                />
                <div className="space-y-2 text-blue-900">
                  <p className="font-bold">{prod.nombre}</p>
                  <p><strong>Categoría:</strong> {prod.categoria || 'General'}</p>
                  <p><strong>Estado:</strong> {prod.estado}</p>
                  <p><strong>Precio:</strong> {prod.precio} Bs</p>
                  <p>
                    <strong>Disponibles:</strong>
                    <span className={prod.cantidad > 0 ? 'text-green-600' : 'text-red-600'}>
                      {" "}{prod.cantidad || 0}
                    </span>
                  </p>

                  <button
                    onClick={() => agregarAlCarrito(prod)}
                    disabled={prod.cantidad <= 0}
                    className={`mt-2 w-full py-2 px-4 rounded-md ${
                      prod.cantidad > 0
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    }`}
                  >
                    {prod.cantidad > 0 ? 'Agregar al carrito' : 'Agotado'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
