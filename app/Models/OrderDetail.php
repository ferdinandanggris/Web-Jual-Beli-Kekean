<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    protected $table = 't_order_detail';

    protected $fillable = [
        'order_id',
        'product_id',
        'qty',
        'size',
        'harga',
        'biaya_total',
    ];
    
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function product() {
        return $this->belongsTo(Product::class)->with('image');
    }
}
