<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\DetalleVenta;
use Carbon\Carbon;

class HistorialVentasController extends Controller
{
    public function index()
    {
        $totalProductos = \App\Models\Producto::count();
        $productosBajoStock = \App\Models\Producto::where('stock', '<', 5)->count();

        // Suma total de subtotales de detalleventa para ventas del mes actual
        $totalVentasMes = DetalleVenta::whereHas('venta', function($query) {
            $query->whereMonth('fecha', now()->month);
        })->sum('subtotal');

        $ventas = \App\Models\Venta::with('usuario')
            ->orderBy('fecha', 'desc')
            ->get()
            ->map(function ($venta) {
                return [
                    'id' => $venta->id,
                    'fecha' => $venta->fecha->format('Y-m-d'),
                    'cliente' => $venta->usuario->name ?? 'Sin nombre',
                    'total' => $venta->total,
                ];
            });

        return Inertia::render('DashboardMicromarket', [
            'totalProductos' => $totalProductos,
            'productosBajoStock' => $productosBajoStock,
            'totalVentasMes' => $totalVentasMes ?? 0,
            'historialVentas' => $ventas,
        ]);
    }

    public function imprimir()
    {
        $ventas = Venta::with(['usuario', 'detalles'])
            ->orderBy('fecha', 'desc')
            ->take(20)
            ->get()
            ->map(function ($venta) {
                return [
                    'id' => $venta->id,
                    'fecha' => $venta->fecha,
                    'cliente' => $venta->usuario ? $venta->usuario->name : 'Sin nombre',
                    'total' => $venta->detalles->sum('subtotal'),
                ];
            });

        return Pdf::loadView('pdf.historial-ventas', ['ventas' => $ventas])
            ->download('historial_ventas.pdf');
    }
}
