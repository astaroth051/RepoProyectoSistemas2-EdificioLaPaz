<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CajasAhorroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cajasahorro')->insert([
            ['id_cajas_ahorro' => 1, 'usuario_id' => 1, 'saldo' => 500.00, 'seguro' => 200.00, 'estado' => 1, 'fecha_desactivacion' => null],
            ['id_cajas_ahorro' => 2, 'usuario_id' => 2, 'saldo' => 4558.00, 'seguro' => 200.00, 'estado' => 1, 'fecha_desactivacion' => null],
            ['id_cajas_ahorro' => 3, 'usuario_id' => 3, 'saldo' => 450.00, 'seguro' => 200.00, 'estado' => 1, 'fecha_desactivacion' => null],
        ]);
    }
}
