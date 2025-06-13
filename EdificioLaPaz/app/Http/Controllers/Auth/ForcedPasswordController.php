<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class ForcedPasswordController extends Controller
{
    public function show()
    {
        return inertia('auth/CambiarPassword', [
            'modo' => 'forzado',
        ]);
    }

    public function update(Request $request)
    {
        Log::info('Llegó a update method');
        Log::info('Request data:', $request->all());

        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = Auth::user();

        if ($user instanceof \Illuminate\Database\Eloquent\Model) {
            $user->password = Hash::make($request->password);
            $user->password_changed = 1; // Cambiado de true a 1
            $user->save();
        } else {
            return redirect()->back()->withErrors(['user' => 'No se pudo actualizar la contraseña. Usuario inválido.']);
        }

        Auth::logout();

        return redirect()->route('login')->with('status', 'Contraseña actualizada correctamente. Por favor inicia sesión con tu nueva contraseña.');
    }
}
