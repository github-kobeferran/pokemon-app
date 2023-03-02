<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use WithFaker;

    /**
     * A basic feature test example.
     */
    public function test_register(): void
    {
        $data = [
            'first_name' => $this->faker()->firstName(),
            'last_name' => $this->faker()->lastName(),
            'email' => $this->faker()->email(),
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->postJson(route('api.register'), $data)
            ->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'email' => $data['email'],
        ]);
    }

    public function test_login(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson(route('api.login'), [
            'email' => $user->email,
            'password' => 'password',
        ])
            ->assertStatus(200);
    }
}
