<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\CreateRequest;
use App\Http\Requests\Payment\UpdateRequest;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{

    private $payment;

    public function __construct()
    {
        $this->payment = new Payment();
    }


    public function addPayment(Request $request)
    {
        $payments = new Payment;
        $validator = Validator::make($request->all(), [
            'jenis' => 'required',
            'rekening' => 'required',
            'namaBank' => 'required'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            // dd($request->toArray());
            // $payments->create($request->toArray());
            $payments->jenis = $request->input('jenis');
            $payments->nama_bank = $request->input('namaBank');
            $payments->nomor_rekening = $request->input('rekening');
            $payments->save();
            return response()->json([
                'status' => 200,
                'message' => 'Product Added Successfully',
            ]);
        }
    }

    public function getPayment()
    {
        $payments = Payment::all();
        return response()->json([
            'status' => 200,
            'payments' => $payments,
        ]);
    }

    public function show($id)
    {
        // dd($id);
        $payment = $this->payment->getById($id);
        if ($payment) {
            return response([
                "status" => true,
                "message" => "Data telah ditemukan.",
                "payments" => $payment
            ], 200);
        }
        return response([
            "status" => false,
            "message" => "Data tidak ditemukan."
        ], 422);
    }

    public function updatePayment(UpdateRequest $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response([
                "status" => false,
                "message" => $request->validator->errors(),
            ], 422);
        }
        $payment = $request->only(['jenis', 'rekening', 'namaBank', 'id']);
        $req = [
            'jenis' => $payment['jenis'],
            'nomor_rekening' => $payment['rekening'],
            'nama_bank' => $payment['namaBank'],
            'id' => $payment['id']
        ];
        try {
            $this->payment->edit($req, $req['id']);
            return response([
                'status' => true,
                'message' => 'Data berhasil diubah',
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response([
                'status' => false,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
        $response = $this->payment->drop($id);

        if (!$response) {
            return response(["Mohon maaf data  tidak ditemukan"], 422);
        }

        return response([
            "status" => true,
            "message" => "Berhasil menghapus data.",
        ], 422);
    }
}
