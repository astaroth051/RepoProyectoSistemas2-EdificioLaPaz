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
        Schema::create('restocks', function (Blueprint $table) {
            $table->integer('id_restocks', true);
            $table->integer('producto_id')->index('producto_id');
            $table->integer('cantidad');
            $table->dateTime('fecha')->nullable()->useCurrent();
            $table->integer('encargado_id')->index('encargado_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restocks');
    }
};
