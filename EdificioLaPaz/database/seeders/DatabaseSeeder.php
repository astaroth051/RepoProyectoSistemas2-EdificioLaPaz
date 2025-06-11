<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DepartamentosSeeder::class,
            UsersSeeder::class,
            CategoriasSeeder::class,
            ProductosSeeder::class,
            CajasAhorroSeeder::class,
            AdministradoresMicromarketSeeder::class,
            EstadoCajaAhorroSeeder::class,
            VentasSeeder::class,
            DetalleVentaSeeder::class,
            PlanespagoSeeder::class,
            PagosplanSeeder::class,
            RestocksSeeder::class,
            AuditoriaSeeder::class,
        ]);
    }
}
