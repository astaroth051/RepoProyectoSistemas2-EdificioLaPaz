<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class RegisterUserController extends Controller
{
    public function mostrarVistaConAdmin()
    {
        $adminEdificio = User::where('rol', 'dueño')->first();

        return Inertia::render('auth/register-user', [
            'admin' => $adminEdificio,
        ]);
    }
}
