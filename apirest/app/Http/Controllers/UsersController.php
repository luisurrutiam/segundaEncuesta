<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function create(Request $request){

        $validator = Validator::make($request->all(),[
            'cedula' => 'required|min:1',
            'nombre' => 'required|min:1',
            'apellido' => 'required|min:1',
            'estado' => 'required|min:1',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        if($validator->fails()){
            return new JsonResponse([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'cedula' => $request->cedula ,
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'estado' => $request->estado,
            'email' => $request->email,
            'password' => $request->password
        ]);


        return new JsonResponse([
            'status' => 200,
            'msg' => 'se guardo correctamente',
            'user' => $user
        ], 200);
    }


    public function getUsers(){
        $users = User::all();

        return response()->json($users);
    }

    public function getUser($id){
        $user = User::find($id);

        if(!$user){
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No se encontro el usuario con el id: ' . $id
            ],404);
        }

        return new JsonResponse([
            'status' => 200,
            'user' => $user
        ],200);

    }

    public function updateUser(Request $request, $id){
        $user = User::find($id);

        if(!$user){
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No se encontro el usuario con el id: ' . $id
            ],404);
        }

        $validator = Validator::make($request->all(),[
            'cedula' => 'min:1',
            'nombre' => 'min:1',
            'apellido' => 'min:1',
            'estado' => 'min:1',
            'email' => 'min:1',
            'password' => 'min:1',
        ]);

        if($validator->fails()){
            return new JsonResponse([
                'status' => 400,
                'error' => $validator->errors()
            ],400);
        }

        $user->update([
            'cedula' => $request->cedula,
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'estado' => $request->estado,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return new JsonResponse([
            'status' => 200,
            'msg' => 'Datos actualizado',
            'user' => $user
        ],200);

    }

    public function delete($id){
        $user = User::find($id);

        if(!$user){
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No se encontro el usuario con el id: ' . $id
            ],404);
        }

        $user->delete();

        return new JsonResponse([
            'status' => 200,
            'msg' => 'Usuario eliminado',
            'user' => $user
        ],200);
    }

}
