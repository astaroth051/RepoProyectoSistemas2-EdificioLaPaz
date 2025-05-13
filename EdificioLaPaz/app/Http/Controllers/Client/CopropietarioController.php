<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CopropietarioController extends Controller
{
    public function obtener()
    {
        $user = Auth::user();

        return response()->json([
            'nombre' => $user->name,
            'apellido' => $user->lastname,
            'departamento' => 'Depto ' . $user->departamento_id, // o puedes relacionar
            'email' => $user->email,
            'telefono' => $user->telefono,
            //'estado' => 'Activo', // puedes adaptarlo si tienes un campo real
        ]);
    }
}
