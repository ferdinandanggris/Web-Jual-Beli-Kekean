<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_name',
        'price',
        'description',
        'has_3d',
        'image_detail1',
        'image_detail2',
        'image_detail3',
        'image_thumbnail',
        '3d_model'
    ];

    public function keranjang() {
        return $this->belongsTo(Keranjang::class);
    }
}
