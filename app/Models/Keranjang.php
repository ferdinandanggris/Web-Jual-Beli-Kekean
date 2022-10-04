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
        'total'
    ];
    
    public function product() {
        return $this->hasMany(Product::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
    
}
