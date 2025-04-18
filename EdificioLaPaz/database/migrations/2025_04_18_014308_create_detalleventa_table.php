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
        Schema::create('detalleventa', function (Blueprint $table) {
            $table->integer('id_detalle_venta', true);
            $table->integer('venta_id')->index('venta_id');
            $table->integer('producto_id')->index('producto_id');
            $table->integer('cantidad');
            $table->decimal('subtotal', 10);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalleventa');
    }
};
