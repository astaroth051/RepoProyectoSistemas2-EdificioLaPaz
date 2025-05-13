<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;

class CopropietarioController extends Controller
{
    public function update(Request $request, $id)
    {
        // Validación de los datos
        $validated = $request->validate([
            'name' => 'required|string|max:100',  // Corregido 'nombre' a 'name'
            'lastname' => 'required|string|max:100',
            'telefono' => 'nullable|string|max:20', // Corregido a 'nullable' para teléfono
            'email' => 'required|email|unique:users,email,' . $id, // Asegúrate de que el correo sea único
            'rol' => 'required|string|in:copropietario,administrador,administrador micromarket', // Roles válidos
        ]);

        // Actualiza los datos del copropietario
        $user = User::findOrFail($id);
        $user->name = $validated['name'];  // Asignación con valores validados
        $user->lastname = $validated['lastname'];
        $user->telefono = $validated['telefono'];
        $user->email = $validated['email'];
        $user->rol = $validated['rol']; // Asegúrate de que 'rol' esté validado correctamente
        $user->save();

        // Retorna una respuesta JSON para el frontend
        return response()->json(['message' => 'Copropietario actualizado con éxito']);
    }

    public function edit($id)
    {
        // Obtiene los datos del copropietario
        $user = User::findOrFail($id);

        // Devuelve los datos como JSON
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,  // Cambiado de 'nombre' a 'name'
            'lastname' => $user->lastname,
            'telefono' => $user->telefono,
            'email' => $user->email,
            'rol' => $user->rol,
        ]);
    }

    public function obtener()
    {
        // Obtiene el usuario autenticado
        $user = Auth::user();

        // Devuelve los datos del usuario autenticado
        return response()->json([
            'name' => $user->name,  // Corregido a 'name'
            'lastname' => $user->lastname,
            'departamento' => 'Depto ' . $user->departamento_id, // Relacionar si tienes el departamento
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
            'rol' => 'required|string|in:copropietario,administrador,administrador micromarket', // Nuevos roles
        ]);

        // Crear el nuevo copropietario en la tabla 'users'
        $copropietario = new User();
        $copropietario->name = $validated['name'];
        $copropietario->lastname = $validated['lastname'];
        $copropietario->telefono = $validated['telefono'];
        $copropietario->email = $validated['email'];
        $copropietario->password = bcrypt($validated['password']); // Encriptamos la contraseña
        $copropietario->rol = $validated['rol'];
        $copropietario->save();

        // Retornar una respuesta JSON con el mensaje de éxito
        return response()->json(['message' => 'Copropietario agregado correctamente', 'copropietario' => $copropietario], 201);
    }
}
