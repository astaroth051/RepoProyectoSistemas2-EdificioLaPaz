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
        Schema::create('estadocajaahorro', function (Blueprint $table) {
            $table->integer('id_estado_caja', true);
            $table->integer('caja_id')->index('caja_id');
            $table->integer('estado');
            $table->string('motivo')->nullable();
            $table->dateTime('fecha')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estadocajaahorro');
    }
};
