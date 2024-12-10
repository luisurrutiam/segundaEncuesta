<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Encuesta;

class ResultadosController extends Controller
{
    public function index()
    {
        $encuestas = Encuesta::with(['preguntas', 'respuestas'])->get();
        return response()->json($encuestas);
    }

    public function show($id)
    {
        $encuesta = Encuesta::with(['preguntas', 'respuestas'])->findOrFail($id);
        return response()->json($encuesta);
    }
}

