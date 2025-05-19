<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Client\CopropietarioController;
use App\Http\Controllers\Client\AdminMicromarketController;
use App\Http\Controllers\Client\EstadisticasClienteController;
use App\Http\Controllers\Client\CajaAhorroController;
use App\Http\Controllers\VentaController;



//cliente dashboard
//protegido
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-client', function () {
        return Inertia::render('client/DashboardClient');
    })->name('dashboard-client');
});*/
//ruta sin proteccion
//Route::get('/dashboard-client', function () {
//   return Inertia::render('client/DashboardClient');
//})->name('dashboard-client');

Route::middleware(['auth', 'checkRole:copropietario'])->group(function () {
    Route::get('/dashboard-client', function () {
        return Inertia::render('client/DashboardClient');
    })->name('dashboard-client');
    Route::get('/plan-de-pagos', function () {
        return Inertia::render('client/PlanDePagos');
    })->name('plan-de-pagos');
    Route::get('/caja-de-ahorro', function () {
        return Inertia::render('client/CajaDeAhorro');
    })->name('caja-de-ahorro');
});

//plan de pagos
// Ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/plan-de-pagos-protected', function () {
        return Inertia::render('client/PlanDePagos');
    })->name('plan-de-pagos.protected');
});*/
// Ruta sin protección
Route::get('/plan-de-pagos', function () {
    return Inertia::render('client/PlanDePagos');
})->name('plan-de-pagos');

//caja de ahorros
// Ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/caja-de-ahorro-protected', function () {
        return Inertia::render('client/CajaDeAhorro');
    })->name('caja-de-ahorro.protected');
});*/
// Ruta sin protección
Route::get('/caja-de-ahorro', function () {
    return Inertia::render('client/CajaDeAhorro');
})->name('caja-de-ahorro');

//productos
// Ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/productos-protected', function () {
        return Inertia::render('client/Productos');
    })->name('productos.protected');
});*/
// Ruta sin protección
Route::get('/productos', function () {
    return Inertia::render('client/Productos');
})->name('productos');

//ruta para cerrar sesión
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
})->name('logout');

//ruta para obtener el admin del micromercado y estadisticas del cliente
Route::middleware(['auth', 'checkRole:copropietario'])->group(function () {
    Route::get('/copropietario/obtener', [CopropietarioController::class, 'obtener']);
    Route::get('/admin-micromarket/obtener', [AdminMicromarketController::class, 'obtener']);
    Route::get('/estadisticas/cliente', [EstadisticasClienteController::class, 'obtener']);
    Route::get('/estadisticas/gastos-diarios', [EstadisticasClienteController::class, 'gastosDiarios']);
    Route::get('/caja-ahorro/obtener', [CajaAhorroController::class, 'datos']);
    Route::get('/caja-ahorro/movimientos', [CajaAhorroController::class, 'movimientos']);
    Route::post('/plan-de-pagos', [VentaController::class, 'mostrarVistaPlanDePagos']);
});
