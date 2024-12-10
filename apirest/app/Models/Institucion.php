<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institucion extends Model
{
    use HasFactory;
    protected $fillable = ['nombre'];

    public function encuestas()
    {
        return $this->hasMany(Encuesta::class, 'institucion_id');
    }
}
