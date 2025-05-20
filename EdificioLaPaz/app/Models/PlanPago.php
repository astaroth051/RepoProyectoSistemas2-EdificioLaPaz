<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanPago extends Model
{
    protected $table = 'planespago';
    protected $primaryKey = 'id_planes_pago';
    public $timestamps = false;

    protected $fillable = [
        'venta_id',
        'monto_total',
        'cuotas',
        'monto_cuota',
        'fecha_inicio',
        'frecuencia_pago',
    ];

    public function pagos()
    {
        return $this->hasMany(PagoPlan::class, 'plan_id');
    }
}
