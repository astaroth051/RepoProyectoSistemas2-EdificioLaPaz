<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CopropietarioController;
use App\Http\Controllers\CajaAhorroController;
use App\Http\Controllers\DashboardEdificioController;

//admin dashboard
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-adminEdificio', function () {
        return Inertia::render('adminEdificio/DashboardadminEdificio');
    })->name('dashboard-adminEdificio');
});*/
//ruta sin proteccion
Route::get('/dashboard-edificio', [DashboardEdificioController::class, 'index'])
    ->name('dashboard.edificio');

//gestion copropietarios
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/gestion-copropietarios', function () {
        return Inertia::render('adminEdificio/GestionCopropietarios');
    })->name('gestion-copropietarios');
});*/
Route::get('/gestion-copropietarios', [CopropietarioController::class, 'index'])->name('gestion-copropietarios');

//administrador micromarket
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/administrador-micromarket', function () {
        return Inertia::render('adminEdificio/AdministradorMicromarket');
    })->name('administrador-micromarkett');
});*/
//ruta sin proteccion
Route::get('/administrador-micromarket', [CopropietarioController::class, 'indexAdminMicromarket'])
    ->name('administrador-micromarket');

//cajas de ahorro copropietarios
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cajas-ahorro-copropietario', function () {
        return Inertia::render('adminEdificio/CajasAhorroCopropietario');
    })->name('cajas-ahorro-copropietario');
});*/
Route::get('/cajas-ahorro-copropietario', [CajaAhorroController::class, 'index']);
Route::post('/cajas-ahorro/crear', [CajaAhorroController::class, 'crear']);
Route::post('/cajas-ahorro/activar/{usuario_id}', [CajaAhorroController::class, 'activarCaja']);
Route::post('/cajas-ahorro/desactivar/{usuario_id}', [CajaAhorroController::class, 'desactivarCaja']);

//agregar copropietario
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/agregar-copropietario', function () {
        return Inertia::render('adminEdificio/AgregarCopropietario');
    })->name('agregar-copropietario');
});*/
//ruta sin proteccion
Route::get('/agregar-copropietario', function () {
    return Inertia::render('adminEdificio/AgregarCopropietario');
})->name('agregar-copropietario');
// Rutas API
Route::post('/agregar-copropietario', [CopropietarioController::class, 'store'])->name('copropietarios.store');

//editar copropietario
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/editar-copropietario', function () {
        return Inertia::render('adminEdificio/EditarCopropietario');
    })->name('editar-copropietario');
});*/
//ruta sin proteccion
Route::get('/editar-copropietario/{id}', [CopropietarioController::class, 'edit'])
    ->name('editar-copropietario');
Route::get('/copropietarios/{id}/edit', [CopropietarioController::class, 'edit']);
// Rutas API para editar y actualizar copropietario
Route::post('/api/copropietarios/{id}/update', [CopropietarioController::class, 'update']);
// routes/web.php
Route::post('/copropietarios/{id}/toggle-rol', [CopropietarioController::class, 'toggleRol'])->name('copropietarios.toggle-rol');
