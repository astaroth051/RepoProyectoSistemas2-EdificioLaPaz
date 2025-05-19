<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CajaAhorro extends Model
{
    protected $table = 'cajasahorro';

    public $timestamps = false; 

    protected $primaryKey = 'id_cajas_ahorro';

    protected $fillable = ['usuario_id', 'estado', 'fecha_desactivacion'];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id', 'id_user');
    }
}
