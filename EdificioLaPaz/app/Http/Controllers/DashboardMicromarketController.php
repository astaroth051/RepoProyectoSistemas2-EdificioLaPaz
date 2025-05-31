<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Producto;
use App\Models\Venta;
use Carbon\Carbon;
use App\Models\DetalleVenta;

class DashboardMicromarketController extends Controller
{
    public function index()
    {
        $totalProductos = Producto::count();
        $productosBajoStock = Producto::where('stock', '<', 10)->count();

        // Obtener el mes actual
        $mesActual = Carbon::now()->month;

        // Sumar subtotal desde detalleventa, filtrando ventas por mes actual
        $totalVentasMes = DetalleVenta::whereHas('venta', function ($query) use ($mesActual) {
            $query->whereMonth('fecha', $mesActual);
        })->sum('subtotal');

        // Historial de ventas con total sumado desde detalleventa
        $historialVentas = Venta::with(['usuario', 'detalles'])
        ->orderBy('fecha', 'desc')
        ->take(20)
        ->get()
        ->map(function($venta) {
            return [
                'id' => $venta->id,
                'fecha' => Carbon::parse($venta->fecha)->format('Y-m-d'),
                'cliente' => $venta->usuario ? $venta->usuario->name : 'Cliente Anónimo',
                'total' => $venta->detalles->sum('subtotal'), // suma los subtotales de detalleventa
            ];
        });

        return Inertia::render('adminMicromarket/DashboardMicromarket', [
            'totalProductos' => $totalProductos,
            'productosBajoStock' => $productosBajoStock,
            'totalVentasMes' => $totalVentasMes,
            'historialVentas' => $historialVentas,
        ]);
    }
}
