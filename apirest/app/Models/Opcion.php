<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Modelo de Opcion
class Opcion extends Model
{
    use HasFactory;
    
    protected $fillable = ['nombre', 'pregunta_id'];

    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class, 'pregunta_id');
    }
}