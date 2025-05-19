<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PagoPlan extends Model
{
    protected $table = 'pagosplan';
    protected $primaryKey = 'id_pagos_plan';
    public $timestamps = false;

    protected $fillable = [
        'plan_id',
        'fecha_pago',
        'monto_pagado',
    ];
}
