<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $busqueda = $request->input('busqueda', '');
    $filtroStock = $request->input('filtroStock', 'todos');
    
    $query = Producto::query();
    
    if (!empty($busqueda)) {
        $query->where('nombre', 'like', "%{$busqueda}%");
    }
    
    switch ($filtroStock) {
        case 'conStock':
            $query->where('stock', '>', 0);
            break;
        case 'sinStock':
            $query->where('stock', '<=', 0);
            break;
    }
    
    $productos = $query->get();
    
    return Inertia::render('adminMicromarket/ProductosMicromarket', [
        'productos' => $productos,
        'filtros' => [
            'busqueda' => $busqueda,
            'filtroStock' => $filtroStock
        ]
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('adminMicromarket/AgregarProductos');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoria' => 'required|string|max:100',
            'imagen' => 'required|url|max:255',
        ]);

        $producto = Producto::create($validated);
        
        return redirect()->route('productos-micromarket')
                         ->with('success', 'Producto creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        return Inertia::render('adminMicromarket/VerProducto', [
            'producto' => $producto
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $productos)
    {
        return Inertia::render('adminMicromarket/EditarProductos', [
            'producto' => $productos
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $productos)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoria' => 'required|string|max:100',
            'imagen' => 'required|url|max:255',
        ]);

        $productos->update($validated);
        
        return redirect()->route('productos-micromarket')
                         ->with('success', 'Producto actualizado exitosamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        $producto->delete(); // Eliminación lógica
        
        return redirect()->route('productos-micromarket')
                         ->with('success', 'Producto eliminado exitosamente');
    }
}