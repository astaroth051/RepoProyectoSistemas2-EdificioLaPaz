<?php

namespace App\Http\Controllers;

use App\Models\CajaAhorro;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class CajaAhorroController extends Controller
{
    public function index()
    {
        $usuarios = User::where('rol', 'copropietario')
            ->with('cajaAhorro')
            ->get();

        return Inertia::render('adminEdificio/CajasAhorroCopropietario', [
            'usuarios' => $usuarios,
            'errors' => session('errors') ? session('errors')->get('msg') : null,
            'success' => session('success') ?? null,
        ]);
    }

    public function crear(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:users,id_user'
        ]);

        // Evitar duplicados
        $existe = CajaAhorro::where('usuario_id', $request->usuario_id)->first();
        if ($existe) {
            // Enviar error para Inertia con clave 'msg'
            return redirect()->back()->withErrors(['msg' => 'La caja ya existe para este usuario.']);
        }

        CajaAhorro::create([
            'usuario_id' => $request->usuario_id,
            'estado' => 1,
            'fecha_desactivacion' => null,
        ]);

        return redirect()->back()->with('success', 'Caja de ahorro creada exitosamente.');
    }

    public function activarCaja($usuario_id)
    {
        $caja = CajaAhorro::where('usuario_id', $usuario_id)->first();
        if ($caja) {
            $caja->estado = 1;
            $caja->fecha_desactivacion = null;
            $caja->save();
        }
        return redirect()->back()->with('success', 'Caja activada.');
    }

    public function desactivarCaja($usuario_id)
    {
        $caja = CajaAhorro::where('usuario_id', $usuario_id)->first();
        if ($caja) {
            $caja->estado = 0;
            $caja->fecha_desactivacion = now();
            $caja->save();
        }
        return redirect()->back()->with('success', 'Caja desactivada.');
    }
    public function toggleEstadoCaja($usuario_id)
    {
        $caja = CajaAhorro::where('usuario_id', $usuario_id)->first();

        if (!$caja) {
            return redirect()->back()->withErrors(['msg' => 'Caja no encontrada']);
        }

        if ($caja->estado === 1) {
            // Si está activa, la desactivamos y guardamos la fecha
            $caja->estado = 0;
            $caja->fecha_desactivacion = now();
        } else {
            // Si está inactiva, la reactivamos y borramos la fecha
            $caja->estado = 1;
            $caja->fecha_desactivacion = null;
        }

        $caja->save();

        return redirect()->back()->with('success', 'Estado de caja actualizado correctamente');
    }

}
