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
        Schema::create('users', function (Blueprint $table) {
            // Mantenemos tu campo id_user como clave primaria autoincremental
            $table->integer('id_user', true);

            // Tus campos personalizados
            $table->string('name', 100);
            $table->string('lastname', 100);
            $table->string('telefono', 8);
            $table->string('email', 100)->unique('email');
            $table->string('password', 100);
            $table->string('rol', 50);
            $table->integer('departamento_id')->nullable()->index('departamento_id');

            // Añadimos los campos del Laravel por defecto que no estaban en tu estructura
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken(); // Esto crea un campo remember_token para mantener sesiones
            $table->timestamps(); // Esto crea los campos created_at y updated_at automáticamente
        });

        // También añadimos las otras tablas relacionadas con la autenticación
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
