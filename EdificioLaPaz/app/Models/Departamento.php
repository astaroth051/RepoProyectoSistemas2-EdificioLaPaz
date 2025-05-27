<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $table = 'departamentos';
    protected $primaryKey = 'id_departamentos'; 
    protected $fillable = ['descripcion'];
    public $timestamps = false; 
}
