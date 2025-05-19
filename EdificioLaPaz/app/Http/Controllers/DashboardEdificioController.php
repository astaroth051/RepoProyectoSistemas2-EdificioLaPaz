<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;

class DashboardEdificioController extends Controller
{
    public function index()
    {
        $adminEdificio = User::where('rol', 'administrador')->first();

        return Inertia::render('adminEdificio/DashboardEdificio', [
            'adminEdificio' => $adminEdificio,
        ]);
    }
}
