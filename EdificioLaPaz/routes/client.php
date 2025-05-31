<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Client\CopropietarioController;
use App\Http\Controllers\Client\AdminMicromarketController;
use App\Http\Controllers\Client\EstadisticasClienteController;
use App\Http\Controllers\Client\CajaAhorroController;
use App\Http\Controllers\VentaController;

// Rutas protegidas para copropietario + chequeo de cambio de contraseña
Route::middleware(['auth', 'checkRole:copropietario'])->group(function () {
    Route::get('/dashboard-client', function () {
        return Inertia::render('client/DashboardClient');
    })->name('dashboard-client');

    Route::get('/caja-de-ahorro', function () {
        return Inertia::render('client/CajaDeAhorro');
    })->name('caja-de-ahorro');

    // Rutas protegidas para datos y estadísticas
    Route::get('/copropietario/obtener', [CopropietarioController::class, 'obtener']);
    Route::get('/admin-micromarket/obtener', [AdminMicromarketController::class, 'obtener']);
    Route::get('/estadisticas/cliente', [EstadisticasClienteController::class, 'obtener']);
    Route::get('/estadisticas/gastos-diarios', [EstadisticasClienteController::class, 'gastosDiarios']);
    Route::get('/caja-ahorro/obtener', [CajaAhorroController::class, 'datos']);
    Route::get('/caja-ahorro/movimientos', [CajaAhorroController::class, 'movimientos']);
    Route::post('/plan-de-pagos', [VentaController::class, 'mostrarVistaPlanDePagos']);
});

// Ruta para cerrar sesión
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
})->name('logout');
