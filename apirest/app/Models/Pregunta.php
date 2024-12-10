<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Modelo de Pregunta
class Pregunta extends Model
{

    use HasFactory;
    protected $fillable = ['enunciado', 'tipopregunta_id', 'encuesta_id'];

    public function tipoPregunta()
    {
        return $this->belongsTo(TipoPregunta::class, 'tipopregunta_id');
    }

    public function encuesta()
    {
        return $this->belongsTo(Encuesta::class, 'encuesta_id');
    }

    public function opciones()
    {
        return $this->hasMany(Opcion::class, 'pregunta_id');
    }

    public function respuestas()
    {
        return $this->hasMany(Respuesta::class, 'pregunta_id');
    }

    
}
