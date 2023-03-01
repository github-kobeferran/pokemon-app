<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        abort_if(!auth()->user(), Response::HTTP_FORBIDDEN, 'Unauthorized');

        return User::where('id', '!=', auth()->user()->id)
            ->paginate(
                $request->query('perPage') ?? 15,
                ['*'],
                'page',
                $request->query('page') ?? 1,
            )->withQueryString();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user->load([
            'favoritePokemon',
            'likedPokemons',
            'hatedPokemons',
        ]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return response(new UserResource($user->load([
            'pokemons'
        ])))->setStatusCode(202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
