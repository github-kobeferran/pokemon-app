<?php

namespace Database\Seeders;

use App\Models\Pokemon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use PokePHP\PokeApi;

class PokemonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement("SET foreign_key_checks=0");
        Pokemon::truncate();
        DB::statement("SET foreign_key_checks=1");

        $api = new PokeApi;

        $data = json_decode(
            $api->resourceList(
                'pokemon',
                10000,
            )
        );

        $pokemon_data = collect($data->results)->map(function ($item) use ($api) {
            $item->name = $item->name;
            $parts = explode('/', $item->url);
            $item->id = $parts[6];
            // $item->cover = json_decode($api->pokemon($item->name))->sprites->other->dream_world->front_default;

            return collect([
                'name' => $item->name,
                'id' => $item->id,
            ]);
        });

        DB::table('pokemons')->insert($pokemon_data->toArray());
    }
}
