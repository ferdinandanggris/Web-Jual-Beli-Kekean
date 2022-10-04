<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    public function addToCart(Request $request) {
        if(auth('sanctum')->check()) {
            return response()->json([
                'status'=>201,
                'message'=>'ini keranjang',
            ]);
        } else {
            return response()->json([
                'status'=>401,
                'message'=>'Login untuk menambahkan ke keranjang',
            ]);
        }
    }
}
