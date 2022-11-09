<?php

namespace App\Http\Controllers\API;

use App\Models\Size;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductCollection;
use App\Http\Resources\Product\ProductResource;
use App\Models\ImageDetail;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    protected $productModel;
    protected $imageDetailModel;

    public function __construct()
    {
        $this->productModel = new Product();
        $this->imageDetailModel = new ImageDetail();
    }

    public function store(Request $request)
    {
        // $test = [];
        // $test = json_decode($request->image,true);
        // // return gettype($test);
        // // return $test;
        // $temp = [];
        // for ($i=0; $i < count($test); $i++) {
        //     $temp[$i] = $test[$i];
        // }
        // foreach ($temp as $key => $value) {
        //     # code...
        // }
        // return $temp;

        $validator = Validator::make($request->input('input'), [
            'product_name' => 'required',
            'price' => 'required|numeric',
            'description' => 'required',
            // 'image_detail1' => 'required',
            'image' => 'required',
            'model_3d' => 'required_if:has_3d,true'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        }


        $product = new Product;
        $size = new Size;
        $size->S = $request->input('sizes.S');
        $size->M = $request->input('sizes.M');
        $size->XS = $request->input('sizes.XS');
        $size->L = $request->input('sizes.L');
        $size->XL = $request->input('sizes.XL');
        $size->XXL = $request->input('sizes.XXL');
        $size->save();

        // dd();
        $payload['product_name'] = $request->input('input.product_name');
        $payload['image'] = $request->input('input.image');
        $payload['price'] = $request->input('input.price');
        $payload['model_3d'] = $request->input('input.model_3d');
        $payload['description'] = $request->input('input.description');
        $payload['has_3d'] = $request->input('input.has_3d');
        $payload['size_id'] = $size->id;
        try {
            //code...

            $dataProduct = $this->productModel->store($payload);
            if (!empty($payload['image'])) {
                # code...
                $imageArr = json_decode($payload['image'],true);
                // $imageArr = $payload['image'];

                for ($i=0; $i < count($imageArr); $i++) {
                    # code...
                                        # code...
                    $folderPath = "/products/";

                    $image_parts = explode(";base64,", $imageArr[$i]);
                    $image_type_aux = explode("image/", $image_parts[0]);
                    $image_type = $image_type_aux[1];
                    $image_base64 = base64_decode($image_parts[1]);
                    $file = $folderPath . uniqid() . "." . $image_type;
                    Storage::disk('local')->put($file, $image_base64);
                    $image = $file;
                    $image[$i] = $file ;

                    ImageDetail::create([
                        "product_id" => $dataProduct["id"],
                        "path" => $file,
                    ]);
                    // $payload["gambar"] = $file;
                    // $payload["path_gambar"] = $folderPath;
                }
                // foreach ($imageArr as $key => $image) {
                //     # code...
                //     $folderPath = "/products/";

                //     $image_parts = explode(";base64,", $image);
                //     $image_type_aux = explode("image/", $image_parts[0]);
                //     $image_type = $image_type_aux[1];
                //     $image_base64 = base64_decode($image_parts[1]);
                //     $file = $folderPath . uniqid() . "." . $image_type;
                //     Storage::disk('local')->put($file, $image_base64);
                //     $image = $file ;

                //     ImageDetail::create([
                //         "product_id" => $dataProduct["id"],
                //         "path" => $file,
                //     ]);
                //     // $payload["gambar"] = $file;
                //     // $payload["path_gambar"] = $folderPath;

                // }
            }
            return response()->json([
                'status' => 200,
                'message' => 'Product Added Successfully',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage()
            ]);
        }
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

    public function index()
    {
        $products = $this->productModel->getAll([], 0, false);
        return response()->json([
            'status' => 200,
            'products' => (new ProductCollection($products)),
        ]);
    }

    public function indexDetail($id)
    {
        $products = Product::find($id);
        $size = Product::find($id)->size;
        return response()->json([
            'status' => 200,
            'products' => (new ProductResource($products)),
            'size' => $size,
        ]);
    }

    public function edit($id)
    {
        $products = Product::find($id);
        $size = Product::find($id)->size;
        return response()->json([
            'status' => 200,
            'products' => (new ProductResource($products)),
            'size' => $size,
        ]);
    }
    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->input('input'), [
            'product_name' => 'required',
            'price' => 'required|numeric',
            'description' => 'required',
            'image_detail1' => 'required',
            'model_3d' => 'required_if:has_3d,true'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        }

        $product = Product::find($id);
        $size = Size::find($product->size_id);
        $size->S = $request->input('sizes.S');
        $size->M = $request->input('sizes.M');
        $size->XS = $request->input('sizes.XS');
        $size->L = $request->input('sizes.L');
        $size->XL = $request->input('sizes.XL');
        $size->XXL = $request->input('sizes.XXL');
        $size->update();

        $payload['image'] = $request->input->image;
        $payload['product_name'] = $request->input->product_name;
        $payload['price'] = $request->input->price;
        $payload['model_3d'] = $request->input->model_3d;
        $payload['description'] = $request->input->description;
        $payload['has_3d'] = $request->input->has_3d;
        try {
            //code...
            $dataProduct = $this->productModel->edit($payload, $id);
            if (!empty($payload['image'])) {
                # code...
                // $imageArr = json_decode($payload['image'],true);
                $imageArr = $payload['image'];

                foreach ($imageArr as $key => $image) {
                    # code...
                    $folderPath = "/products/";

                    $image_parts = explode(";base64,", $image);
                    $image_type_aux = explode("image/", $image_parts[0]);
                    $image_type = $image_type_aux[1];
                    $image_base64 = base64_decode($image_parts[1]);
                    $file = $folderPath . uniqid() . "." . $image_type;
                    Storage::disk('local')->put($file, $image_base64);
                    $image = $file;

                    ImageDetail::create([
                        "product_id" => $dataProduct["id"],
                        "path" => $file,
                    ]);
                }
            }
            if (!empty($payload['deleted_image'])) {
                $deleted_image = json_decode($payload['deleted_image'], true);
                foreach ($deleted_image as $key => $id_image) {
                    # code...
                    $dataLama = $this->imageDetailModel->getById($id_image);
                    if ($dataLama["path"] && file_exists(public_path('storage/' . $dataLama["path"]))) {
                        unlink(public_path('storage/' . $dataLama["path"]));
                    }
                    $this->imageDetailModel->drop($id_image);
                }
            }

            return response()->json([
                'status' => 200,
                'message' => 'Product Added Successfully',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage()
            ]);
        }

        // $product->product_name = $request->input('input.product_name');
        // $product->price = $request->input('input.price');
        // $product->description = $request->input('input.description');
        // $product->has_3d = $request->input('input.has_3d');
        // if ($request->input('input.has_3d') == true) {
        //     $product->model_3d = $request->input('input.model_3d');
        //     $product->image_detail1 = $request->input('input.image_detail1');
        //     $product->image_detail2 = $request->input('input.image_detail2');
        //     $product->image_detail3 = $request->input('input.image_detail3');
        // } else {
        //     $product->image_detail1 = $request->input('input.image_detail1');
        //     $product->image_detail2 = $request->input('input.image_detail2');
        //     $product->image_detail3 = $request->input('input.image_detail3');
        //     $product->model_3d = '';
        // }
        // $product->update();
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Product Updated Successfully',
        // ]);
    }

    public function destroy($id)
    {
        $product  = Product::find($id);
        $size = Size::find($product->size_id);
        $product->delete();
        $size->delete();
        $image = ImageDetail::where('product_id', $id);
        foreach ($image as $key => $img) {
            if ($img["path"] && file_exists(public_path('storage/' . $img["path"]))) {
                // dd($img["ttd_path"] . $img["ttd"]);
                // Storage::delete('storage/' . $img["ttd_path"] . $img["ttd"]);
                unlink(public_path('storage/' . $img["path"]));
            }
            $this->imageDetailModel->drop($img['id']);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product Deleted Successfully',
        ]);
    }
}
