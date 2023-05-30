<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 't_order';

    protected $fillable = [
        'user_id',
        'status_pemesanan',
        'status_approve',
        'biaya_pengiriman',
        'total_harga_produk',
        'created_at',
        'updated_at',
    ];

    protected $with = ['user'];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
}
