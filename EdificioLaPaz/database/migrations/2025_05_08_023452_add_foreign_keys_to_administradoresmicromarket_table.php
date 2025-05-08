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
        Schema::table('administradoresmicromarket', function (Blueprint $table) {
            $table->foreign(['usuario_id'], 'administradoresmicromarket_ibfk_1')->references(['id_user'])->on('users')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('administradoresmicromarket', function (Blueprint $table) {
            $table->dropForeign('administradoresmicromarket_ibfk_1');
        });
    }
};
