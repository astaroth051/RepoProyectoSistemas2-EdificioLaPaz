<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//admin dashboard
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-adminEdificio', function () {
        return Inertia::render('adminEdificio/DashboardadminEdificio');
    })->name('dashboard-adminEdificio');
});*/
//ruta sin proteccion
Route::get('/dashboard-edificio', function () {
    return Inertia::render('adminEdificio/DashboardEdificio');
})->name('dashboard-edificio');

//gestion copropietarios
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/gestion-copropietarios', function () {
        return Inertia::render('adminEdificio/GestionCopropietarios');
    })->name('gestion-copropietarios');
});*/
//ruta sin proteccion
Route::get('/gestion-copropietarios', function () {
    return Inertia::render('adminEdificio/GestionCopropietarios');
})->name('gestion-copropietarios');

//administrador micromarket
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/administrador-micromarket', function () {
        return Inertia::render('adminEdificio/AdministradorMicromarket');
    })->name('administrador-micromarkett');
});*/
//ruta sin proteccion
Route::get('/administrador-micromarket', function () {
    return Inertia::render('adminEdificio/AdministradorMicromarket');
})->name('administrador-micromarket');

//cajas de ahorro copropietarios
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cajas-ahorro-copropietario', function () {
        return Inertia::render('adminEdificio/CajasAhorroCopropietario');
    })->name('cajas-ahorro-copropietario');
});*/
//ruta sin proteccion
Route::get('/cajas-ahorro-copropietario', function () {
    return Inertia::render('adminEdificio/CajasAhorroCopropietario');
})->name('cajas-ahorro-copropietario');

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

//editar copropietario
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/editar-copropietario', function () {
        return Inertia::render('adminEdificio/EditarCopropietario');
    })->name('editar-copropietario');
});*/
//ruta sin proteccion
Route::get('/editar-copropietario', function () {
    return Inertia::render('adminEdificio/EditarCopropietario');
})->name('editar-copropietario');