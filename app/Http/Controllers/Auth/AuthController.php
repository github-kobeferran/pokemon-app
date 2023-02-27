<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgetPasswordNotification;
use App\Models\Client;
use App\Models\Organisation;
use App\Notifications\UserPasswordChanged;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users,email',
            'password' => 'required',
            'token_name' => 'required',
        ]);

        if ($request->input('token_name') == 'wyac_mobile_token') {
            $user = User::where('email', $request->email)->first();
            if (!$user) {
                throw ValidationException::withMessages(['email' => "Incorrect email or password"]);
            }

            if (Hash::check($request->input('password'), $user->password)) {
                $token = $user->createToken($request->token_name);
                $user->token = $token->plainTextToken;
                return new UserResource($user);
            } else {
                throw ValidationException::withMessages(['password' => "Incorrect email or password"]);
            }
        }
        return response('Authentication Failed', 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);


        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);

        // $request->validate([
        //     'email' => 'required|exists:users,email'
        // ]);
        // $password = Str::random(8);
        // $user = User::where('email', $request->email)->first();
        // $user->password = bcrypt($password);
        // $user->save();
        // // Mail::to($user->email)->queue(new ForgetPasswordNotification($user, $password));
        // return response('We have email your new password.', 201);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|string',
            'password' => 'required|confirmed|string|min:8|max:255',
        ]);

        $user = Auth::user();

        if ($user) {
            if (Hash::check($request->input('old_password'), $user->password)) {
                $user->password = bcrypt($request->input('password'));
                $user->save();

                return response('Password is changed successfully', 201);
            } else {
                throw ValidationException::withMessages(['old_password' => "Current password do not match our record."]);
            }
        } else {
            throw ValidationException::withMessages(['credentials' => "Token not found."]);
        }
    }

    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:4|max:256',
        ]);
        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'name' => ucfirst($request->input('first_name')) . ' ' . ucfirst($request->input('last_name')),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);

        $token = $user->createToken('wyac_mobile_token');
        $user->token = $token->plainTextToken;

        return new UserResource($user);
    }
}
