<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\CopropietarioController;
use App\Http\Controllers\CajaAhorroController;
Route::middleware(['auth', 'verified', 'checkRole:administrador'])->group(function () {

    // Dashboard del edificio
    Route::get('/dashboard-edificio', function () {
        return Inertia::render('adminEdificio/DashboardEdificio');
    })->name('dashboard.edificio');

    // Gestión de copropietarios
    Route::get('/gestion-copropietarios', function () {
        return Inertia::render('adminEdificio/GestionCopropietarios');
    })->name('gestion-copropietarios');

    // Panel del administrador micromarket
    Route::get('/administrador-micromarket', function () {
        return Inertia::render('adminMicromarket/AdministradorMicromarket');
    })->name('administrador-micromarket');

    // Formulario para agregar copropietario
    Route::get('/agregar-copropietario', function () {
        return Inertia::render('adminEdificio/AgregarCopropietario');
    })->name('agregar-copropietario');

    // Guardar nuevo copropietario (POST) - usa controlador
    Route::post('/agregar-copropietario', [CopropietarioController::class, 'store'])
        ->name('copropietarios.store');

    // Editar copropietario (GET) - usa controlador
    Route::get('/editar-copropietario/{id}', [CopropietarioController::class, 'edit'])
        ->name('editar-copropietario');

    Route::get('/copropietarios/{id}/edit', [CopropietarioController::class, 'edit']);

    // Actualizar copropietario (POST)
    Route::post('/api/copropietarios/{id}/update', [CopropietarioController::class, 'update']);

    // Cambiar rol del copropietario (POST)
    Route::post('/copropietarios/{id}/toggle-rol', [CopropietarioController::class, 'toggleRol'])
        ->name('copropietarios.toggle-rol');

    // Cajas de ahorro - controlador
    Route::get('/cajas-ahorro-copropietario', [CajaAhorroController::class, 'index']);
    Route::post('/cajas-ahorro/crear', [CajaAhorroController::class, 'crear']);
    Route::post('/cajas-ahorro/activar/{usuario_id}', [CajaAhorroController::class, 'activarCaja']);
    Route::post('/cajas-ahorro/desactivar/{usuario_id}', [CajaAhorroController::class, 'desactivarCaja']);
    
    Route::get('/logout-temp', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/login');
});
});
