<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use PokePHP\PokeApi;

class Pokemon extends Model
{
    use HasFactory;

    protected $table = 'pokemons';

    protected $appends = [
        'cover_image',
    ];

    public function getCoverImageAttribute()
    {
        $api = new PokeApi;

        return json_decode($api->pokemon($this->id))->sprites->other->dream_world->front_default;
    }

    public function usersWhoFavorited()
    {
        return $this->belongsToMany(User::class)->wherePivot('type', 'favorite');
    }

    public function usersWhoLiked()
    {
        return $this->belongsToMany(User::class)->wherePivot('type', 'liked');
    }

    public function usersWhoHated()
    {
        return $this->belongsToMany(User::class)->wherePivot('type', 'hated');
    }
}
