<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    use HasFactory;

    protected $table = 'm_user_address';
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'm_user_id', 'id');
    }

    public function provinsi()
    {
        return $this->belongsTo(Province::class, 'm_provinsi_id', 'id');
    }

    public function kota()
    {
        return $this->belongsTo(City::class, 'm_kota_id', 'id');
    }
}
