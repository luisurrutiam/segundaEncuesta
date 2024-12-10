<?php

use App\Http\Controllers\InstitucionsController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EncuestaController;  
use App\Http\Controllers\MostrarController;
use App\Http\Controllers\RespuestaController;
use App\Http\Controllers\ResultadosController;
use App\Http\Controllers\AuthController;

    
//Metodos de usuarios
Route::post('/create', [UsersController::class, 'create']);
Route::get('/users', [UsersController::class, 'getUsers']);
Route::get('/user/{id}', [UsersController::class, 'getUser']);
Route::put('/user/{id}', [UsersController::class, 'updateUser']);
Route::delete('/user/{id}', [UsersController::class, 'delete']);

//Metodos de instituciones
Route::post('/createInstitucion', [InstitucionsController::class, 'create']);
Route::get('/institucions', [InstitucionsController::class, 'getInstitucions']);
Route::get('/institucion/{id}', [InstitucionsController::class, 'getInstitucion']);
Route::put('/institucion/{id}', [InstitucionsController::class, 'updateInstitucion']);
Route::delete('/institucion/{id}', [InstitucionsController::class, 'delete']);



// Métodos de encuestas
Route::post('/encuestas', [EncuestaController::class, 'store']);
Route::get('/encuestas', [EncuestaController::class, 'index']);
Route::get('/encuestas/{id}', [EncuestaController::class, 'show']);

// Métodos para mostrar encuestas en home
Route::get('encuestas', [MostrarController::class, 'index']);
Route::get('encuestas/{id}', [MostrarController::class, 'show']);

// Métodos para las respuestas
Route::post('/guardar-respuestas', [RespuestaController::class, 'guardarRespuestas']);
Route::get('/api/encuestas/{id}', [EncuestaController::class, 'mostrarEncuesta']);




// Métodos para los resultados
Route::get('/resultados', [ResultadosController::class, 'index']);
Route::get('/resultados/{id}', [ResultadosController::class, 'show']);




//Metodos para login 

Route::post('/login', [AuthController::class, 'login']);
