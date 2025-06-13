<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfPasswordNotChanged
{
    public function handle($request, Closure $next)
    {
        if (
            Auth::check() &&
            Auth::user()->password_changed == 0 &&
            !$request->is('cambiar-contrasena') &&
            !$request->is('logout') &&
            !$request->isMethod('post')
        ) {
            return redirect()->route('password.forzado.form');
        }

        return $next($request);
    }
}
