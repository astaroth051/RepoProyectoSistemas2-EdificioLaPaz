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
        // 1. Crear tabla de categorías
        Schema::create('categorias', function (Blueprint $table) {
            $table->id('id_categoria');
            $table->string('nombre', 100)->unique();
            $table->integer('estado')->default(1);
            $table->timestamps();
        });

        // 2. Agregar columna id_categoria a productos
        Schema::table('productos', function (Blueprint $table) {
            $table->unsignedBigInteger('id_categoria')->after('imagen');
        });

        // 3. Agregar foreign key
        Schema::table('productos', function (Blueprint $table) {
            $table->foreign('id_categoria')->references('id_categoria')->on('categorias');
        });

        // 4. Eliminar la columna categoria antigua (si existe)
        if (Schema::hasColumn('productos', 'categoria')) {
            Schema::table('productos', function (Blueprint $table) {
                $table->dropColumn('categoria');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Agregar columna categoria de vuelta a productos
        Schema::table('productos', function (Blueprint $table) {
            $table->string('categoria', 100)->after('imagen');
        });

        // 2. Eliminar foreign key y columna id_categoria
        Schema::table('productos', function (Blueprint $table) {
            $table->dropForeign(['id_categoria']);
            $table->dropColumn('id_categoria');
        });

        // 3. Eliminar tabla categorias
        Schema::dropIfExists('categorias');
    }
};
