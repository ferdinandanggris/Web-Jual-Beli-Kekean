<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'size_id',
        'product_name',
        'price',
        'description',
        'has_3d',
        'image_detail1',
        'image_detail2',
        'image_detail3',
        'image_thumbnail',
        'model_3d'
    ];

    public function store(array $payload)
    {
        return $this->create($payload);
    }

    public function keranjang() {
        return $this->hasMany(Keranjang::class);
    }
    public function size() {
        return $this->belongsTo(Size::class);
    }

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
