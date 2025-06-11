<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuditoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('auditoria')->insert([
            ['id_auditoria' => 1, 'usuario_id' => 3, 'accion' => 'login', 'descripcion' => 'Inicio de sesión', 'fecha_hora' => '2025-05-01 08:30:00'],
            ['id_auditoria' => 2, 'usuario_id' => 3, 'accion' => 'restock', 'descripcion' => 'Reposición de productos', 'fecha_hora' => '2025-05-01 09:00:00'],
            ['id_auditoria' => 3, 'usuario_id' => 3, 'accion' => 'venta', 'descripcion' => 'Venta registrada ID: 1', 'fecha_hora' => '2025-05-01 09:30:00'],
            ['id_auditoria' => 4, 'usuario_id' => 3, 'accion' => 'venta', 'descripcion' => 'Venta registrada ID: 2', 'fecha_hora' => '2025-05-01 11:45:00'],
            ['id_auditoria' => 5, 'usuario_id' => 3, 'accion' => 'logout', 'descripcion' => 'Cierre de sesión', 'fecha_hora' => '2025-05-01 18:00:00'],
            ['id_auditoria' => 6, 'usuario_id' => 3, 'accion' => 'login', 'descripcion' => 'Inicio de sesión', 'fecha_hora' => '2025-05-02 08:45:00'],
            ['id_auditoria' => 7, 'usuario_id' => 3, 'accion' => 'venta', 'descripcion' => 'Venta registrada ID: 3', 'fecha_hora' => '2025-05-02 10:15:00'],
            ['id_auditoria' => 8, 'usuario_id' => 3, 'accion' => 'venta', 'descripcion' => 'Venta registrada ID: 4', 'fecha_hora' => '2025-05-02 15:30:00'],
            ['id_auditoria' => 9, 'usuario_id' => 3, 'accion' => 'logout', 'descripcion' => 'Cierre de sesión', 'fecha_hora' => '2025-05-02 18:15:00']
        ]);
    }
}
