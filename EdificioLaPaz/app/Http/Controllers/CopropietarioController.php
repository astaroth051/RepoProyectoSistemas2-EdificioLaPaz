<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CopropietarioController extends Controller
{
    
    public function index()
    {
        $copropietarios = User::select(
            'id_user as id',
            'name as nombre',
            'lastname as apellido',
            'email as correo'
        )
        ->where('rol', 'copropietario')
        ->get();

        return Inertia::render('adminEdificio/GestionCopropietarios', [
            'copropietarios' => $copropietarios
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'telefono' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'rol' => 'required|string',
        ]);

        $user->update($validated);

        return redirect()->route('gestion-copropietarios');
    }

    public function edit($id)
    {
        // Si tu campo es 'id_user', usa where
        $user = User::where('id_user', $id)->firstOrFail();

        return Inertia::render('adminEdificio/EditarCopropietario', [
            'copropietario' => [
                'id_user' => $user->id_user,
                'name' => $user->name,
                'lastname' => $user->lastname,
                'telefono' => $user->telefono,
                'email' => $user->email,
                'rol' => $user->rol,
            ]
        ]);
    }

    public function obtener()
    {
        // Obtiene el usuario autenticado
        $user = Auth::user();

        // Devuelve los datos del usuario autenticado
        return response()->json([
            'name' => $user->name,
            'lastname' => $user->lastname,
            'departamento' => 'Depto ' . $user->departamento_id,
            'email' => $user->email,
            'telefono' => $user->telefono,
        ]);
    }

    public function store(Request $request)
    {
        // Validación de los datos que el formulario envía
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'telefono' => 'required|string|max:8',
            'email' => 'required|email|max:100|unique:users,email',
            'password' => 'required|string|min:6',
            'rol' => 'required|string|in:copropietario,administrador,administrador micromarket',
        ]);

        $copropietario = new User();
        $copropietario->name = $validated['name'];
        $copropietario->lastname = $validated['lastname'];
        $copropietario->telefono = $validated['telefono'];
        $copropietario->email = $validated['email'];
        $copropietario->password = bcrypt($validated['password']);
        $copropietario->rol = $validated['rol'];
        $copropietario->save();

        return redirect('/gestion-copropietarios');
    }
}
