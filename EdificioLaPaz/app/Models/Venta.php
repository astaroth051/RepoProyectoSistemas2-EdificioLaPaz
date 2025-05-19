<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $table = 'ventas';
    protected $primaryKey = 'id_ventas';
    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'administrador_id',
        'fecha',
        'tipo_compra',
        'estado'
    ];

    public function detalles()
    {
        return $this->hasMany(DetalleVenta::class, 'venta_id', 'id_ventas');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function planPago()
    {
        return $this->hasOne(PlanPago::class, 'venta_id');
    }
}
