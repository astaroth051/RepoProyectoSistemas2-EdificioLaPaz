<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Client\CopropietarioController;
use App\Http\Controllers\Client\AdminMicromarketController;
use App\Http\Controllers\Client\EstadisticasClienteController;
use App\Http\Controllers\Client\CajaAhorroController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\Auth\ForcedPasswordController;
use App\Http\Middleware\RedirectIfPasswordNotChanged;

// Rutas para cambio de contraseña (DEBE ir ANTES que las rutas protegidas)
Route::middleware(['auth'])->group(function () {
    Route::get('/cambiar-contrasena', [ForcedPasswordController::class, 'show'])->name('password.forzado.form');
    Route::post('/cambiar-contrasena', [ForcedPasswordController::class, 'update'])->name('password.forzado.enviar');
});

// Ruta para cerrar sesión (también debe ir antes que las rutas protegidas)
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
})->name('logout');

// Rutas protegidas para copropietario + chequeo de cambio de contraseña
// Usando la clase directamente en lugar del alias
Route::middleware(['auth', 'checkRole:copropietario', RedirectIfPasswordNotChanged::class])->group(function () {
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
