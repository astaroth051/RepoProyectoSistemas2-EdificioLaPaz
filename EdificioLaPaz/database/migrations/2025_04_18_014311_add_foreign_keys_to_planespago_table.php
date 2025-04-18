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
        Schema::table('planespago', function (Blueprint $table) {
            $table->foreign(['venta_id'], 'planespago_ibfk_1')->references(['id_ventas'])->on('ventas')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planespago', function (Blueprint $table) {
            $table->dropForeign('planespago_ibfk_1');
        });
    }
};
