<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\CajaAhorro;

class RecargaSaldoController extends Controller
{
    public function index()
    {
        $copropietarios = User::select('id_user as id', 'name as nombre', 'lastname as apellido')
            ->where('rol', 'copropietario')
            ->get();

        return Inertia::render('adminMicromarket/RecargaSaldo', [
            'copropietarios' => $copropietarios
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
                'fecha' => now(),
            ]);
        }
        return redirect()->back()->with('success', 'Saldo recargado exitosamente.');
    }
}
