<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PokePHP\PokeApi;


class PokemonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $api = new PokeApi;

        $data = json_decode(
            $api->resourceList(
                'pokemon',
                $request->query('limit'),
                $request->query('offset')
            )
        );

        $data->results = collect($data->results)->map(function ($item) use ($api) {
            $item->name = $item->name;
            $item->url = $item->url;
            // dd(json_decode($api->pokemon($item->name))->sprites->other)->dream_world;
            $item->cover = json_decode($api->pokemon($item->name))->sprites->other->dream_world->front_default;

            return $item;
        });

        return $data;
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
}
