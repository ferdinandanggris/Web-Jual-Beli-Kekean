<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;

    protected $fillable = [
        'S',
        'M',
        'ML',
        'L',
        'XL',
        'XXL',
        'product_id'
    ];

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
