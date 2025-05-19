import { useEffect, useState } from "react";
import axios from "axios";
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

interface Producto {
    id_productos: number;
    nombre: string;
    categoria: string;
    estado: string;
    precio: number;
    stock: number;
    imagen: string;
}

interface ItemCarrito {
    producto: Producto;
    cantidad: number;
}



export default function Productos() {
    // 📦 Obtener props desde Inertia
    const { carrito: carritoProp, total: totalProp, codigo_ficha, fecha } = usePage().props as {
        carrito?: ItemCarrito[];
        total?: number;
        codigo_ficha?: string;
        fecha?: string;
    };

    // 📦 Carrito inicial desde localStorage (por si recarga la página)
    const carritoLocalStorage: ItemCarrito[] = (() => {
        try {
            const stored = localStorage.getItem("carrito");
            const parsed = stored ? JSON.parse(stored) : [];
            if (Array.isArray(parsed)) {
                return parsed.filter(
                    (item) =>
                        item &&
                        typeof item.cantidad === "number" &&
                        item.producto &&
                        typeof item.producto.precio === "number"
                );
            }
        } catch (e) {
            console.warn("Error al parsear el carrito desde localStorage", e);
        }
        return [];
    })();

    // 🛒 Usar primero el carrito recibido desde PlanDePagos (si existe), si no, el del localStorage
    const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
        if (carritoProp && Array.isArray(carritoProp)) {
            return carritoProp.map((item) => ({
                producto: item.producto,
                cantidad: Number(item.cantidad)
            }));
        }
        return carritoLocalStorage;
    });

    // Otros estados
    const [busqueda, setBusqueda] = useState("");
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // 🧾 Código de ficha (si se trajo desde PlanDePagos lo usamos, si no, generamos uno)
    const [codigoFicha, setCodigoFicha] = useState(() =>
        codigo_ficha || localStorage.getItem("codigoFicha") || `FICHA-${Math.floor(Math.random() * 10000)}`
    );

    const obtenerProductos = async (terminoBusqueda: string = "") => {
        try {
            setCargando(true);
            setError("");
            const response = await axios.get('/api/productos', {
                params: { busqueda: terminoBusqueda }
            });

            const productosNormalizados = response.data.map((prod: any) => ({
                ...prod,
                id: Number(prod.id),
                precio: Number(prod.precio),
                stock: Number(prod.stock)
            }));

            setProductos(productosNormalizados);
        } catch (error) {
            console.error("Error al obtener productos", error);
            setError("No se pudieron cargar los productos. Por favor intenta nuevamente.");
        } finally {
            setCargando(false);
        }
    };
    useEffect(() => {
        localStorage.removeItem("codigoFicha");
        localStorage.removeItem("totalCompra");
    }, []);

    useEffect(() => {
        obtenerProductos(busqueda);
    }, [busqueda]);

    // Normalizar carrito cuando llegan los productos desde el backend
    useEffect(() => {
        const normalizarCarrito = () => {
            if (!productos.length || !carrito.length) return;

            const nuevosItems: ItemCarrito[] = [];

            carrito.forEach((item) => {
                if (!item.producto.id_productos) {
                    const prodReal = productos.find(p => p.nombre === item.producto.nombre);
                    if (prodReal) {
                        nuevosItems.push({
                            producto: prodReal,
                            cantidad: item.cantidad
                        });
                    }
                } else {
                    nuevosItems.push(item);
                }
            });

            setCarrito(nuevosItems);
        };

        normalizarCarrito();
    }, [productos]);

    const buscarProducto = () => {
        obtenerProductos(busqueda);
    };

    const agregarAlCarrito = (producto: Producto) => {
        setCarrito(prevCarrito => {
            // Buscar si el producto ya está en el carrito
            const productoExistenteIndex = prevCarrito.findIndex(
                item => Number(item.producto.id_productos) === Number(producto.id_productos)
            );

            if (productoExistenteIndex >= 0) {
                // Si existe, actualizamos la cantidad
                const nuevoCarrito = [...prevCarrito];
                const itemExistente = nuevoCarrito[productoExistenteIndex];

                // Verificar que no exceda el stock disponible
                // Se usa producto.stock del producto que se está intentando agregar,
                // que debería tener la información de stock más actualizada desde la lista de productos.
                const nuevaCantidad = Math.min(
                    itemExistente.cantidad + 1,
                    producto.stock
                );

                nuevoCarrito[productoExistenteIndex] = {
                    ...itemExistente,
                    cantidad: nuevaCantidad
                };

                return nuevoCarrito;
            } else {
                // Si no existe y hay stock, lo agregamos
                if (producto.stock > 0) {
                    return [...prevCarrito, { producto, cantidad: 1 }];
                }
                // Si el producto no tiene stock, no se agrega al carrito
                return prevCarrito;
            }
        });
    };

    const eliminarDelCarrito = (id: number) => {
        setCarrito(prev => prev.filter(item => Number(item.producto.id_productos) !== Number(id)));
    };

    const actualizarCantidad = (productoId: number, nuevaCantidad: number) => {
        if (nuevaCantidad < 1) { // Si la cantidad es menor a 1, no hacer nada (o podrías eliminarlo si es 0)
            // Para eliminar, ya existe eliminarDelCarrito. Aquí solo evitamos que sea < 1.
            return;
        }

        setCarrito(prev =>
            prev.map(item => {
                if (item.producto.id_productos === productoId) {
                    // Encontrar el producto original en la lista de productos para verificar el stock actual
                    const productoOriginal = productos.find(p => p.id_productos === productoId);
                    const cantidadMaxima = productoOriginal ? productoOriginal.stock : item.producto.stock; // Fallback al stock del item si no se encuentra (aunque debería)

                    return {
                        ...item,
                        cantidad: Math.min(nuevaCantidad, cantidadMaxima) // No exceder el stock
                    };
                }
                return item;
            })
        );
    };

    const totalCompra = carrito.reduce((total, item) => {
        if (!item.producto || typeof item.producto.precio !== 'number') return total;
        return total + (item.producto.precio * item.cantidad);
    }, 0);

    const finalizarCompra = () => {
        if (carrito.length === 0) {
            alert("No hay productos en el carrito");
            return;
        }

        const compra = {
            codigo_ficha: codigoFicha,
            productos: carrito.map(item => ({
                producto_id: item.producto.id_productos,
                nombre: item.producto.nombre,
                cantidad: item.cantidad,
                precio_unitario: item.producto.precio,
                subtotal: item.producto.precio * item.cantidad
            })),
            total: totalCompra,
            fecha: new Date().toISOString()
        };

        router.post('/plan-de-pagos', {
            codigo_ficha: codigoFicha,
            productos: carrito.map(item => ({
                producto_id: item.producto.id_productos,
                nombre: item.producto.nombre,
                cantidad: item.cantidad,
                precio_unitario: item.producto.precio,
                subtotal: item.producto.precio * item.cantidad
            })),
            total: totalCompra,
            fecha: new Date().toISOString(),
        });
    };

    return (
        <div className="flex flex-col md:flex-row bg-white min-h-screen">
            <Head title="Productos" />

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#1E3A8A] text-white p-6 flex flex-col justify-between md:block">
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/107/107831.png" alt="Logo" className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-center mb-8">Bienvenido</h1>
                    <nav className="flex flex-col gap-4 text-sm font-semibold">
                        <a href="/dashboard-client" className="hover:text-[#10B981] text-xl">🏠 Inicio</a>
                        <a href="/caja-de-ahorro" className="hover:text-[#10B981] text-xl">💰 Caja de Ahorro</a>
                        {/*<a href="/plan-de-pagos" className="hover:text-[#10B981] text-xl">📋 Plan de Pagos</a>*/}
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

                    {/* Carrito de compras */}
                    {carrito.length > 0 && (
                        <section className="bg-white p-6 rounded-xl shadow-md mb-10">
                            <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">Ficha Compra</h1>

                            {/* Encabezados de la tabla */}
                            <div className="grid grid-cols-5 gap-4 font-semibold text-center text-blue-900 mb-2">
                                <div className="bg-blue-100 p-2 rounded">Producto</div>
                                <div className="bg-blue-100 p-2 rounded">Cantidad</div>
                                <div className="bg-blue-100 p-2 rounded">Precio Unitario</div>
                                <div className="bg-blue-100 p-2 rounded">Precio Total</div>
                                <div className="bg-blue-100 p-2 rounded">Acciones</div>
                            </div>

                            {/* Items del carrito */}
                            {carrito.map((item, index) => {
                                const producto = item.producto;
                                const idProducto = producto?.id_productos;

                                if (!producto || typeof idProducto !== "number") {
                                    //console.warn("Item de carrito inválido:", item);
                                    return null; // No renderizar si el producto no está bien estructurado
                                }

                                const productoEnStock = productos.find(p => p.id_productos === idProducto);
                                const stockDisponible = productoEnStock ? productoEnStock.stock : producto.stock;

                                return (
                                    <div key={`carrito-${idProducto}-${index}`} className="grid grid-cols-5 gap-4 mt-2 text-center items-center">
                                        <div className="bg-gray-100 p-2 rounded text-blue-800">{producto.nombre}</div>
                                        <div className="bg-gray-100 p-2 rounded text-blue-800 flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => actualizarCantidad(idProducto, item.cantidad - 1)}
                                                className="px-2 py-1 bg-blue-300 rounded disabled:opacity-50"
                                                disabled={item.cantidad <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.cantidad}</span>
                                            <button
                                                onClick={() => actualizarCantidad(idProducto, item.cantidad + 1)}
                                                className="px-2 py-1 bg-blue-300 rounded disabled:opacity-50"
                                                disabled={item.cantidad >= stockDisponible}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="bg-gray-100 p-2 rounded text-blue-800">
                                            {Number(producto.precio).toFixed(2)} Bs
                                        </div>
                                        <div className="bg-gray-100 p-2 rounded text-blue-800">
                                            {(Number(producto.precio) * Number(item.cantidad)).toFixed(2)} Bs
                                        </div>
                                        <div className="bg-gray-100 p-2 rounded">
                                            <button
                                                onClick={() => eliminarDelCarrito(idProducto)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}


                            {/* Total y acciones */}
                            <div className="mt-6 flex justify-between items-center border-t pt-4">
                                <div className="text-lg font-bold">
                                    Código Ficha: <span className="text-blue-700">{codigoFicha}</span>
                                </div>
                                <div className="text-xl font-bold text-blue-800">
                                    Total: {(Number(totalCompra)).toFixed(2)} Bs
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={finalizarCompra}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg"
                                >
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
                                key={prod.id_productos}
                                className="bg-white rounded-xl shadow-lg overflow-hidden text-center hover:shadow-xl transition p-4 relative"
                            >
                                <img
                                    src={prod.imagen || "https://via.placeholder.com/150?text=Sin+Imagen"}
                                    alt={prod.nombre}
                                    className="w-full h-48 object-contain mb-4"
                                    onError={(e) => {
                                        const imgElement = e.target as HTMLImageElement;
                                        imgElement.onerror = null; // Previene loop infinito si la imagen fallback también falla
                                        imgElement.src = "/images/LogoMarket.png"; // Asegúrate que esta ruta es correcta en tu proyecto public
                                    }}
                                />
                                <div className="space-y-2 text-blue-900">
                                    <p className="font-bold">{prod.nombre}</p>
                                    <p><strong>Categoría:</strong> {prod.categoria || 'General'}</p>
                                    <p><strong>Precio:</strong> {(Number(prod.precio)).toFixed(2)} Bs</p>
                                    <p>
                                        <strong>Disponibles:</strong>
                                        <span className={prod.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                                            {" "}{prod.stock || 0}
                                        </span>
                                    </p>

                                    {/* ID oculto en la vista pero presente en el código */}
                                    <span style={{ display: "none" }}>{prod.id_productos}</span>

                                    <button
                                        onClick={() => agregarAlCarrito(prod)}
                                        disabled={prod.stock <= 0}
                                        className={`mt-2 w-full py-2 px-4 rounded-md ${prod.stock > 0
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-300 cursor-not-allowed text-gray-500'
                                            }`}
                                    >
                                        {prod.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
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
