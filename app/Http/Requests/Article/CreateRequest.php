<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class CreateRequest extends FormRequest
{
    public $validator = null;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "title" => 'required',
            "isi" => 'required',
            "overview" => 'max:100'
        ];
    }

    /**
     * Setting custom message pesan error yang ditampilkan
     *
     * @return array
     */
    public function messages()
    {
        return [
            "title.required" => "Title harus diisi",
            "isi.required" => "Isi harus diisi",
            "overview.max" => "Overview hanya boleh diisi kurang dari 100 karakter"
        ];
    }

    /**
     * Tampilkan pesan error ketika validasi gagal
     *
     * @return void
     */
    public function failedValidation(Validator $validator)
    {
        $this->validator = $validator;
    }
}
