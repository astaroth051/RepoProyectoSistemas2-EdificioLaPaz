<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Support\Facades\Log;

class ProductoController extends Controller
{
    // Obtener productos disponibles por búsqueda
    public function index(Request $request)
    {
        try {
            $busqueda = $request->query('busqueda'); // Si tienes búsqueda, la obtienes

            // Consultar productos con estado = 1 (activos)
            $productos = Producto::when($busqueda, function ($query, $busqueda) {
                return $query->where('nombre', 'like', "%{$busqueda}%")
                    ->orWhere('categoria', 'like', "%{$busqueda}%");
            })
                ->where('estado', 1) // Solo los productos activos
                ->get();

            // Devolver los productos en formato JSON
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
}
