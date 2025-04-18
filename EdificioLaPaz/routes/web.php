<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CopropietarioController;
use App\Http\Controllers\ProductoController;

Route::get('/', function () {
    return view('welcome'); 
});

Route::get('/dashboard', function () {
    return view('dashboard'); 
});

Route::middleware(['auth'])->group(function () {
    Route::get('/copropietario/obtener', [CopropietarioController::class, 'obtener']);
});
Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
