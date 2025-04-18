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
        Schema::table('estadocajaahorro', function (Blueprint $table) {
            $table->foreign(['caja_id'], 'estadocajaahorro_ibfk_1')->references(['id_cajas_ahorro'])->on('cajasahorro')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('estadocajaahorro', function (Blueprint $table) {
            $table->dropForeign('estadocajaahorro_ibfk_1');
        });
    }
};
