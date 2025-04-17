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
        Schema::create('pagosplan', function (Blueprint $table) {
            $table->integer('id_pagos_plan', true);
            $table->integer('plan_id')->index('plan_id');
            $table->date('fecha_pago');
            $table->decimal('monto_pagado', 10);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagosplan');
    }
};
