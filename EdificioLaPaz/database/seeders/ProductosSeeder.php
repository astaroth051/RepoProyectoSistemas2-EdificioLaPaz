<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('productos')->insert([
            [
                'id_productos' => 1,
                'nombre' => 'Coca-Cola 600ml',
                'descripcion' => 'Bebida gaseosa Coca-Cola de 600ml',
                'precio' => 10.00,
                'stock' => 39,
                'imagen' => 'https://farmacorp.com/cdn/shop/files/909698.jpg?v=1714434896',
                'id_categoria' => 1,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 2,
                'nombre' => 'Pepsi 600ml',
                'descripcion' => 'Bebida gaseosa Pepsi de 600ml',
                'precio' => 9.50,
                'stock' => 37,
                'imagen' => 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750103131001L.jpg',
                'id_categoria' => 1,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 3,
                'nombre' => 'Agua mineral 1L',
                'descripcion' => 'Agua mineral sin gas 1 litro',
                'precio' => 7.00,
                'stock' => 48,
                'imagen' => 'https://multicenter.vtexassets.com/arquivos/ids/304735-800-auto?v=638712541291500000&width=800&height=auto&aspect=true',
                'id_categoria' => 1,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 4,
                'nombre' => 'Papas fritas',
                'descripcion' => 'Bolsa de papas fritas sabor clásico',
                'precio' => 8.50,
                'stock' => 35,
                'imagen' => 'https://cruzimex.com/wp-content/uploads/2020/10/7750025006880-LAYS-REG-72-UND-X-40-GRS-6-TIRAS-2.png',
                'id_categoria' => 2,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 5,
                'nombre' => 'Chocolate',
                'descripcion' => 'Barra de chocolate con leche',
                'precio' => 6.00,
                'stock' => 45,
                'imagen' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROocXxMqctDNB4M90pMxu8MF89noNxd_UbvA&s',
                'id_categoria' => 2,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 6,
                'nombre' => 'Galletas saladas',
                'descripcion' => 'Paquete de galletas saladas',
                'precio' => 5.50,
                'stock' => 30,
                'imagen' => 'https://farmacorp.com/cdn/shop/files/7622201390235_1024x1024.jpg?v=1743394806',
                'id_categoria' => 2,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 7,
                'nombre' => 'Galletas dulces',
                'descripcion' => 'Paquete de galletas dulces',
                'precio' => 5.50,
                'stock' => 30,
                'imagen' => 'https://www.industriasgustossi.com.bo/wp-content/uploads/2022/04/Galletas-Surtidas.jpg',
                'id_categoria' => 2,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 8,
                'nombre' => 'Café instantáneo',
                'descripcion' => 'Café instantáneo en sobre individual',
                'precio' => 3.00,
                'stock' => 25,
                'imagen' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFj2p7B-wLVrQgBvHgLOtQ60N8A31gcOmMQ&s',
                'id_categoria' => 1,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 9,
                'nombre' => 'Jugo de naranja',
                'descripcion' => 'Jugo de naranja natural 500ml',
                'precio' => 12.00,
                'stock' => 20,
                'imagen' => 'https://delizia.bo/wp-content/uploads/2021/12/Zumo-100.png',
                'id_categoria' => 1,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ],
            [
                'id_productos' => 10,
                'nombre' => 'Sándwich de jamón',
                'descripcion' => 'Sándwich de jamón y queso',
                'precio' => 15.00,
                'stock' => 15,
                'imagen' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq0deBEgWs5cIhxvJwqnWqAQs_ZY8ALWbtGQ&s',
                'id_categoria' => 3,
                'estado' => 1,
                'fecha_restock' => '2025-05-10 00:03:14'
            ]
        ]);
    }
}
