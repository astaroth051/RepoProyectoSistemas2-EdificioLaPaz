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

Route::get('/register-user', function () {
    return Inertia::render('auth/register-user');
})->name('register-user');

Route::get('/logout-temp', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
});

Route::get('/reset-password/{token}', function ($token) {
    return Inertia::render('auth/reset-password', [
        'token' => $token,
        'email' => request()->email,
    ]);
})->name('password.reset');
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


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/client.php';
require __DIR__.'/adminedificio.php';
require __DIR__.'/adminmicromarket.php';