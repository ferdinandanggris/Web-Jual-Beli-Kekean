<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    public function addPayment(Request $request) {
        $payments = New Payment;
        $validator = Validator::make($request->all(), [
            'jenis' => 'required',
            'rekening' => 'required',
            'namaBank' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $payments->jenis = $request->input('jenis');
            $payments->nama_bank = $request->input('namaBank');
            $payments->nomor_rekening = $request->input('rekening');
        }
    }
}
