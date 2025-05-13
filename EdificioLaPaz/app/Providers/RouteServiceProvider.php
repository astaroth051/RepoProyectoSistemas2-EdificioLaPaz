<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckRole;

class RouteServiceProvider
{
    public function boot(): void
    {
        Route::middleware('checkRole');
    }
}
