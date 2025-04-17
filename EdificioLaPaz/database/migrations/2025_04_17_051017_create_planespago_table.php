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
        Schema::create('planespago', function (Blueprint $table) {
            $table->integer('id_planes_pago', true);
            $table->integer('venta_id')->index('venta_id');
            $table->decimal('monto_total', 10);
            $table->integer('cuotas');
            $table->decimal('monto_cuota', 10);
            $table->date('fecha_inicio');
            $table->string('frecuencia_pago', 50);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planespago');
    }
};
