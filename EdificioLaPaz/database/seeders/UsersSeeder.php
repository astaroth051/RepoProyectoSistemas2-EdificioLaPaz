<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id_user' => 1,
                'name' => 'Roberto',
                'lastname' => 'Mendoza',
                'telefono' => '76543210',
                'email' => 'santi@gmail.com',
                'password' => '$2y$12$uKWDvfXXYj4GfC6aW9GHIe2vAiwB/MKIB0w1.80Rt771Gtt2BGy9S',
                'rol' => 'dueño',
                'departamento_id' => 9,
                'email_verified_at' => '2025-05-10 04:03:14',
                'remember_token' => '5jIFOIuDtY5hGYT019SUPWb3J7lYEf91lXNtnjf2R0YwoEp6VTNGzHCyr4Kj',
                'created_at' => '2025-05-10 04:03:14',
                'updated_at' => '2025-06-10 07:34:29',
                'password_changed' => 0,
                'estado' => 1
            ],
            [
                'id_user' => 2,
                'name' => 'María',
                'lastname' => 'López',
                'telefono' => '75432109',
                'email' => 'erick@gmail.com',
                'password' => '$2y$12$oix9OVR1JX6Pc.tc5sR8ce7om3f0Xf6XWjdIeR4OSLeLBhEhO3oWe',
                'rol' => 'copropietario',
                'departamento_id' => 3,
                'email_verified_at' => '2025-05-10 04:03:14',
                'remember_token' => 'bTQ2CgqEyOHMIfeL52I1xwA4S45Ls1hmGVJy7zmNawWHtaPBOjyT6XjHutt4',
                'created_at' => '2025-05-10 04:03:14',
                'updated_at' => '2025-05-26 07:04:03',
                'password_changed' => 0,
                'estado' => 1
            ],
            [
                'id_user' => 3,
                'name' => 'Juan',
                'lastname' => 'Pérez',
                'telefono' => '77654321',
                'email' => 'yaff@gmail.com',
                'password' => '$2y$12$AjCg0rfOb6V5gm01fQDPY.tRIAm2I4C2aJ85XoICozDZj4V9GqlN2',
                'rol' => 'administrador',
                'departamento_id' => 1,
                'email_verified_at' => '2025-05-10 04:03:14',
                'remember_token' => null,
                'created_at' => '2025-05-10 04:03:14',
                'updated_at' => '2025-05-12 01:26:05',
                'password_changed' => 0,
                'estado' => 1
            ]
        ]);
    }
}
