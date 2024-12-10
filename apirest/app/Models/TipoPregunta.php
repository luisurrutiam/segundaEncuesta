<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Modelo de TipoPregunta
class TipoPregunta extends Model
{
    protected $fillable = ['nombre', 'opcion'];

    protected $table = 'tipopreguntas';
    
    public function preguntas()
    {
        return $this->hasMany(Pregunta::class, 'tipopregunta_id');
    }
}
