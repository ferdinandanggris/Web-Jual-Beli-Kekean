<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailResource extends JsonResource
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
            "nama" => $this->product->product_name,
            "harga" => $this->harga,
            "qty" => $this->qty,
            "size" => $this->size,
            "gambar" => isset($this->product->image) ? $this->product->image[0]->path : null,
        ];
    }
}
