<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $product = new Product;
        $product->product_name = $request->input('product_name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        $product->has_3d = $request->input('has_3d');
        $product->save();

        // $product = Product::create([
        //     'product_name' => $request->product_name,
        //     'price' => $request->price,
        //     'description' => $request->description,
        //     'has_3d' => $request->has_3d,
        // ]);

        return response()->json([
            'status' => 200,
            'message' => 'Product Added Successfully',

        ]);
    }
}
