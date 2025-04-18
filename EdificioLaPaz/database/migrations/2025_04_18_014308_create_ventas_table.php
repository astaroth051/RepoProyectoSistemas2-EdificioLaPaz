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
        Schema::create('ventas', function (Blueprint $table) {
            $table->integer('id_ventas', true);
            $table->integer('usuario_id')->index('usuario_id');
            $table->integer('administrador_id')->index('administrador_id');
            $table->dateTime('fecha')->nullable()->useCurrent();
            $table->string('tipo_compra', 50);
            $table->string('estado', 50)->nullable()->default('asap');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};
