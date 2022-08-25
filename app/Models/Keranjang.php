<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'qty',
        'total'
    ];
    
    public function product() {
        return $this->hasMany(Product::class);
    }
    
}
