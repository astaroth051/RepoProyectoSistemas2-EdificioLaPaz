<?php

namespace App\Http\Controllers;

use App\Models\Copropietario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CopropietarioController extends Controller
{
    public function obtener()
{
    $user = Auth::user();

    if ($user && $user->copropietario) {
        return response()->json($user->copropietario);
    }

    return response()->json(['error' => 'Copropietario no encontrado.'], 404);
}
}
