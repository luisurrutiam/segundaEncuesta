<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Encuesta;
use App\Models\Pregunta;
use App\Models\Opcion;
use App\Models\Tipopregunta;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Exception;

class EncuestaController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'institucion_id' => 'required|exists:institucions,id',
            'preguntas' => 'required|array',
            'preguntas.*.enunciado' => 'required|string|max:255',
            'preguntas.*.tipopregunta.nombre' => 'required|string|max:255',
            'preguntas.*.tipopregunta.opcion' => 'required|boolean',
            'preguntas.*.opciones' => 'array',
            'preguntas.*.opciones.*.nombre' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        try {
            DB::transaction(function () use ($request) {
                // Crear la encuesta
                $encuesta = Encuesta::create([
                    'nombre' => $request->nombre,
                    'institucion_id' => $request->institucion_id,
                ]);

                foreach ($request->preguntas as $preguntaData) {
                    // Crear o encontrar el tipo de pregunta
                    $tipopregunta = Tipopregunta::firstOrCreate(
                        ['nombre' => $preguntaData['tipopregunta']['nombre']],
                        ['opcion' => $preguntaData['tipopregunta']['opcion']]
                    );

                    // Crear la pregunta
                    $pregunta = Pregunta::create([
                        'enunciado' => $preguntaData['enunciado'],
                        'tipopregunta_id' => $tipopregunta->id,
                        'encuesta_id' => $encuesta->id,
                    ]);

                    // Crear las opciones si existen
                    if (isset($preguntaData['opciones'])) {
                        foreach ($preguntaData['opciones'] as $opcionData) {
                            if (!empty($opcionData['nombre'])) {
                                Opcion::create([
                                    'nombre' => $opcionData['nombre'],
                                    'pregunta_id' => $pregunta->id,
                                ]);
                            }
                        }
                    }
                }

                
            });

            return new JsonResponse([
                'status' => 201,
                'message' => 'Encuesta creada exitosamente'
            ], 201);
        } catch (Exception $e) {
            // Registrar el error en los logs
            Log::error('Error al crear la encuesta: ' . $e->getMessage());

            return new JsonResponse([
                'status' => 500,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            // Obtener la encuesta con sus preguntas, tipos de preguntas y opciones
            $encuesta = Encuesta::with(['preguntas.tipopregunta', 'preguntas.opciones', 'respuestas'])->findOrFail($id);

            return new JsonResponse([
                'status' => 200,
                'data' => $encuesta
            ], 200);
            
        } catch (Exception $e) {
            // Registrar el error en los logs
            Log::error('Error al obtener la encuesta: ' . $e->getMessage());

            return new JsonResponse([
                'status' => 404,
                'message' => 'Encuesta no encontrada'
            ], 404);
        }
    }

    public function mostrarEncuesta($id)
    {
        $encuesta = Encuesta::with(['preguntas.opciones', 'respuestas'])->find($id);
        return response()->json($encuesta);
    }

    public function index()
    {
        $encuestas = Encuesta::with(['preguntas.opciones', 'respuestas'])->get();
        return response()->json($encuestas);
    }
}


