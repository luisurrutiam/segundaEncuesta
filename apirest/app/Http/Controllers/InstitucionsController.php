<?php

namespace App\Http\Controllers;

use App\Models\Institucion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InstitucionsController extends Controller
{
    public function create(Request $request){
        $validator = Validator::make($request->all(),[
            'nombre' => 'required:institucions,nombre|min:1',
            'informaciongeneral' => 'required:institucions,nombre|min:1'
        ]);

        if($validator->fails()){
            return new JsonResponse([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $institucion = Institucion::create([
            'nombre' => $request->nombre,
            'informaciongeneral' => $request->informaciongeneral
        ]);
   
        return new JsonResponse([
            'status' => 200,
            'msg' => 'Se creo la Institucion',
            'institucion' => $institucion
        ],200);
    }

    public function getInstitucions(){
        $institucions = Institucion::all();

        return response()->json($institucions);
    }

    public function getInstitucion($id){
        $institucion = Institucion::find($id);

        if(!$institucion){
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No se encontro la institucion con el id: '.$id
            ],404);
        }

        return new JsonResponse([
            'status' => 200,
            'institucion' => $institucion
        ],200);

    }

    public function updateInstitucion(Request $request, $id){
        $institucion = Institucion::find($id);

        if(!$institucion){
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No se encontro la institucion con el id: '.$id
            ],404);
        }

        $validator = Validator::make($request->all(),[
            'nombre' => 'min:1',
            'informaciongeneral' => 'min:1'
        ]);

        if($validator->fails()){
            return new JsonResponse([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $institucion->update([
            'nombre' => $request->nombre,
            'informaciongeneral' => $request->informaciongeneral,
        ]);

        return new JsonResponse([
            'status' => 200,
            'msg' => 'Datos actualizados',
            'institucion' => $institucion
        ],200);
    }

    public function delete($id){
        $institucion = Institucion::find($id);

        if(!$institucion){
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No se encontro la institucion con el id: '.$id
            ],404);
        }
        
        $institucion->delete();

        return new JsonResponse([
            'status' => 200,
            'msg' => 'La institucion fue Eliminada',
            'institucion' => $institucion
        ],200);
    }
}
