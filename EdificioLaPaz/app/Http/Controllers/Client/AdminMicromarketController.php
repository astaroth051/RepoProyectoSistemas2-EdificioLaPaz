<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;

class AdminMicromarketController extends Controller
{
    public function obtener()
    {
        $admin = User::where('rol', 'administrador')->first();

        if (!$admin) {
            return response()->json(['error' => 'Administrador no encontrado'], 404);
        }

        return response()->json([
            'telefono' => $admin->telefono,
            'correo' => $admin->email,
            'nombre' => $admin->name . ' ' . $admin->lastname,
            'horario' => '8:00 am - 10:00 pm', // puedes sacar esto de una tabla si lo deseas
        ]);
    }
}
