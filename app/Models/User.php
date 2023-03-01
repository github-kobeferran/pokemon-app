<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class User extends Authenticatable implements MustVerifyEmail, HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'dob',
        'password',
        'address',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'name',
        'favorite_pokemon_id',
        'liked_pokemon_ids',
        'hated_pokemon_ids',
        'date_of_birth',
        'image_url',
    ];

    public function pokemons()
    {
        return $this->belongsToMany(Pokemon::class)->withPivot('type');
    }

    public function favoritePokemon()
    {
        return $this->belongsToMany(Pokemon::class)->wherePivot('type', 'favorite');
    }

    public function likedPokemons()
    {
        return $this->belongsToMany(Pokemon::class)->wherePivot('type', 'liked');
    }

    public function hatedPokemons()
    {
        return $this->belongsToMany(Pokemon::class)->wherePivot('type', 'hated');
    }

    public function getNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getFavoritePokemonIdAttribute()
    {
        $favorite = $this->favoritePokemon()->first();
        return $favorite ? $favorite->id : null;
    }

    public function getLikedPokemonIdsAttribute()
    {
        $id = $this->likedPokemons()->pluck('pokemon_id');
        return count($id) > 0 ? $id : [];
    }

    public function getHatedPokemonIdsAttribute()
    {
        $id = $this->hatedPokemons()->pluck('pokemon_id');
        return count($id) > 0 ? $id : [];
    }

    public function getDateOfBirthAttribute()
    {
        return $this->dob ? Carbon::parse($this->dob)->format('M d, Y') : null;
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->fit(Manipulations::FIT_CROP, 300, 300)
            ->nonQueued();
    }

    public function getImageUrlAttribute()
    {
        $media = $this->getFirstMedia('photos');

        if ($media) {
            return $media->getUrl();
        }

        return null;
    }
}
