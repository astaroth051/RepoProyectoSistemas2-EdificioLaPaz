<?php

namespace App\Http\Controllers;

use App\Models\ProductoMicromarket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductoMicromarketController extends Controller
{
    public function index()
    {
        $productos = ProductoMicromarket::select(
            'id_productos as id',
            'nombre',
            'descripcion',
            'precio',
            'stock',
            'imagen',
            'categoria',
            'estado',
            'fecha_restock'
        )
        ->where('estado', 1)  // solo activos (ajusta si quieres)
        ->get();

        return Inertia::render('adminMicromarket/ProductosMicromarket', [
            'productos' => $productos,
        ]);
    }
    public function show($id)
    {
        $producto = ProductoMicromarket::select(
            'id_productos as id',
            'nombre',
            'descripcion',
            'precio',
            'stock',
            'imagen',
            'categoria',
            'estado',
            'fecha_restock'
        )->where('id_productos', $id)->firstOrFail();

        return Inertia::render('adminMicromarket/DetalleProducto', [
            'producto' => $producto,
        ]);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'imagen' => 'nullable|string|max:255',
            'categoria' => 'required|string|max:100',
            'estado' => 'nullable|integer|in:0,1',
            'fecha_restock' => 'nullable|date',
        ]);

        $producto = ProductoMicromarket::findOrFail($id);
        $producto->update($validated);

        return redirect()->route('productos-micromarket');
    }
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'categoria' => 'required|string|max:255', 
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'imagen' => 'required|string', // URL
        ]);

        ProductoMicromarket::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'categoria' => $request->categoria,
            'precio' => $request->precio,
            'stock' => $request->stock,
            'imagen' => $request->imagen,
        ]);

        return redirect()->route('productos-micromarket.index')->with('success', 'Producto agregado correctamente.');
    }
    public function edit($id)
    {
        $producto = ProductoMicromarket::select(
            'id_productos as id',
            'nombre',
            'descripcion',
            'precio',
            'stock',
            'imagen',
            'categoria',
            'estado',
            'fecha_restock'
        )->where('id_productos', $id)->firstOrFail();

        return Inertia::render('adminMicromarket/EditarProductos', [
            'producto' => $producto,
        ]);
    }
    public function destroy($id)
    {
        $producto = ProductoMicromarket::findOrFail($id);
        $producto->estado = 0;  
        $producto->save();

        return redirect()->route('productos-micromarket.index')->with('success', 'Producto eliminado correctamente.');
    }
    public function dashboard()
    {
        $totalProductos = DB::table('productos')
            ->where('estado', 1)
            ->count();

        $productosBajoStock = DB::table('productos')
            ->where('estado', 1)
            ->where('stock', '<', 10)
            ->count();

        $totalVentasMes = DB::table('detalleventa')
            ->join('ventas', 'detalleventa.venta_id', '=', 'ventas.id_ventas')
            ->whereMonth('ventas.fecha', now()->month)
            ->whereYear('ventas.fecha', now()->year)
            ->sum('detalleventa.subtotal');

        return Inertia::render('adminMicromarket/DashboardMicromarket', [
            'totalProductos' => $totalProductos,
            'productosBajoStock' => $productosBajoStock,
            'totalVentasMes' => $totalVentasMes,
        ]);
    }
}
