<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\DetalleVenta;
use App\Models\PlanPago;
use App\Models\PagoPlan;
use App\Models\AdministradoresMicromarket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class VentaController extends Controller
{
    // Vista de plan de pagos con los datos de la ficha
    public function mostrarVistaPlanDePagos(Request $request)
    {
        return Inertia::render('client/PlanDePagos', [
            'codigo_ficha' => $request->input('codigo_ficha'),
            'productos' => $request->input('productos'),
            'total' => $request->input('total'),
            'fecha' => $request->input('fecha'),
        ]);
    }

    // Guardar venta con plan de pagos
    public function guardarVentaConPlan(Request $request)
    {
        $request->validate([
            'codigo_ficha' => 'required|string',
            'productos' => 'required|array|min:1',
            'total' => 'required|numeric',
            'fecha' => 'required|date',
            'cuotas' => 'required|integer|min:1|max:5',
            'frecuencia' => 'required|in:diario,diaPorMedio,cada3dias',
        ]);

        try {

            $saldoUsuario = DB::table('cajasahorro')
                ->where('usuario_id', Auth::id())
                ->value('saldo');

            if ($saldoUsuario < $request->total) {
                return response()->json(['error' => 'Saldo insuficiente en la caja de ahorro.'], 422);
            }
            // Iniciar transacción
            DB::beginTransaction();

            // Obtener administrador activo actual
            $adminActual = AdministradoresMicromarket::whereDate('fecha_inicio', '<=', Carbon::today())
                ->where(function ($q) {
                    $q->whereNull('fecha_fin')
                        ->orWhereDate('fecha_fin', '>=', Carbon::today());
                })
                ->first();

            if (!$adminActual) {
                return response()->json(['error' => 'No se encontró un administrador activo del micromarket.'], 422);
            }

            // Determinar tipo de compra y estado
            $tipoCompra = $request->cuotas == 1 ? 'Pago Total' : 'Plan de pagos';
            $estadoVenta = $request->cuotas == 1 ? 'Pagado' : 'Pendiente';


            // Crear venta
            $venta = Venta::create([
                'usuario_id' => Auth::id(),
                'administrador_id' => $adminActual->id_admin_micromarket,
                'fecha' => Carbon::parse($request->fecha),
                'tipo_compra' => $tipoCompra,
                'estado' => $estadoVenta,
            ]);

            // Crear detalle de venta
            foreach ($request->productos as $item) {
                if (!isset($item['producto_id'], $item['cantidad'], $item['subtotal'])) {
                    continue; // saltar items inválidos
                }

                DetalleVenta::create([
                    'venta_id' => $venta->id_ventas,
                    'producto_id' => (int) $item['producto_id'],
                    'cantidad' => (int) $item['cantidad'],
                    'subtotal' => (float) $item['subtotal'],
                ]);
            }

            // Crear plan de pago
            $montoCuota = round($request->total / $request->cuotas, 2);
            $fechaInicio = Carbon::parse($request->fecha);

            $plan = PlanPago::create([
                'venta_id' => $venta->id_ventas,
                'monto_total' => $request->total,
                'cuotas' => $request->cuotas,
                'monto_cuota' => $montoCuota,
                'fecha_inicio' => $fechaInicio,
                'frecuencia_pago' => $request->frecuencia,
            ]);

            // Calcular fechas según frecuencia
            $frecuenciaDias = match ($request->frecuencia) {
                'diario' => 1,
                'diaPorMedio' => 2,
                'cada3dias' => 3,
                default => 1,
            };

            $pagosRealizados = 0;

            for ($i = 0; $i < $request->cuotas; $i++) {
                $fechaPago = $fechaInicio->copy()->addDays($i * $frecuenciaDias);

                // Descontar del saldo del usuario en cajasahorro
                $caja = DB::table('cajasahorro')->where('usuario_id', Auth::id())->first();

                if (!$caja || $caja->saldo < $montoCuota) {
                    DB::rollBack();
                    return response()->json(['error' => 'Saldo insuficiente para cubrir las cuotas.'], 422);
                }

                // Registrar el pago
                PagoPlan::create([
                    'plan_id' => $plan->id_planes_pago,
                    'fecha_pago' => $fechaPago,
                    'monto_pagado' => $montoCuota,
                ]);

                // Descontar cuota del saldo
                DB::table('cajasahorro')->where('usuario_id', Auth::id())->decrement('saldo', $montoCuota);

                $pagosRealizados++;
            }

            // Si todas las cuotas fueron pagadas
            if ($pagosRealizados === $request->cuotas) {
                $venta->estado = 'Pagado';
                $venta->save();
            }

            DB::commit();

            return response()->json(['message' => 'Compra y plan de pagos registrados con éxito.'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al guardar venta con plan: ' . $e->getMessage(), [
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'error' => 'Error al procesar la compra: ' . $e->getMessage()
            ], 500);
        }
    }
}
