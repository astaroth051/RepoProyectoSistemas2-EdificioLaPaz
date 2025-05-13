<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): \Symfony\Component\HttpFoundation\Response  $next
     * @param  string|array  $roles
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Depuración de los valores
        Log::debug('CheckRole middleware - Usuario ID: ' . $user->id_user);
        Log::debug('CheckRole middleware - Rol del usuario: ' . $user->rol);
        Log::debug('CheckRole middleware - Roles permitidos: ' . implode(', ', $roles));

        // Normaliza el rol del usuario (minúsculas y sin espacios adicionales)
        $userRole = trim(strtolower($user->rol));

        // Normaliza los roles permitidos
        $normalizedRoles = array_map(function($role) {
            return trim(strtolower($role));
        }, $roles);

        Log::debug('CheckRole middleware - Rol normalizado: ' . $userRole);
        Log::debug('CheckRole middleware - Roles permitidos normalizados: ' . implode(', ', $normalizedRoles));

        // Verifica si el rol del usuario está entre los permitidos
        if (in_array($userRole, $normalizedRoles)) {
            return $next($request);
        }

        Log::warning('CheckRole middleware - Acceso denegado para usuario ID: ' . $user->id_user . ' con rol: ' . $user->rol);
        abort(403, 'Acceso no autorizado.');
    }
}
