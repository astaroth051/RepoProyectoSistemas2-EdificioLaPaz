<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\CajaAhorro;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecargaSaldoController extends Controller
{
    public function index()
    {
        return Inertia::render('adminMicromarket/RecargaSaldo', [
            'copropietarios' => User::select(
                'users.id_user as id',
                'users.name as nombre',
                'users.lastname as apellido',
                'users.telefono',
                'cajasahorro.saldo'
            )
            ->leftJoin('cajasahorro', 'users.id_user', '=', 'cajasahorro.usuario_id')
            ->where('users.rol', 'copropietario')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'nombre' => $user->nombre,
                    'apellido' => $user->apellido,
                    'telefono' => $user->telefono,
                    'saldo' => $user->saldo ?? 0, // Si no tiene caja de ahorro, saldo = 0
                ];
            }),
        ]);
    }

    public function recargar(Request $request)
    {
        $request->validate([
            'copropietario_id' => 'required|exists:users,id_user',
            'saldo' => 'required|numeric|min:1',
        ]);

        $caja = CajaAhorro::where('usuario_id', $request->copropietario_id)->first();

        if ($caja) {
            $caja->saldo += $request->saldo;
            $caja->save();
        } else {
            CajaAhorro::create([
                'usuario_id' => $request->copropietario_id,
                'saldo' => $request->saldo,
                // 'seguro' y otros campos pueden ir aquí si son obligatorios
                'estado' => 1, // o el valor por defecto que uses
                'fecha_desactivacion' => null,
            ]);
        }

        return redirect()->route('recarga-saldo')->with('success', '¡Saldo recargado con éxito!');
    }
}
