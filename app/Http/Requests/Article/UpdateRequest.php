<?php

namespace App\Http\Requests\Article;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class UpdateRequest extends FormRequest
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
            "id" => 'required',
            "title" => 'required',
            "body" => 'required'
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
            "id.required" => "Id harus diisi",
            "title.required" => "Title harus diisi",
            "body.required" => "Body harus diisi",
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
