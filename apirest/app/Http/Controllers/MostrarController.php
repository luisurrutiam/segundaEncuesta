<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Encuesta;
use Illuminate\Http\JsonResponse;

class MostrarController extends Controller
{
    public function index()
    {
        $encuestas = Encuesta::with('preguntas.tipopregunta', 'preguntas.opciones')->get();
        return new JsonResponse($encuestas, 200);
    }

    public function show($id)
    {
        $encuesta = Encuesta::with('preguntas.tipopregunta', 'preguntas.opciones')->find($id);

        if (!$encuesta) {
            return new JsonResponse([
                'status' => 404,
                'message' => 'Encuesta no encontrada'
            ], 404);
        }

        return new JsonResponse($encuesta, 200);
        
    }
}