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
        Schema::create('cajasahorro', function (Blueprint $table) {
            $table->integer('id_cajas_ahorro', true);
            $table->integer('usuario_id')->index('usuario_id');
            $table->decimal('saldo', 10)->nullable()->default(0);
            $table->decimal('seguro', 10)->nullable()->default(200);
            $table->integer('estado')->nullable()->default(1);
            $table->dateTime('fecha_desactivacion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cajasahorro');
    }
};
