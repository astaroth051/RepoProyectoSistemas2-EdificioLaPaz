<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    //
        public function index(Request $request)
{
    $query = Producto::query();
    
    if ($request->has('search')) {
        $query->where('nombre', 'like', '%'.$request->search.'%')
              ->orWhere('descripcion', 'like', '%'.$request->search.'%');
    }
    
    if ($request->has('categoria') && $request->categoria !== 'todas') {
        $query->where('categoria', $request->categoria);
    }
    
    if ($request->has('stock')) {
        if ($request->stock === 'disponible') {
            $query->where('stock', '>', 0);
        } elseif ($request->stock === 'agotado') {
            $query->where('stock', '<=', 0);
        }
    }
    
    $productos = $query->orderBy('nombre')->get();
    
    return Inertia::render('Productos/Index', [
        'productos' => $productos,
        'categorias' => Producto::select('categoria')->distinct()->pluck('categoria'),
        'filters' => $request->only(['search', 'categoria', 'stock'])
    ]);
}
}
