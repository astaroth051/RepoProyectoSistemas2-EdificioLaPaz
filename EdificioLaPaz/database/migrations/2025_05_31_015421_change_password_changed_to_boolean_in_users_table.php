<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Cambiar password_changed a boolean
            $table->boolean('password_changed')->default(false)->change();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // En caso de rollback, vuelve a string o al tipo original
            $table->string('password_changed')->nullable()->change();
        });
    }
};
