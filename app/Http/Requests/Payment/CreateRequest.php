<?php

namespace App\Http\Requests\Payment;

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
            'jenis' => 'required',
            'nomor_rekening' => 'required',
            'namaBank' => 'required',
            'id'    => 'required'
        ];
    }

    public function messages()
    {
        return [
            'jenis.required' => 'Jenis harus diisi',
            'nomor_rekening.required' => 'Nomor Rekening harus diisi',
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
