<?php

namespace App\Http\Controllers\Api;

use App\Models\Texture;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Texture\CreateRequest;
use App\Http\Requests\Texture\UpdateRequest;
use App\Http\Resources\Texture\TextureResource;
use App\Http\Resources\Texture\TextureCollection;

class TextureController extends Controller
{
    private $textureModel;

    public function __construct()
    {
        $this->textureModel = new Texture();
    }

    public function index(Request $request)
    {
        $filter = json_decode($request["filter"] ?? "", true) ?? [];
        $articles = $this->textureModel->getAll($filter, $request->itemPerPage ?? 20, $request->sort ?? "");
        return response([
            "status" => 200,
            "data" => (new TextureCollection($articles))
        ], 200);
    }

    public function show($id)
    {
        $article = $this->textureModel->getById($id);
        if ($article) {
            return response([
                "status" => 200,
                "message" => "Data telah ditemukan.",
                "data" => (new TextureResource($article)),
            ], 200);
        }
        return response([
            "status" => false,
            "message" => "Data tidak ditemukan."
        ], 422);
    }

    public function store(CreateRequest $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response([
                "status" => false,
                "message" => $request->validator->errors(),
            ], 422);
        }
        $payload = $request->only([
            "nama",
            "image"
        ]);

        try {
            if (!empty($payload["image"])) {
                $folderPath = "/texture/";

                $image_parts = explode(";base64,", $payload["image"]);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $file = $folderPath . uniqid() . "." . $image_type;
                Storage::disk('local')->put($file, $image_base64);
                $payload["image"] = $file;
                // $payload["gambar"] = $file;
                // $payload["path_gambar"] = $folderPath;
            }

            $result = $this->textureModel->store($payload);
            return response([
                "status" => 200,
                "message" => "Berhasil menambahkan data.",
                "data" => $result,
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response([
                "status" => false,
                "message" => $th->getMessage()
            ], 422);
        }
    }

    public function update(UpdateRequest $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response([
                "status" => false,
                "message" => $request->validator->errors(),
            ], 422);
        }
        $payload = $request->only([
            "id",
            "nama",
            "image"
        ]);

        try {

            $dataLama = $this->textureModel->getById($payload['id']);
            if ($dataLama["image"] && file_exists(public_path('storage/' . $dataLama["image"]))) {
                // dd($dataLama["ttd_path"] . $dataLama["ttd"]);
                // Storage::delete('storage/' . $dataLama["ttd_path"] . $dataLama["ttd"]);
                unlink(public_path('storage/' . $dataLama["image"]));
            }
            $folderPath = "/texture/";

            $image_parts = explode(";base64,", $payload["image"]);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . uniqid() . "." . $image_type;
            Storage::disk('local')->put($file, $image_base64);
            $payload["image"] = $file;

            $this->textureModel->edit($payload, $payload["id"]);
            return response([
                "status" => 200,
                "message" => "Berhasil mengubah data.",
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response([
                "status" => false,
                "message" => $th->getMessage()
            ], 422);
        }
    }

    public function destroy(int $id)
    {

        $response = $this->textureModel->drop($id);

        if (!$response) {
            return response(["Mohon maaf data  tidak ditemukan"], 422);
        }

        return response([
            "status" => 200,
            "message" => "Berhasil menghapus data.",
        ], 200);
    }
}
