<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Support\Facades\Log;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        try {
            $busqueda = $request->query('busqueda');

            Log::info('Buscando productos con término: ' . ($busqueda ?: 'ninguno'));

            $productos = Producto::when($busqueda, function ($query, $busqueda) {
                    return $query->where('nombre', 'like', "%{$busqueda}%")
                                ->orWhere('categoria', 'like', "%{$busqueda}%");
                })
                ->where('estado', 'Disponible')
                ->get();

            Log::info('Productos encontrados: ' . $productos->count());

            return response()->json($productos);
        } catch (\Exception $e) {
            Log::error('Error en ProductoController@index: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener productos'], 500);
        }
    }

    // Vista para mostrar la página de productos
    public function mostrarProductos()
    {
        return inertia('client/Productos');
    }
}
