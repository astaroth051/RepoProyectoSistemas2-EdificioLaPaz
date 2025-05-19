<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdministradoresMicromarket extends Model
{
    protected $table = 'administradoresmicromarket';
    protected $primaryKey = 'id_admin_micromarket';
    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'fecha_inicio',
        'fecha_fin',
    ];

    // Relación con usuarios, si quieres usarla después
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}
