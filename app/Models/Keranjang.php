<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'qty',
        'size',
    ];
    
    protected $with = ['product'];
    public function product() {
        return $this->belongsTo(Product::class, 'product_id', 'id')->with(['image', 'size']);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
    
}
