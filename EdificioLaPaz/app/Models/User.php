<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $table = 'users';

    // Clave primaria personalizada
    protected $primaryKey = 'id_user';

    // Por si acaso no es tipo "id" (bigIncrements), Laravel debe saber que no es autoincremental UUID, por defecto lo es
    public $incrementing = true;

    // Si fuera necesario especificar el tipo (int en este caso, pero Laravel lo asume si es autoincremental)
    protected $keyType = 'int';

    // Si tu tabla no se llama 'users', descomenta la siguiente línea:
    // protected $table = 'users';

    // Campos asignables masivamente
    protected $fillable = [
        'name',
        'lastname',
        'telefono',
        'email',
        'password',
        'rol',
        'departamento_id',
    ];

    // Campos que deben ocultarse en serialización
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Casts automáticos de atributos
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relación con la tabla departamentos
    public function departamento()
    {
        //return $this->belongsTo(Departamento::class, 'departamento_id');
    }


    /**
     * Verifica si el usuario tiene un rol específico
     *
     * @param string $role
     * @return bool
     */
    public function hasRole($role)
    {
        return strtolower(trim($this->rol)) === strtolower(trim($role));
    }

    /**
     * Verifica si el usuario tiene alguno de los roles especificados
     *
     * @param array $roles
     * @return bool
     */
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

