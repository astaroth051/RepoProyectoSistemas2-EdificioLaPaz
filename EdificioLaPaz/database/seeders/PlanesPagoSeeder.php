<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlanesPagoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('planespago')->insert([
            [
                'venta_id' => 7,
                'monto_total' => 33.00,
                'cuotas' => 3,
                'monto_cuota' => 11.00,
                'fecha_inicio' => '2025-05-04',
                'frecuencia_pago' => 'quincenal',
            ],
            [
                'venta_id' => 10,
                'monto_total' => 37.00,
                'cuotas' => 2,
                'monto_cuota' => 18.50,
                'fecha_inicio' => '2025-05-05',
                'frecuencia_pago' => 'mensual',
            ],
            [
                'venta_id' => 15,
                'monto_total' => 28.00,
                'cuotas' => 1,
                'monto_cuota' => 28.00,
                'fecha_inicio' => '2025-05-18',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 16,
                'monto_total' => 57.50,
                'cuotas' => 3,
                'monto_cuota' => 19.17,
                'fecha_inicio' => '2025-05-18',
                'frecuencia_pago' => 'diaPorMedio',
            ],
            [
                'venta_id' => 17,
                'monto_total' => 67.00,
                'cuotas' => 5,
                'monto_cuota' => 13.40,
                'fecha_inicio' => '2025-05-18',
                'frecuencia_pago' => 'cada3dias',
            ],
            [
                'venta_id' => 18,
                'monto_total' => 67.00,
                'cuotas' => 1,
                'monto_cuota' => 67.00,
                'fecha_inicio' => '2025-05-18',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 19,
                'monto_total' => 67.00,
                'cuotas' => 5,
                'monto_cuota' => 13.40,
                'fecha_inicio' => '2025-05-18',
                'frecuencia_pago' => 'cada3dias',
            ],
            [
                'venta_id' => 20,
                'monto_total' => 20.00,
                'cuotas' => 1,
                'monto_cuota' => 20.00,
                'fecha_inicio' => '2025-05-18',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 21,
                'monto_total' => 78.50,
                'cuotas' => 3,
                'monto_cuota' => 26.17,
                'fecha_inicio' => '2025-05-18',
                'frecuencia_pago' => 'diaPorMedio',
            ],
            [
                'venta_id' => 22,
                'monto_total' => 26.50,
                'cuotas' => 1,
                'monto_cuota' => 26.50,
                'fecha_inicio' => '2025-05-19',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 23,
                'monto_total' => 19.50,
                'cuotas' => 1,
                'monto_cuota' => 19.50,
                'fecha_inicio' => '2025-05-19',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 24,
                'monto_total' => 200.00,
                'cuotas' => 1,
                'monto_cuota' => 200.00,
                'fecha_inicio' => '2025-05-20',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 25,
                'monto_total' => 19.50,
                'cuotas' => 2,
                'monto_cuota' => 9.75,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 26,
                'monto_total' => 39.00,
                'cuotas' => 5,
                'monto_cuota' => 7.80,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'cada3dias',
            ],
            [
                'venta_id' => 27,
                'monto_total' => 77.00,
                'cuotas' => 1,
                'monto_cuota' => 77.00,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diaPorMedio',
            ],
            [
                'venta_id' => 28,
                'monto_total' => 10.00,
                'cuotas' => 1,
                'monto_cuota' => 10.00,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 29,
                'monto_total' => 26.50,
                'cuotas' => 1,
                'monto_cuota' => 26.50,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 30,
                'monto_total' => 10.00,
                'cuotas' => 1,
                'monto_cuota' => 10.00,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 31,
                'monto_total' => 10.00,
                'cuotas' => 1,
                'monto_cuota' => 10.00,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 32,
                'monto_total' => 10.00,
                'cuotas' => 1,
                'monto_cuota' => 10.00,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 33,
                'monto_total' => 10.00,
                'cuotas' => 1,
                'monto_cuota' => 10.00,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 34,
                'monto_total' => 10.00,
                'cuotas' => 1,
                'monto_cuota' => 10.00,
                'fecha_inicio' => '2025-05-26',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 35,
                'monto_total' => 10.00,
                'cuotas' => 1,
                'monto_cuota' => 10.00,
                'fecha_inicio' => '2025-05-27',
                'frecuencia_pago' => 'diario',
            ],
            [
                'venta_id' => 36,
                'monto_total' => 10.00,
                'cuotas' => 1,
                'monto_cuota' => 10.00,
                'fecha_inicio' => '2025-05-27',
                'frecuencia_pago' => 'diario',
            ],
        ]);
    }
}
