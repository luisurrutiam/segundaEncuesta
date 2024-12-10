<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            // Autenticación exitosa
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(['token' => $token, 'isDeveloper' => $user->is_developer], 200);
        } else {
            // Autenticación fallida
            return response()->json(['error' => 'Email o contraseña incorrectos'], 401);
        }
    }
}