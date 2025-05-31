<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\CopropietarioController;
use App\Http\Controllers\CajaAhorroController;
use App\Models\Departamento;

Route::middleware(['auth', 'verified', 'checkRole:dueño'])->group(function () {

    // Dashboard del edificio
    Route::get('/dashboard-edificio', function () {
    return Inertia::render('adminEdificio/DashboardEdificio');
    })->name('dashboard-edificio');

    // Gestión de copropietarios
    Route::get('/gestion-copropietarios', [CopropietarioController::class, 'index'])
        ->name('gestion-copropietarios');

    //Administrador micromarket
    Route::get('/administrador-micromarket', [CopropietarioController::class, 'indexAdminMicromarket'])
        ->name('administrador-micromarket');

    // Formulario para agregar copropietario
    Route::get('/agregar-copropietario', function () {
    $departamentos = Departamento::select('id_departamentos as id', 'descripcion')->get();
        return Inertia::render('adminEdificio/AgregarCopropietario', [
            'departamentos' => $departamentos
        ]);
    })->name('agregar-copropietario');

    // Guardar nuevo copropietario 
    Route::post('/agregar-copropietario', [CopropietarioController::class, 'store'])
        ->name('copropietarios.store');

    // Editar copropietario 
    Route::get('/editar-copropietario/{id}', [CopropietarioController::class, 'edit'])
        ->name('editar-copropietario');

    // Eliminar copropietario
    Route::post('/copropietarios/{id}/desactivarUsuario', [CopropietarioController::class, 'desactivarUsuario']);
    // Reactivar copropietario
    Route::post('/copropietarios/{id}/reactivarUsuario', [CopropietarioController::class, 'reactivarUsuario']);

    // Para rutas /copropietarios/{id}/edit 
    Route::get('/copropietarios/{id}/edit', [CopropietarioController::class, 'edit']);

    // Actualizar copropietario 
    Route::post('/api/copropietarios/{id}/update', [CopropietarioController::class, 'update'])
        ->name('copropietarios.update');

    // Cambiar rol del copropietario 
    Route::post('/copropietarios/{id}/toggle-rol', [CopropietarioController::class, 'toggleRol'])
        ->name('copropietarios.toggle-rol');

    // Cajas de ahorro 
    Route::get('/cajas-ahorro-copropietario', [CajaAhorroController::class, 'index'])
        ->name('cajas-ahorro.index');

    Route::post('/cajas-ahorro/crear', [CajaAhorroController::class, 'crear'])
        ->name('cajas-ahorro.crear');

    Route::post('/cajas-ahorro/activar/{usuario_id}', [CajaAhorroController::class, 'activarCaja'])
        ->name('cajas-ahorro.activar');

    Route::post('/cajas-ahorro/desactivar/{usuario_id}', [CajaAhorroController::class, 'desactivarCaja'])
        ->name('cajas-ahorro.desactivar');

    // Logout    
    Route::post('/logout', function () {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/login');
    })->middleware('auth')->name('logout');
});