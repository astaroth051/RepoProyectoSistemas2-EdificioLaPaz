<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';

    protected $fillable = ['nombre', 'categoria', 'estado', 'precio', 'cantidad', 'imagen'];

    public function detallesVenta()
    {
        return $this->hasMany(DetalleVenta::class, 'producto_id');
    }
}
