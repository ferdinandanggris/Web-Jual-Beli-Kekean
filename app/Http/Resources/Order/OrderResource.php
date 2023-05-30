<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            "biaya_pengiriman" => $this->biaya_pengiriman,
            "status_approval" => $this->status_approval,
            "status_pemesanan" => $this->status_pemesanan,
            "total_harga_produk" => $this->total_harga_produk,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "nama" => $this->user->first_name . ' ' . $this->user->last_name,
        ];
    }
}
