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
        Schema::table('pagosplan', function (Blueprint $table) {
            $table->foreign(['plan_id'], 'pagosplan_ibfk_1')->references(['id_planes_pago'])->on('planespago')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pagosplan', function (Blueprint $table) {
            $table->dropForeign('pagosplan_ibfk_1');
        });
    }
};
