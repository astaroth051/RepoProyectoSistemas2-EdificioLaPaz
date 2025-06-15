<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\ProductoMicromarketController;
use App\Http\Controllers\RecargaSaldoController;
use App\Http\Controllers\HistorialVentasController;
use App\Http\Controllers\DashboardMicromarketController;

Route::middleware(['auth', 'verified', 'checkRole:administrador'])->group(function () {

    Route::get('/dashboard-micromarket', [DashboardMicromarketController::class, 'index'])
        ->name('dashboard-micromarket');

    Route::get('/historial-ventas/imprimir', [HistorialVentasController::class, 'imprimir']);

    // Vista de productos micromarket
    Route::get('/productos-micromarket', [ProductoMicromarketController::class, 'index'])
        ->name('productos-micromarket');

    // Vista para agregar productos (esta línea corregida para usar el controlador)
    Route::get('/agregar-productos', [ProductoMicromarketController::class, 'formAgregarProducto'])
        ->name('agregar-productos');

    // Vista para editar productos
    Route::get('/productos-micromarket/{id}/editar', [ProductoMicromarketController::class, 'edit'])
        ->name('productos.edit');

    // Actualizar producto
    Route::put('/productos-micromarket/{id}', [ProductoMicromarketController::class, 'update'])
        ->name('productos.update');

    // Guardar producto nuevo
    Route::post('/productos-micromarket', [ProductoMicromarketController::class, 'store'])
        ->name('productos.store');

    // Borrar producto
    Route::delete('/productos-micromarket/{id}', [ProductoMicromarketController::class, 'destroy'])
        ->name('productos.destroy');

    // Recarga de saldo
    Route::get('/recarga-saldo', [RecargaSaldoController::class, 'index'])->name('recarga-saldo');
    Route::post('/recarga-saldo', [RecargaSaldoController::class, 'recargar']);
});

// Logout
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
})->middleware('auth')->name('logout');
