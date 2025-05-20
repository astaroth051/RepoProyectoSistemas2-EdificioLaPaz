<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CajaAhorroController extends Controller
{
    public function datos()
    {
        $userId = Auth::id();

        $datos = DB::table('users')
            ->join('cajasahorro', 'users.id_user', '=', 'cajasahorro.usuario_id')
            ->select(
                DB::raw("CONCAT(users.name, ' ', users.lastname) as nombre"),
                'users.id_user',
                'cajasahorro.saldo',
                'cajasahorro.seguro'
            )
            ->where('users.id_user', $userId)
            ->first();

        return response()->json($datos);
    }
    public function movimientos()
    {
        $userId = Auth::id();

        $movimientos = DB::table('detalleventa')
            ->join('ventas', 'ventas.id_ventas', '=', 'detalleventa.venta_id')
            ->join('productos', 'productos.id_productos', '=', 'detalleventa.producto_id')
            ->select(
                'ventas.id_ventas as compra',
                'productos.nombre as producto',
                DB::raw('DATE(ventas.fecha) as fecha'),
                'detalleventa.cantidad',
                'detalleventa.subtotal as precioTotal'
            )
            ->where('ventas.usuario_id', $userId)
            ->orderBy('ventas.fecha', 'desc')
            ->limit(10)
            ->get();

        return response()->json($movimientos);
    }
}
