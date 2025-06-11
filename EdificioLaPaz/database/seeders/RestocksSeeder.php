<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestocksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('restocks')->insert([
            [
                'producto_id' => 1,
                'cantidad' => 30,
                'fecha' => '2025-04-15 09:00:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 2,
                'cantidad' => 25,
                'fecha' => '2025-04-15 09:15:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 3,
                'cantidad' => 40,
                'fecha' => '2025-04-15 09:30:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 4,
                'cantidad' => 20,
                'fecha' => '2025-04-15 09:45:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 5,
                'cantidad' => 30,
                'fecha' => '2025-04-15 10:00:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 6,
                'cantidad' => 15,
                'fecha' => '2025-04-28 11:00:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 7,
                'cantidad' => 15,
                'fecha' => '2025-04-28 11:15:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 8,
                'cantidad' => 15,
                'fecha' => '2025-04-28 11:30:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 9,
                'cantidad' => 10,
                'fecha' => '2025-04-28 11:45:00',
                'encargado_id' => 1,
            ],
            [
                'producto_id' => 10,
                'cantidad' => 10,
                'fecha' => '2025-04-28 12:00:00',
                'encargado_id' => 1,
            ],
        ]);
    }
}
