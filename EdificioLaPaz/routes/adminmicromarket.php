<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ArticulosController;
//micromarket dashboard
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-micromarket', function () {
        return Inertia::render('adminMicromarket/DashboardMicromarket');
    })->name('dashboard-micromarket');
});*/

//ruta sin proteccion

Route::get('/dashboard-micromarket', function () {
    return Inertia::render('adminMicromarket/DashboardMicromarket');
})->name('dashboard-micromarket');

Route::get('/gestion-articulos', [ArticulosController::class, 'index'])->name('gestion-articulos');
//productos micromarket
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/productos-micromarket', function () {
        return Inertia::render('adminMicromarket/ProductosMicromarket');
    })->name('productos-micromarket');
});*/
//ruta sin proteccion
Route::get('/productos-micromarket', function () {
    return Inertia::render('adminMicromarket/ProductosMicromarket');
})->name('productos-micromarket');
Route::get('/articulos-micromarket', function () {
    return Inertia::render('adminMicromarket/GestionArticulos');
})->name('articulos-micromarket');

//agregar productos micromarket
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/agregar-productos', function () {
        return Inertia::render('adminMicromarket/AgregarProductos');
    })->name('agregar-productost');
});*/
//ruta sin proteccion
Route::get('/agregar-productos', function () {
    return Inertia::render('adminMicromarket/AgregarProductos');
})->name('agregar-productos');
Route::post('/agregar-productos', [ProductoController::class, 'store'])
     ->name('agregar-productos.store');

     
Route::post('/agregar-productos', [ArticulosController::class, 'store'])
     ->name('agregar-productos.store');
//editar productos micromarket
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/editar-productos', function () {
        return Inertia::render('adminMicromarket/EditarProductos');
    })->name('editar-productos');
});*/
//ruta sin proteccion
Route::get('/editar-productos', function () {
    return Inertia::render('adminMicromarket/EditarProductos');
})->name('editar-productos');

//recarga saldo
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/recarga-saldo', function () {
        return Inertia::render('adminMicromarket/RecargaSaldo');
    })->name('recarga-saldo');
});*/
//ruta sin proteccion
Route::get('/recarga-saldo', function () {
    return Inertia::render('adminMicromarket/RecargaSaldo');
})->name('recarga-saldo');
// Productos Micromarket
//Route::get('/productos-micromarket', [ProductoController::class, 'index'])
     //->name('productos-micromarket');

// Agregar Producto
//Route::get('/agregar-productos', [ProductoController::class, 'create'])
     //->name('agregar-productos');
//Route::post('/agregar-productos', [ProductoController::class, 'store'])
     //->name('productos.store');

// Editar Producto
//Route::get('/editar-productos/{producto}', [ProductoController::class, 'edit'])
  //   ->name('editar-productos');
//Route::put('/productos/{producto}', [ProductoController::class, 'update'])
  //   ->name('productos.update');

// Eliminar Producto
//Route::delete('/productos/{producto}', [ProductoController::class, 'destroy'])
  //   ->name('productos.destroy');
