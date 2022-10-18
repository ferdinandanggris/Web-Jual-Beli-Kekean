<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $table = "articles";

    protected $fillable = [
        'title',
        'isi',
        'featured'
    ];

    public function getAll(array $filter, int $itemPerPage, string $sort)
    {
        $data = $this->query();

        $sort = $sort ? $sort : "created_at ASC";
        $data->orderByRaw($sort);
        $itemPerPage = ($itemPerPage > 0) ? $itemPerPage : false;
        return $data->paginate($itemPerPage)->appends("sort", $sort);
    }

    public function store(array $payload)
    {
        return $this->create($payload);
    }

    public function getById(int $id)
    {
        return $this->find($id);
    }

    public function edit(array $payload, int $id)
    {
        return $this->findOrFail($id)->update($payload);
    }

    public function drop(int $id)
    {
        return $this->find($id)->delete();
    }
}
