<?php

namespace App\Http\Controllers;

use App\Http\Requests\BindPokemonRequest;
use App\Http\Requests\UnbindPokemonRequest;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use PokePHP\PokeApi;


class PokemonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {


        return Pokemon::when($request->query('search'), function ($query) use ($request) {
            $query->where('name', 'like', '%' . $request->query('search') . '%');
        })->paginate(
            $request->query('perPage') ?? 33,
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
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function bind(BindPokemonRequest $request)
    {
        $fields = $request->validated();

        if (auth()->user()->pokemons()->where('pokemon_id', $fields['pokemon_id'])->exists()) {
            return response([
                'message' => 'pokemon already binded',
            ], 422);
        }

        $count = auth()->user()->pokemons()->wherePivot('type', $fields['type'])->count();

        switch ($fields['type']) {
            case 'favorite':
                if ($count > 0) {
                    return response([
                        'message' => 'favorite pokemon limit reached',
                    ], 422);
                }
                break;
            case 'liked':
                if ($count > 2) {
                    return response([
                        'message' => 'liked pokemon limit reached',
                    ], 422);
                }
                break;
            case 'hated':
                if ($count > 2) {
                    return response([
                        'message' => 'hated pokemon limit reached',
                    ], 422);
                }
                break;
        }


        auth()->user()->pokemons()
            ->wherePivot('type', $fields['type'])
            ->attach($fields['pokemon_id'], ['type' => $fields['type']]);

        return response([
            'user' => auth()->user()->load([
                'pokemons',
                'favoritePokemon',
                'likedPokemons',
                'hatedPokemons',
            ]),
            'message' => 'Pokemon binded as ' . $fields['type'],
        ], 201);
    }

    public function unbind(UnbindPokemonRequest $request)
    {
        $fields = $request->validated();

        if (auth()->user()->pokemons()->where('pokemon_id', $fields['pokemon_id'])->doesntExist()) {
            return response([
                'message' => 'this pokemon is not currently binded with user',
            ], 422);
        }

        auth()->user()->pokemons()->detach($fields['pokemon_id']);

        return response([
            'user' => auth()->user()->load([
                'pokemons',
                'favoritePokemon',
                'likedPokemons',
                'hatedPokemons',
            ]),

            'message' => 'Pokemon unbinded',
        ], 202);
    }
}
