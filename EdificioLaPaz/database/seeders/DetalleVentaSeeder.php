<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DetalleVentaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('detalleventa')->insert([
            ['id_detalle_venta' => 1, 'venta_id' => 1, 'producto_id' => 1, 'cantidad' => 2, 'subtotal' => 20.00],
            ['id_detalle_venta' => 2, 'venta_id' => 1, 'producto_id' => 4, 'cantidad' => 1, 'subtotal' => 8.50],
            ['id_detalle_venta' => 3, 'venta_id' => 2, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 9.50],
            ['id_detalle_venta' => 4, 'venta_id' => 2, 'producto_id' => 5, 'cantidad' => 2, 'subtotal' => 12.00],
            ['id_detalle_venta' => 5, 'venta_id' => 3, 'producto_id' => 3, 'cantidad' => 2, 'subtotal' => 14.00],
            ['id_detalle_venta' => 6, 'venta_id' => 3, 'producto_id' => 6, 'cantidad' => 1, 'subtotal' => 5.50],
            ['id_detalle_venta' => 7, 'venta_id' => 4, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 8, 'venta_id' => 4, 'producto_id' => 7, 'cantidad' => 1, 'subtotal' => 5.50],
            ['id_detalle_venta' => 9, 'venta_id' => 5, 'producto_id' => 8, 'cantidad' => 3, 'subtotal' => 9.00],
            ['id_detalle_venta' => 10, 'venta_id' => 5, 'producto_id' => 9, 'cantidad' => 1, 'subtotal' => 12.00],
            ['id_detalle_venta' => 11, 'venta_id' => 6, 'producto_id' => 10, 'cantidad' => 1, 'subtotal' => 15.00],
            ['id_detalle_venta' => 12, 'venta_id' => 6, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 18.00],
            ['id_detalle_venta' => 13, 'venta_id' => 7, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 20.00],
            ['id_detalle_venta' => 14, 'venta_id' => 7, 'producto_id' => 3, 'cantidad' => 1, 'subtotal' => 25.00],
            ['id_detalle_venta' => 15, 'venta_id' => 8, 'producto_id' => 4, 'cantidad' => 2, 'subtotal' => 30.00],
            ['id_detalle_venta' => 16, 'venta_id' => 8, 'producto_id' => 5, 'cantidad' => 1, 'subtotal' => 8.00],
            ['id_detalle_venta' => 17, 'venta_id' => 9, 'producto_id' => 1, 'cantidad' => 3, 'subtotal' => 30.00],
            ['id_detalle_venta' => 18, 'venta_id' => 9, 'producto_id' => 4, 'cantidad' => 2, 'subtotal' => 17.00],
            ['id_detalle_venta' => 19, 'venta_id' => 10, 'producto_id' => 2, 'cantidad' => 2, 'subtotal' => 19.00],
            ['id_detalle_venta' => 20, 'venta_id' => 10, 'producto_id' => 5, 'cantidad' => 3, 'subtotal' => 18.00],
            ['id_detalle_venta' => 21, 'venta_id' => 15, 'producto_id' => 3, 'cantidad' => 4, 'subtotal' => 28.00],
            ['id_detalle_venta' => 22, 'venta_id' => 16, 'producto_id' => 1, 'cantidad' => 2, 'subtotal' => 20.00],
            ['id_detalle_venta' => 23, 'venta_id' => 16, 'producto_id' => 9, 'cantidad' => 1, 'subtotal' => 12.00],
            ['id_detalle_venta' => 24, 'venta_id' => 16, 'producto_id' => 4, 'cantidad' => 3, 'subtotal' => 25.50],
            ['id_detalle_venta' => 25, 'venta_id' => 17, 'producto_id' => 1, 'cantidad' => 2, 'subtotal' => 20.00],
            ['id_detalle_venta' => 26, 'venta_id' => 17, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 9.50],
            ['id_detalle_venta' => 27, 'venta_id' => 17, 'producto_id' => 9, 'cantidad' => 1, 'subtotal' => 12.00],
            ['id_detalle_venta' => 28, 'venta_id' => 17, 'producto_id' => 4, 'cantidad' => 3, 'subtotal' => 25.50],
            ['id_detalle_venta' => 29, 'venta_id' => 18, 'producto_id' => 1, 'cantidad' => 2, 'subtotal' => 20.00],
            ['id_detalle_venta' => 30, 'venta_id' => 18, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 9.50],
            ['id_detalle_venta' => 31, 'venta_id' => 18, 'producto_id' => 9, 'cantidad' => 1, 'subtotal' => 12.00],
            ['id_detalle_venta' => 32, 'venta_id' => 18, 'producto_id' => 4, 'cantidad' => 3, 'subtotal' => 25.50],
            ['id_detalle_venta' => 33, 'venta_id' => 19, 'producto_id' => 1, 'cantidad' => 2, 'subtotal' => 20.00],
            ['id_detalle_venta' => 34, 'venta_id' => 19, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 9.50],
            ['id_detalle_venta' => 35, 'venta_id' => 19, 'producto_id' => 9, 'cantidad' => 1, 'subtotal' => 12.00],
            ['id_detalle_venta' => 36, 'venta_id' => 19, 'producto_id' => 4, 'cantidad' => 3, 'subtotal' => 25.50],
            ['id_detalle_venta' => 37, 'venta_id' => 20, 'producto_id' => 1, 'cantidad' => 2, 'subtotal' => 20.00],
            ['id_detalle_venta' => 38, 'venta_id' => 21, 'producto_id' => 1, 'cantidad' => 3, 'subtotal' => 30.00],
            ['id_detalle_venta' => 39, 'venta_id' => 21, 'producto_id' => 3, 'cantidad' => 4, 'subtotal' => 28.00],
            ['id_detalle_venta' => 40, 'venta_id' => 21, 'producto_id' => 7, 'cantidad' => 1, 'subtotal' => 5.50],
            ['id_detalle_venta' => 41, 'venta_id' => 21, 'producto_id' => 10, 'cantidad' => 1, 'subtotal' => 15.00],
            ['id_detalle_venta' => 42, 'venta_id' => 22, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 43, 'venta_id' => 22, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 9.50],
            ['id_detalle_venta' => 44, 'venta_id' => 22, 'producto_id' => 3, 'cantidad' => 1, 'subtotal' => 7.00],
            ['id_detalle_venta' => 45, 'venta_id' => 23, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 46, 'venta_id' => 23, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 9.50],
            ['id_detalle_venta' => 47, 'venta_id' => 24, 'producto_id' => 1, 'cantidad' => 20, 'subtotal' => 200.00],
            ['id_detalle_venta' => 48, 'venta_id' => 25, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 49, 'venta_id' => 25, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 9.50],
            ['id_detalle_venta' => 50, 'venta_id' => 26, 'producto_id' => 1, 'cantidad' => 2, 'subtotal' => 20.00],
            ['id_detalle_venta' => 51, 'venta_id' => 26, 'producto_id' => 2, 'cantidad' => 2, 'subtotal' => 19.00],
            ['id_detalle_venta' => 52, 'venta_id' => 27, 'producto_id' => 3, 'cantidad' => 11, 'subtotal' => 77.00],
            ['id_detalle_venta' => 53, 'venta_id' => 28, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 54, 'venta_id' => 29, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 55, 'venta_id' => 29, 'producto_id' => 2, 'cantidad' => 1, 'subtotal' => 9.50],
            ['id_detalle_venta' => 56, 'venta_id' => 29, 'producto_id' => 3, 'cantidad' => 1, 'subtotal' => 7.00],
            ['id_detalle_venta' => 57, 'venta_id' => 30, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 58, 'venta_id' => 31, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 59, 'venta_id' => 32, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 60, 'venta_id' => 33, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 61, 'venta_id' => 34, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 62, 'venta_id' => 35, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00],
            ['id_detalle_venta' => 63, 'venta_id' => 36, 'producto_id' => 1, 'cantidad' => 1, 'subtotal' => 10.00]
        ]);
    }
}
