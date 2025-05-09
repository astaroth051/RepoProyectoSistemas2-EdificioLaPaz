<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard-client', function () {
        return Inertia::render('client/DashboardClient');
    })->name('dashboard-client');
});