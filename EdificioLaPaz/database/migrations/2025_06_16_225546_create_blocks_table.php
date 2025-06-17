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
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->string('previous_hash')->default('');
            $table->string('current_hash')->default('');
            $table->integer('venta_id')->nullable();
            $table->string('comprador')->default('');
            $table->json('productos')->nullable();
            $table->integer('total')->default(0);
            $table->timestamp('fecha')->nullable();
            $table->timestamp('timestamp')->nullable();
            $table->string('codigo_ficha')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blocks');
    }
};

