<?php

namespace App\Http\Controllers\API;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Article\CreateRequest;
use App\Http\Requests\Article\UpdateRequest;
use App\Http\Resources\Article\ArticleCollection;
use App\Http\Resources\Article\ArticleResource;

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
            "status" => true,
            "data" => (new ArticleCollection($articles))
        ], 200);
    }

    public function show($id)
    {
        $article = $this->articleModel->getById($id);
        if ($article) {
            return response([
                "status" => true,
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
            "overview"
        ]);

        try {
            $result = $this->articleModel->store($payload);
            return response([
                "status" => true,
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
            "overview"
        ]);

        try {
            $this->articleModel->edit($payload, $payload["id"]);
            return response([
                "status" => true,
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
            "status" => true,
            "message" => "Berhasil menghapus data.",
        ], 422);
    }
}
