<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\VentaController;



Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

//Route::middleware(['auth', 'verified'])->group(function () {
//    Route::get('dashboard', function () {
//        return Inertia::render('dashboard');
//    })->name('dashboard');
//});

Route::middleware(['auth', 'verified', 'checkRole:administrador,dueño'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/register-user', function () {
    return Inertia::render('auth/register-user');
})->name('register-user');
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/client.php';

Route::get('/logout-temp', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
});




// Ruta para mostrar la página de productos (vista)
Route::middleware(['auth', 'checkRole:copropietario'])->group(function () {
    Route::get('/productos', [ProductoController::class, 'mostrarProductos'])->name('productos');
    Route::post('/guardar-venta-con-plan', [VentaController::class, 'guardarVentaConPlan']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/api/productos', [ProductoController::class, 'index']);
});

Route::get('/plan-de-pagos', [ProductoController::class, 'mostrarPlanDePagos']);


Route::middleware(['auth'])->post('/api/guardar-compra', [VentaController::class, 'guardarVentaConPlan']);
