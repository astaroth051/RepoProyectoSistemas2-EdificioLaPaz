<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->integer('id_usuarios', true);
            $table->string('nombre', 100);
            $table->string('apellido', 100);
            $table->string('telefono', 8);
            $table->string('correo', 100)->unique('correo');
            $table->string('contraseña', 100);
            $table->string('rol', 50);
            $table->integer('departamento_id')->nullable()->index('departamento_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
