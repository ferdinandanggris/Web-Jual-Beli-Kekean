<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $product = new Product;
        $size = new Size;
        $size->S = $request->input('sizes.S');
        $size->M = $request->input('sizes.M');
        $size->XS = $request->input('sizes.XS');
        $size->L = $request->input('sizes.L');
        $size->XL = $request->input('sizes.XL');
        $size->XXL = $request->input('sizes.XXL');
        $size->save();

        $product->size_id = $size->id;
        $product->product_name = $request->input('input.product_name');
        $product->price = $request->input('input.price');
        $product->description = $request->input('input.description');
        $product->has_3d = $request->input('input.has_3d');
        if ($request->input('input.has_3d') == true) {
            $product->model_3d = $request->input('input.model_3d');
            $product->image_detail1 = $request->input('input.image_detail1');
            $product->image_detail2 = '';
            $product->image_detail3 = '';
        } else {
            $product->image_detail1 = $request->input('input.image_detail1');
            $product->image_detail2 = '';
            $product->image_detail3 = '';
            $product->model_3d = '';
        }
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

    public function storeImage(Request $request)
    {
        $nama_file = $request->image->getClientOriginalName();
        $request->image->storeAs('catalog', $nama_file);
        return response()->json([
            'status' => 200,
            'message' => 'Image Added Successfully',
        ]);
    }
    public function storeModel(Request $request)
    {
        $nama_file = $request->file->getClientOriginalName();
        $request->file->storeAs('model', $nama_file);
        return response()->json([
            'status' => 200,
            'message' => 'Model Added Successfully',
        ]);

        // $zip = new ZipArchive();
        // $status = $zip->open($request->file->getRealPath());
        // if ($status !== true) {
        //     throw new \Exception($status);
        // }
        // else{
        //     $storageDestinationPath = storage_path("app/uploads/unzip/");

        //     if (!File::exists( $storageDestinationPath)) {
        //         File::makeDirectory($storageDestinationPath, 0755, true);
        //     }
        //     $zip->extractTo($storageDestinationPath);
        //     $zip->close();
        // }
    }

    public function index() {
        $products = Product::all();
        return response()->json([
            'status' => 200,
            'products' => $products,
        ]);
    }

    public function indexDetail($id) {
        $products = Product::all();
        $size = Product::find($id)->size;
        return response()->json([
            'status' => 200,
            'products' => $products,
            'size' => $size,
        ]);
    }

    public function edit($id) {
        $products = Product::find($id);
        return response()->json([
            'status' => 200,
            'products' => $products,
        ]);

    }
    public function update(Request $request, $id) {
        $product = Product::find($id);
        $product->product_name = $request->input('product_name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        $product->has_3d = $request->input('has_3d');
        if ($request->input('has_3d') == true) {
            $product->model_3d = $request->input('model_3d');
            $product->image_detail1 = $request->input('image_detail1');
            $product->image_detail2 = '';
            $product->image_detail3 = '';
        } else {
            $product->image_detail1 = $request->input('image_detail1');
            $product->image_detail2 = '';
            $product->image_detail3 = '';
            $product->model_3d = '';
        }
        $product->update();

        // $product = Product::create([
        //     'product_name' => $request->product_name,
        //     'price' => $request->price,
        //     'description' => $request->description,
        //     'has_3d' => $request->has_3d,
        // ]);

        return response()->json([
            'status' => 200,
            'message' => 'Product Updated Successfully',

        ]);

    }

    public function destroy($id)
    {
        $product  = Product::find($id);
        $size = Size::find($product->size_id);
        $product->delete();
        $size->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product Deleted Successfully',
        ]);
    }
}
