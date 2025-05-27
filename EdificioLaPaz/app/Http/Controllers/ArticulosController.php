<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Producto;
use Inertia\Inertia;

class ArticulosController extends Controller
{
    public function index()
    {
        $productos = Producto::select(
            'id_productos as id_productos',
            'nombre as nombre',
            'descripcion as descripcion',
            'precio as precio',
            'stock as stock',
            'imagen as imagen',
            'categoria as categoria',
            'estado as estado',
            'fecha_restock as fecha_restock'
        )
        ->get();

        return Inertia::render('adminMicromarket/GestionArticulos', [
            'productos' => $productos
        ]);
    }

    // ArticulosController.php

public function update(Request $request, $id_productos)
{
    $producto = Producto::findOrFail($id_productos);

    $validated = $request->validate([
        'nombre' => 'required|string|max:100',
        'descripcion' => 'nullable|string',
        'precio' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'categoria' => 'required|string|max:100',
        'imagen' => 'required|url|max:255',
    ]);

    $producto->update($validated);

    return redirect()->route('gestion-articulos')->with('success', 'Producto actualizado correctamente');
}

    public function edit( $id_productos)
    {
        // Si tu campo es 'id_user', usa where
        $productos = Producto::where('id_productos', $id_productos)->firstOrFail();

        return Inertia::render('adminMicromarket/EditarProductos', [
        'productos' => [
        'id' => $productos->id_productos, // usa 'id' si en React usas producto.id
        'nombre' => $productos->nombre,
        'descripcion' => $productos->descripcion,
        'precio' => $productos->precio,
        'stock' => $productos->stock,
        'categoria' => $productos->categoria,
        'imagen' => $productos->imagen,
    ]
]);

    }

    public function store(Request $request)
    {
        // Validación de los datos que el formulario envía
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoria' => 'required|string|max:100',
            'imagen' => 'required|url|max:255',
        ]);

        $productos = new Producto();
        $productos->nombre = $validated['nombre'];
        $productos->descripcion = $validated['descripcion'];
        $productos->precio = $validated['precio'];
        $productos->stock = $validated['stock'];
        $productos->categoria = $validated['categoria'];
        $productos->imagen = $validated['imagen'];
        $productos->save();

        return redirect('/gestion-articulos');
    }
}
