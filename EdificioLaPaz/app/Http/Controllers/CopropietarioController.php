<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Departamento;
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
            'email as correo',
            'estadoUsuario'
        )
        ->where('rol', 'copropietario')
        ->get();

        return Inertia::render('adminEdificio/GestionCopropietarios', [
            'copropietarios' => $copropietarios
        ]);
    }

    public function reactivarUsuario($id) {
        $copropietario = User::find($id);
        if (!$copropietario) {
            return response()->json(['success' => false, 'message' => 'Usuario no encontrado']);
        }
        $copropietario->estadoUsuario = 1;
        $copropietario->save();

        return response()->json(['success' => true, 'message' => 'Usuario reactivado correctamente']);
    }

    public function indexAdminMicromarket()
    {
        $copropietarios = User::select('id_user as id', 'name as nombre', 'lastname as apellido', 'rol')
            ->whereIn('rol', ['copropietario', 'administrador'])
            ->get();

        return Inertia::render('adminEdificio/AdministradorMicromarket', [
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
            'departamento_id' => 'required|exists:departamentos,id_departamentos',
        ]);

        $user->update($validated);

        return redirect()->route('gestion-copropietarios');
    }

    public function edit($id)
    {
        // Si tu campo es 'id_user', usa where
        $user = User::where('id_user', $id)->firstOrFail();
        $departamentos = Departamento::select('id_departamentos', 'descripcion')->get();

        return Inertia::render('adminEdificio/EditarCopropietario', [
            'copropietario' => [
                'id_user' => $user->id_user,
                'name' => $user->name,
                'lastname' => $user->lastname,
                'telefono' => $user->telefono,
                'email' => $user->email,
                'rol' => $user->rol,
                'departamento_id' => $user->departamento_id,
            ],
            'departamentos' => $departamentos,
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
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'telefono' => 'required|string|max:8',
            'email' => 'required|email|max:100|unique:users,email',
            'password' => 'required|string|min:6',
            'rol' => 'required|string|in:copropietario,dueño,administrador',
            'departamento_id' => 'required|exists:departamentos,id_departamentos',
        ]);

        $copropietario = new User();
        $copropietario->name = $validated['name'];
        $copropietario->lastname = $validated['lastname'];
        $copropietario->telefono = $validated['telefono'];
        $copropietario->email = $validated['email'];
        $copropietario->password = bcrypt($validated['password']);
        $copropietario->rol = $validated['rol'];
        $copropietario->departamento_id = $validated['departamento_id']; 
        $copropietario->save();

        return redirect('/gestion-copropietarios');
    }
    
    public function toggleRol($id)
    {
        $user = User::findOrFail($id);

        if ($user->rol === 'copropietario') {
            $user->rol = 'administrador';
        } else {
            $user->rol = 'copropietario';
        }

        $user->save();

        return response()->json(['success' => true, 'rol' => $user->rol]);
    }

    public function desactivar($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Usuario no encontrado.']);
        }

        $user->estado = 'inactivo'; 
        $user->save();

        return response()->json(['success' => true]);
    }

    public function desactivarUsuario($id)
    {
        $copropietario = User::findOrFail($id);
        $copropietario->estadoUsuario = 0;
        $copropietario->save();

        return response()->json(['success' => true]);
    }
}
