<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Modelo de Encuesta
class Encuesta extends Model
{

    use HasFactory;
    protected $fillable = ['nombre', 'institucion_id'];

    public function preguntas()
    {
        return $this->hasMany(Pregunta::class, 'encuesta_id');
    }

    public function institucion()
    {
        return $this->belongsTo(Institucion::class, 'institucion_id');
    }

    public function respuestas()
    {
        return $this->hasMany(Respuesta::class, 'encuesta_id');
    }
    
}
