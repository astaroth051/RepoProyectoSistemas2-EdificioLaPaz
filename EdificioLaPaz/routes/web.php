<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CopropietarioController;

Route::get('/', function () {
    return view('welcome'); 
});

Route::get('/dashboard', function () {
    return view('dashboard'); 
});

Route::middleware(['auth'])->group(function () {
    Route::get('/copropietario/obtener', [CopropietarioController::class, 'obtener']);
});