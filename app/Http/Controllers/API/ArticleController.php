<?php

namespace App\Http\Controllers\API;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Article\CreateRequest;
use App\Http\Requests\Article\UpdateRequest;
use App\Http\Resources\Article\ArticleResource;
use App\Http\Resources\Article\ArticleCollection;

class ArticleController extends Controller
{
    private $articleModel;

    public function __construct()
    {
        $this->articleModel = new Article();
    }

    public function index(Request $request)
    {
        $filter = json_decode($request["filter"] ?? "", true) ?? [];
        $articles = $this->articleModel->getAll($filter, $request->itemPerPage ?? 20, $request->sort ?? "");
        return response([
            "status" => 200,
            "data" => (new ArticleCollection($articles))
        ], 200);
    }

    public function show($id)
    {
        $article = $this->articleModel->getById($id);
        if ($article) {
            return response([
                "status" => 200,
                "message" => "Data telah ditemukan.",
                "data" => (new ArticleResource($article)),
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
            "title",
            "isi",
            "featured",
            "overview",
            "image"
        ]);

        try {
            if (!empty($payload["image"])) {
                $folderPath = "/articles/";

                $image_parts = explode(";base64,", $payload["image"]);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $file = $folderPath . uniqid() . "." . $image_type;
                Storage::disk('local')->put($file, $image_base64);
                $payload["image"] = $file ;
                // $payload["gambar"] = $file;
                // $payload["path_gambar"] = $folderPath;
            }

            $result = $this->articleModel->store($payload);
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
            "title",
            "isi",
            "featured",
            "overview",
            "image"
        ]);

        try {

            $dataLama = $this->articleModel->getById($payload['id']);
            if ($dataLama["image"] && file_exists(public_path('storage/' . $dataLama["image"]))) {
                // dd($dataLama["ttd_path"] . $dataLama["ttd"]);
                // Storage::delete('storage/' . $dataLama["ttd_path"] . $dataLama["ttd"]);
                unlink(public_path('storage/' . $dataLama["image"]));
            }
            $folderPath = "/articles/";

            $image_parts = explode(";base64,", $payload["image"]);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . uniqid() . "." . $image_type;
            Storage::disk('local')->put($file, $image_base64);
            $payload["image"] = $file ;

            $this->articleModel->edit($payload, $payload["id"]);
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

        $response = $this->articleModel->drop($id);

        if (!$response) {
            return response(["Mohon maaf data  tidak ditemukan"], 422);
        }

        return response([
            "status" => 200,
            "message" => "Berhasil menghapus data.",
        ], 200);
    }
}
