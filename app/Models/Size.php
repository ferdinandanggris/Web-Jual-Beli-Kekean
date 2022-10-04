<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    public $table = "size";
    public $timestamps = false;
    use HasFactory;

    protected $fillable = [
        'S',
        'M',
        'L',
        'XS',
        'XL',
        'XXL',
    ];

    public function product() {
        return $this->hasOne(Product::class);
    }
}
