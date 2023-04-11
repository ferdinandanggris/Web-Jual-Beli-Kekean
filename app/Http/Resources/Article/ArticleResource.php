<?php

namespace App\Http\Resources\Article;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "title_english" => $this->title_english,
            "isi" => $this->isi,
            "isi_english" => $this->isi_english,
            "featured" => $this->featured,
            "overview" => $this->overview,
            "image" => $this->image,
            "date" => $this->created_at,
        ];
    }
}
