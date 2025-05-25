<?php
use App\Http\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
Route::get('/productos', [ProductoController::class, 'index'])
     ->name('productos-micromarket');

// Mostrar formulario de creación (CREATE - Form)
Route::get('/productos/crear', [ProductoController::class, 'create'])
     ->name('productos.create');

// Guardar nuevo producto (CREATE - Process)
Route::post('/productos', [ProductoController::class, 'store'])
     ->name('productos.store');

// Mostrar detalles de un producto (READ single)
Route::get('/productos/{producto}', [ProductoController::class, 'show'])
     ->name('productos.show');

// Mostrar formulario de edición (UPDATE - Form)
Route::get('/productos/{producto}/editar', [ProductoController::class, 'edit'])
     ->name('productos.edit');

// Actualizar producto (UPDATE - Process)
Route::put('/productos/{producto}', [ProductoController::class, 'update'])
     ->name('productos.update');

// Eliminar producto (DELETE)
Route::delete('/productos/{producto}', [ProductoController::class, 'destroy'])
     ->name('productos.destroy');
