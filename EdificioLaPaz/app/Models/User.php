<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $primaryKey = 'id_user';

    public $incrementing = true;

    protected $keyType = 'int';

    // ✅ Casts automáticos
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'password_changed' => 'boolean',
        'estado' => 'boolean',
    ];

    // ✅ Campos asignables
    protected $fillable = [
        'name',
        'lastname',
        'telefono',
        'email',
        'password',
        'rol',
        'departamento_id',
        'password_changed',
        'estado',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // ✅ Relación con Caja de Ahorro
    public function cajaAhorro()
    {
        return $this->hasOne(CajaAhorro::class, 'usuario_id', 'id_user');
    }

    // ✅ Relación con Departamento
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'departamento_id');
    }

    // ✅ Verifica si el usuario tiene un rol específico
    public function hasRole($role)
    {
        return strtolower(trim($this->rol)) === strtolower(trim($role));
    }

    public function hasAnyRole($roles)
    {
        $userRole = strtolower(trim($this->rol));

        foreach ((array) $roles as $role) {
            if ($userRole === strtolower(trim($role))) {
                return true;
            }
        }

        return false;
    }
}
