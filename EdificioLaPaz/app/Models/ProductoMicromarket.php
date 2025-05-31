<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductoMicromarket extends Model
{
    // Nombre de la tabla real
    protected $table = 'productos';

    // Primary Key personalizada
    protected $primaryKey = 'id_productos';

    // Tipo de clave primaria
    protected $keyType = 'int';

    // Si la clave primaria es auto-incremental
    public $incrementing = true;

    // Si la tabla NO tiene columnas created_at y updated_at
    public $timestamps = false;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'imagen',
        'categoria',
        'estado',
        'fecha_restock',
    ];

    // Para que Laravel trate bien los tipos de dato (casting)
    protected $casts = [
        'precio' => 'decimal:2',
        'stock' => 'integer',
        'estado' => 'integer',
        'fecha_restock' => 'datetime',
    ];
}
