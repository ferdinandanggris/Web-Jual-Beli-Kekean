<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
       /*
        * Transform the resource into an array.
        *
        * @param  \Illuminate\Http\Request  $request
        * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
        */
        public function toArray($request)
        {
            return [
                "id" => $this->id,
                "product_name" => $this->product_name,
                "product_name_english" => $this->product_name_english,
                "size" => $this->size,
                "imageUrl" => $this->image,
                "price" => $this->price,
                "description" => $this->description,
                "description_english" => $this->description_english,
                "has_3d" => $this->has_3d,
                "model_3d" => $this->model_3d,
                "date" => $this->created_at,
            ];
        }
}
