<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $fillable = ['nombre'];

    // Si no usas timestamps (created_at, updated_at), desactívalos:
    // public $timestamps = false;
}
