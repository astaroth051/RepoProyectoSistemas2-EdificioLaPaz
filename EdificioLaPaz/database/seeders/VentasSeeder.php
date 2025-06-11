<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VentasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ventas')->insert([
            ['id_ventas' => 1, 'usuario_id' => 1, 'administrador_id' => 1, 'fecha' => '2025-05-12 09:30:00', 'tipo_compra' => 'efectivo', 'estado' => 'completado'],
            ['id_ventas' => 2, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-01 11:45:00', 'tipo_compra' => 'cajaahorro', 'estado' => 'completado'],
            ['id_ventas' => 3, 'usuario_id' => 3, 'administrador_id' => 1, 'fecha' => '2025-05-02 10:15:00', 'tipo_compra' => 'cajaahorro', 'estado' => 'completado'],
            ['id_ventas' => 4, 'usuario_id' => 1, 'administrador_id' => 1, 'fecha' => '2025-05-02 15:30:00', 'tipo_compra' => 'efectivo', 'estado' => 'completado'],
            ['id_ventas' => 5, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-03 12:00:00', 'tipo_compra' => 'cajaahorro', 'estado' => 'completado'],
            ['id_ventas' => 6, 'usuario_id' => 3, 'administrador_id' => 1, 'fecha' => '2025-05-03 14:20:00', 'tipo_compra' => 'planpago', 'estado' => 'completado'],
            ['id_ventas' => 7, 'usuario_id' => 1, 'administrador_id' => 1, 'fecha' => '2025-05-04 09:45:00', 'tipo_compra' => 'efectivo', 'estado' => 'completado'],
            ['id_ventas' => 8, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-04 16:30:00', 'tipo_compra' => 'cajaahorro', 'estado' => 'completado'],
            ['id_ventas' => 9, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-05 11:15:00', 'tipo_compra' => 'planpago', 'estado' => 'completado'],
            ['id_ventas' => 10, 'usuario_id' => 1, 'administrador_id' => 1, 'fecha' => '2025-05-05 13:45:00', 'tipo_compra' => 'cajaahorro', 'estado' => 'completado'],
            ['id_ventas' => 15, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-18 20:35:09', 'tipo_compra' => 'plan', 'estado' => 'asap'],
            ['id_ventas' => 16, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-18 20:50:56', 'tipo_compra' => 'plan', 'estado' => 'asap'],
            ['id_ventas' => 17, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-18 21:16:52', 'tipo_compra' => 'Plan de pagos', 'estado' => 'Pendiente'],
            ['id_ventas' => 18, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-18 21:18:09', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 19, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-18 22:51:56', 'tipo_compra' => 'Plan de pagos', 'estado' => 'Pagado'],
            ['id_ventas' => 20, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-18 22:56:18', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 21, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-18 23:34:22', 'tipo_compra' => 'Plan de pagos', 'estado' => 'Pagado'],
            ['id_ventas' => 22, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2024-04-10 15:51:20', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 23, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-25 15:54:59', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 24, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-20 04:31:57', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 25, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 03:43:34', 'tipo_compra' => 'Plan de pagos', 'estado' => 'Pagado'],
            ['id_ventas' => 26, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 04:44:11', 'tipo_compra' => 'Plan de pagos', 'estado' => 'Pagado'],
            ['id_ventas' => 27, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 04:54:14', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 28, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 04:54:31', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 29, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-04-26 04:59:15', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 30, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 05:06:41', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 31, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 05:10:47', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 32, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 05:19:55', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 33, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 05:24:36', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 34, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-26 05:25:27', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 35, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-27 16:13:26', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado'],
            ['id_ventas' => 36, 'usuario_id' => 2, 'administrador_id' => 1, 'fecha' => '2025-05-27 16:35:47', 'tipo_compra' => 'Pago Total', 'estado' => 'Pagado']
        ]);
    }
}
