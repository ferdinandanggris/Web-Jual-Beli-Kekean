<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressUtama extends JsonResource
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
            "nama_penerima"  => $this->nama,
            "label" => $this->label,
            "no_hp" => $this->telepon,
            "alamat" => $this->alamat_lengkap,
            "kode_pos" => $this->kode_pos,
            "catatan" => $this->catatan,
            "m_kota_id" => $this->m_kota_id,
            "m_provinsi_id" => $this->m_provinsi_id
        ];
    }
}
