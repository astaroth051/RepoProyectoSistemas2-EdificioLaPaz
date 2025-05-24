<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    // Especificamos el nombre exacto de la tabla
    protected $table = 'productos';
    
    // Definimos la clave primaria personalizada
    protected $primaryKey = 'id_productos';
    
    // Indicamos que es autoincremental
    public $incrementing = true;
    
    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'imagen',
        'categoria',
        'estado',
        'fecha_restock'
    ];
    
    // Conversiones de tipos
    protected $casts = [
        'precio' => 'decimal:2',
        'fecha_restock' => 'datetime',
        'estado' => 'integer'
    ];
    
    // Valores por defecto
    protected $attributes = [
        'estado' => 1,
        'stock' => 0
    ];
}