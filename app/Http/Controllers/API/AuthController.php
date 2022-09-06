<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|max:191',
            'last_name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'address' => 'required|max:500',
            'number_phone' => 'required',
            'password' => 'required|min:8'
        ]);

        if($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'address' => $request->address,
                'number_phone' => $request->number_phone,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'email' => $user->email,
                'token' => $token,
                'message' => 'Registered Successfully',
            ]);
        }
    }
}
