<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//cliente dashboard
//protegido
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-client', function () {
        return Inertia::render('client/DashboardClient');
    })->name('dashboard-client');
});*/
//ruta sin proteccion
Route::get('/dashboard-client', function () {
    return Inertia::render('client/DashboardClient');
})->name('dashboard-client');

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