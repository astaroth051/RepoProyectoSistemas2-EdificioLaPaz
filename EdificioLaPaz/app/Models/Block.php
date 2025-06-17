<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Block extends Model
{
    protected $table = 'blocks';
    protected $fillable = [
        'previous_hash',
        'current_hash',
        'venta_id',
        'comprador',
        'productos',
        'total',
        'fecha',
        'timestamp',
        'codigo_ficha',
    ];

    protected $casts = [
        'productos' => 'array',
        'fecha' => 'datetime',
        'timestamp' => 'datetime',
    ];

    public $timestamps = true;

    public function venta()
    {
        return $this->belongsTo(Venta::class, 'venta_id');
    }

    public static function generateHash($previousHash, $data, $timestamp)
    {
        return hash('sha256', $previousHash . json_encode($data) . $timestamp);
    }

    public static function getLastBlock()
    {
        return self::orderBy('id', 'desc')->first();
    }

}
