<?php

namespace App\Http\Controllers;

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
    public function mostrarProductos()
    {
        return inertia('client/Productos');
    }
}
