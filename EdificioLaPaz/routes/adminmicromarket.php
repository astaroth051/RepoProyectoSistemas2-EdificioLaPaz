<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//micromarket dashboard
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-micromarket', function () {
        return Inertia::render('adminMicromarket/DashboardMicromarket');
    })->name('dashboard-micromarket');
});*/
//ruta sin proteccion
Route::get('/dashboard-micromarket', function () {
    return Inertia::render('adminMicromarket/DashboardMicromarket');
})->name('dashboard-micromarket');

//productos micromarket
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/productos-micromarket', function () {
        return Inertia::render('adminMicromarket/ProductosMicromarket');
    })->name('productos-micromarket');
});*/
//ruta sin proteccion
Route::get('/productos-micromarket', function () {
    return Inertia::render('adminMicromarket/ProductosMicromarket');
})->name('productos-micromarket');

//agregar productos micromarket
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/agregar-productos', function () {
        return Inertia::render('adminMicromarket/AgregarProductos');
    })->name('agregar-productost');
});*/
//ruta sin proteccion
Route::get('/agregar-productos', function () {
    return Inertia::render('adminMicromarket/AgregarProductos');
})->name('agregar-productos');

//editar productos micromarket
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/editar-productos', function () {
        return Inertia::render('adminMicromarket/EditarProductos');
    })->name('editar-productos');
});*/
//ruta sin proteccion
Route::get('/editar-productos', function () {
    return Inertia::render('adminMicromarket/EditarProductos');
})->name('editar-productos');

//recarga saldo
//ruta protegida
/*Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/recarga-saldo', function () {
        return Inertia::render('adminMicromarket/RecargaSaldo');
    })->name('recarga-saldo');
});*/
//ruta sin proteccion
Route::get('/recarga-saldo', function () {
    return Inertia::render('adminMicromarket/RecargaSaldo');
})->name('recarga-saldo');