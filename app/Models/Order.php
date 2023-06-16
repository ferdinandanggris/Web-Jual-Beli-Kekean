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
        'snap_token',
        'id_transaksi',
        'tipe_pengiriman',
        'm_user_address_id',
        'created_at',
        'updated_at',
    ];

    protected $with = ['user'];
    
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function orderDetail() {
        return $this->hasMany(OrderDetail::class);
    }

    public function orderDetailWithProduct() {
        return $this->hasMany(OrderDetail::class)->with('product');
    }
}
