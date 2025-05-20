<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CopropietarioController;
use App\Http\Controllers\CajaAhorroController;
use App\Http\Controllers\DashboardEdificioController;

/*
|--------------------------------------------------------------------------
| Rutas protegidas para administradores (edificio y micromarket)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'checkRole:administrador'])->group(function () {
    
    // Dashboard del edificio
    Route::get('/dashboard-edificio', [DashboardEdificioController::class, 'index'])
        ->name('dashboard.edificio');

    // Gestión de copropietarios
    Route::get('/gestion-copropietarios', [CopropietarioController::class, 'index'])
        ->name('gestion-copropietarios');

    // Panel del administrador micromarket
    Route::get('/administrador-micromarket', [CopropietarioController::class, 'indexAdminMicromarket'])
        ->name('administrador-micromarket');

    // Agregar copropietario (formulario)
    Route::get('/agregar-copropietario', function () {
        return Inertia::render('adminEdificio/AgregarCopropietario');
    })->name('agregar-copropietario');

    // Guardar copropietario (POST)
    Route::post('/agregar-copropietario', [CopropietarioController::class, 'store'])
        ->name('copropietarios.store');

    // Editar copropietario
    Route::get('/editar-copropietario/{id}', [CopropietarioController::class, 'edit'])
        ->name('editar-copropietario');

    Route::get('/copropietarios/{id}/edit', [CopropietarioController::class, 'edit']);

    // Actualizar copropietario
    Route::post('/api/copropietarios/{id}/update', [CopropietarioController::class, 'update']);

    // Cambiar rol de copropietario
    Route::post('/copropietarios/{id}/toggle-rol', [CopropietarioController::class, 'toggleRol'])
        ->name('copropietarios.toggle-rol');

    // Cajas de ahorro
    Route::get('/cajas-ahorro-copropietario', [CajaAhorroController::class, 'index']);
    Route::post('/cajas-ahorro/crear', [CajaAhorroController::class, 'crear']);
    Route::post('/cajas-ahorro/activar/{usuario_id}', [CajaAhorroController::class, 'activarCaja']);
    Route::post('/cajas-ahorro/desactivar/{usuario_id}', [CajaAhorroController::class, 'desactivarCaja']);
});
