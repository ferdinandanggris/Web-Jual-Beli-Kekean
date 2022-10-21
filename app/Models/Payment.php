<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = "payments";
    protected $fillable = [
        'jenis',
        'nama_bank',
        'nomor_rekening'
    ];

    public function edit(array $payload, int $id)
    {
        return $this->findOrFail($id)->update($payload);
    }

    public function drop(int $id)
    {
        return $this->find($id)->delete();
    }

    public function getById(int $id)
    {
        return $this->find($id);
    }
}
