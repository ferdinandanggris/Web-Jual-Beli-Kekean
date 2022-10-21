<?php

namespace App\Http\Requests\Payment;

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
            'jenis' => 'required',
            'rekening' => 'required',
            'namaBank' => 'required',
            'id'    => 'required'
        ];
    }

    public function messages()
    {
        return [
            'jenis.required' => 'Jenis harus diisi',
            'rekening.required' => 'Rekening harus diisi',
            'namaBank.required' => 'Nama Bank harus diisi',
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
