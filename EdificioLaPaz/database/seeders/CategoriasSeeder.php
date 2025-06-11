<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categorias')->insert([
            [
                'id_categoria' => 1,
                'nombre' => 'Bebidas',
                'estado' => 1,
                'created_at' => '2025-06-11 18:34:25',
                'updated_at' => '2025-06-11 18:34:25'
            ],
            [
                'id_categoria' => 2,
                'nombre' => 'Snacks',
                'estado' => 1,
                'created_at' => '2025-06-11 18:34:25',
                'updated_at' => '2025-06-11 18:34:25'
            ],
            [
                'id_categoria' => 3,
                'nombre' => 'Alimentos',
                'estado' => 1,
                'created_at' => '2025-06-11 18:34:25',
                'updated_at' => '2025-06-11 18:34:25'
            ]
        ]);
    }
}
