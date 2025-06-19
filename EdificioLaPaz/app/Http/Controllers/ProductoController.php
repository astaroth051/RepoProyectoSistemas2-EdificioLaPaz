<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Support\Facades\Log;
use App\Models\Categoria;


class ProductoController extends Controller
{
    // Obtener productos disponibles por búsqueda
    public function index(Request $request)
    {
        try {
            $busqueda = $request->query('busqueda');
            $categoriaNombre = $request->query('categoria');

            $productos = Producto::with('categoria')
                ->where('estado', 1)
                ->when($busqueda, function ($query, $busqueda) {
                    return $query->where('nombre', 'like', "%{$busqueda}%");
                })
                ->when($categoriaNombre, function ($query, $categoriaNombre) {
                    return $query->whereHas('categoria', function ($q) use ($categoriaNombre) {
                        $q->where('nombre', 'like', "%{$categoriaNombre}%");
                    });
                })
                ->get()
                ->map(function ($producto) {
                    return [
                        'id_productos' => $producto->id_productos,
                        'nombre' => $producto->nombre,
                        'precio' => $producto->precio,
                        'stock' => $producto->stock,
                        'imagen' => $producto->imagen,
                        'categoria' => $producto->categoria->nombre ?? 'Sin categoría',
                    ];
                });

            return response()->json($productos);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener productos: ' . $e->getMessage()], 500);
        }
    }


    // Mostrar vista Inertia
    public function mostrarProductos(Request $request)
    {
        return Inertia::render('client/Productos', [
            'carrito' => $request->input('carrito'),
            'total' => $request->input('total'),
            'codigo_ficha' => $request->input('codigo_ficha'),
            'fecha' => $request->input('fecha'),
        ]);
    }

    public function mostrarPlanDePagos(Request $request)
    {
        return inertia('client/PlanDePagos', [
            'carrito' => $request->input('carrito', []),
            'total' => $request->input('total', 0),
            'codigo_ficha' => $request->input('codigo_ficha', '')
        ]);
    }

    public function categorias()
    {
        return response()->json(Categoria::select('id_categoria', 'nombre')->get());
    }
}
