<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Respuesta;

class RespuestaController extends Controller
{
    public function guardarRespuestas(Request $request)
    {
        $encuesta_id = $request->input('encuesta_id');
        $respuestas = $request->except('encuesta_id');

        // Guardar las respuestas en la base de datos
        foreach ($respuestas as $pregunta_id => $respuesta) {
            Respuesta::create([
                'respuesta' => json_encode($respuesta), // Convertir a JSON
                'encuesta_id' => $encuesta_id,
            ]);
        }

        return response()->json(['message' => 'Respuestas guardadas correctamente'], 201);
    }
}