<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'size_id',
        'product_name',
        'product_name_english',
        'price',
        'description',
        'description_english',
        'has_3d',
        'image_detail1',
        'image_detail2',
        'image_detail3',
        'image_thumbnail',
        'model_3d'
    ];

    public function getAll(array $filter, int $itemPerPage, string $sort)
    {
        $data = $this->query()->with(['size','keranjang', 'image']);

        $sort = $sort ? $sort : "created_at ASC";
        $data->orderByRaw($sort);
        $itemPerPage = ($itemPerPage > 0) ? $itemPerPage : false;
        return $data->paginate($itemPerPage)->appends("sort", $sort);
    }

    public function store(array $payload)
    {
        return $this->create($payload);
    }

    public function keranjang() {
        return $this->hasMany(Keranjang::class);
    }
    public function size() {
        return $this->belongsTo(Size::class);
    }

    public function image(){
        return $this->hasMany(ImageDetail::class,'product_id','id');
    }

    public function getById(int $id)
    {
        return $this->with(['size','image'])->find($id);
    }
    public function drop(int $id)
    {
        return $this->find($id)->delete();
    }

    public function edit(array $payload, int $id)
    {
        return $this->findOrFail($id)->update($payload);
    }
}
