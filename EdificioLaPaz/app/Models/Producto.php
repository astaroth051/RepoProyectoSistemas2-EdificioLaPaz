<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use  SoftDeletes;

    protected $table = 'productos';
    protected $primaryKey = 'id_productos';
    public $timestamps = false; 
    protected $fillable = [
        'id_productos',
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'imagen',
        'categoria',
        'estado',
        'fecha_restock'
    ];

    protected $casts = [
        'precio' => 'decimal:2',
        'fecha_restock' => 'datetime'
    ];

    // Para eliminación lógica
    protected $dates = ['deleted_at'];
}