<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EstadisticasClienteController extends Controller
{
    public function obtener()
    {
        $userId = Auth::id();
        $inicioMes = Carbon::now()->startOfMonth();
        $finMes = Carbon::now()->endOfMonth();

        // Obtener IDs de ventas del usuario autenticado en el mes actual
        $ventasIds = DB::table('ventas')
            ->where('usuario_id', $userId)
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->pluck('id_ventas');

        // Total gastado sumando los subtotales de detalleventa
        $totalGasto = DB::table('detalleventa')
            ->whereIn('venta_id', $ventasIds)
            ->sum('subtotal');

        // Cantidad de compras = cantidad de ventas
        $cantidadCompras = $ventasIds->count();

        return response()->json([
            'totalGasto' => round((float)$totalGasto, 2),
            'cantidadCompras' => (int)$cantidadCompras,
        ]);
    }

    public function gastosDiarios()
    {
        $userId = Auth::id();
        $inicioMes = Carbon::now()->startOfMonth();
        $finMes = Carbon::now()->endOfMonth();

        $ventas = DB::table('ventas')
            ->where('usuario_id', $userId)
            ->whereBetween('fecha', [$inicioMes, $finMes])
            ->pluck('id_ventas');

        $gastos = DB::table('detalleventa')
            ->join('ventas', 'detalleventa.venta_id', '=', 'ventas.id_ventas')
            ->whereIn('detalleventa.venta_id', $ventas)
            ->selectRaw('DATE(ventas.fecha) as dia, SUM(detalleventa.subtotal) as total')
            ->groupBy('dia')
            ->orderBy('dia')
            ->get();

        return response()->json($gastos);
    }
}
