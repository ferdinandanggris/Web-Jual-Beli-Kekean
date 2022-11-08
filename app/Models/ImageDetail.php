<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageDetail extends Model
{
    use HasFactory;

    protected $table = "image_detail";
    protected $fillable = [
        'id',
        'product_id',
        'path'
    ];

    public function getById(int $id)
    {
        return $this->find($id);
    }

    public function drop(int $id)
    {
        return $this->find($id)->delete();
    }

    public function edit(array $payload, int $id)
    {
        return $this->findOrFail($id)->update($payload);
    }
}
