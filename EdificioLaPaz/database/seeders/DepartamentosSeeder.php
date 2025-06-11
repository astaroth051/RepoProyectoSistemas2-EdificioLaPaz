<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartamentosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departamentos')->insert([
            ['id_departamentos' => 1, 'piso' => 1, 'descripcion' => 'Departamento 101'],
            ['id_departamentos' => 2, 'piso' => 1, 'descripcion' => 'Departamento 102'],
            ['id_departamentos' => 3, 'piso' => 2, 'descripcion' => 'Departamento 201'],
            ['id_departamentos' => 4, 'piso' => 2, 'descripcion' => 'Departamento 202'],
            ['id_departamentos' => 5, 'piso' => 3, 'descripcion' => 'Departamento 301'],
            ['id_departamentos' => 6, 'piso' => 3, 'descripcion' => 'Departamento 302'],
            ['id_departamentos' => 7, 'piso' => 4, 'descripcion' => 'Departamento 401'],
            ['id_departamentos' => 8, 'piso' => 4, 'descripcion' => 'Departamento 402'],
            ['id_departamentos' => 9, 'piso' => 5, 'descripcion' => 'Departamento 501'],
            ['id_departamentos' => 10, 'piso' => 5, 'descripcion' => 'Departamento 502'],
        ]);
    }
}
