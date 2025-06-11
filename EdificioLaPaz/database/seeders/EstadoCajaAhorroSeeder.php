<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadoCajaAhorroSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('estadocajaahorro')->insert([
            ['id_estado_caja' => 1, 'caja_id' => 1, 'estado' => 1, 'motivo' => 'Apertura de cuenta', 'fecha' => '2025-01-15 10:00:00'],
            ['id_estado_caja' => 2, 'caja_id' => 2, 'estado' => 1, 'motivo' => 'Apertura de cuenta', 'fecha' => '2025-01-15 11:30:00'],
            ['id_estado_caja' => 3, 'caja_id' => 3, 'estado' => 1, 'motivo' => 'Apertura de cuenta', 'fecha' => '2025-01-16 09:45:00'],
        ]);
    }
}
