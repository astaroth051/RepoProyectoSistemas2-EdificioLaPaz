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
        Schema::table('detalleventa', function (Blueprint $table) {
            $table->foreign(['venta_id'], 'detalleventa_ibfk_1')->references(['id_ventas'])->on('ventas')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['producto_id'], 'detalleventa_ibfk_2')->references(['id_productos'])->on('productos')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('detalleventa', function (Blueprint $table) {
            $table->dropForeign('detalleventa_ibfk_1');
            $table->dropForeign('detalleventa_ibfk_2');
        });
    }
};
