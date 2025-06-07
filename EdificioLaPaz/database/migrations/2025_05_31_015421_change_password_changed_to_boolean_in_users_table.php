<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Crear ambas columnas boolean
            $table->boolean('password_changed')->default(false);
            $table->boolean('estado')->default(true); // Por defecto activo
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Eliminar ambas columnas en caso de rollback
            $table->dropColumn(['password_changed', 'estado']);
        });
    }
};
