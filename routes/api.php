<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PokemonController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->name('api.')->group(function () {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login-with-token', [AuthController::class, 'loginWithToken'])->name('login-with-token');



    Route::apiResources([
        'pokemons' => PokemonController::class,
    ]);
});


Route::prefix('v1')->name('api.')->middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::post('pokemon-bind', [PokemonController::class, 'bind'])->name('pokemon.bind');
    Route::post('pokemon-unbind', [PokemonController::class, 'unbind'])->name('pokemon.unbind');

    Route::apiResources([
        'users' => UserController::class,
    ]);
});
