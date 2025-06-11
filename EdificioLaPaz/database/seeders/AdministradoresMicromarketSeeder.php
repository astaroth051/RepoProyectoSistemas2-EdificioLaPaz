<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdministradoresMicromarketSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('administradoresmicromarket')->insert([
            ['id_admin_micromarket' => 1, 'usuario_id' => 3, 'fecha_inicio' => '2025-01-01', 'fecha_fin' => null]
        ]);
    }
}
