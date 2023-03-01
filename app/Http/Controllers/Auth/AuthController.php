<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{

    public function register(Request $request)
    {

        $fields = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);


        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        $token = $user->createToken('pokemon_app_token')->plainTextToken;

        $response = [
            'user' => new UserResource($user->load(['pokemons',
                'favoritePokemon',
                'likedPokemons',
                'hatedPokemons',
            ])),
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Incorrect email or password',
            ], 401);
        }

        $token = $user->createToken('pokemon_app_token')->plainTextToken;

        $response = [
            'user' => new UserResource($user->load(['pokemons',
                'favoritePokemon',
                'likedPokemons',
                'hatedPokemons',
            ])),
            'token' => $token,
        ];

        return response($response, 200);
    }
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out',
        ];
    }

    public function loginWithToken(Request $request)
    {

        $token = PersonalAccessToken::findToken($request->input('token'));

        if ($token && !$token->expiresAt) {
            $user = $token->tokenable;
            $response = [
                'user' => new UserResource($user->load(['pokemons',
                    'favoritePokemon',
                    'likedPokemons',
                    'hatedPokemons',
                ])),
                'token' => $token->token,
            ];

            return response($response, 200);
        }
    }
}
