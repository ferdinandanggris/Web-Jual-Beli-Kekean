<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Province;
use Illuminate\Http\Request;
use Kavist\RajaOngkir\Facades\RajaOngkir;

class CheckOngkirController extends Controller
{
        /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $provinces = Province::all();
        return response()->json([
            'status' => 200,
            'data' => $provinces,
        ],200);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCities($id)
    {
        $city = City::where('province_id', $id)->get();
        return response()->json([
            'status' => 200,
            'data' => $city,
        ],200);
    }

        /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function check_ongkir(Request $request)
    {
        $cost = RajaOngkir::ongkosKirim([
            'origin'        => 305, // ID kota/kabupaten asal
            'destination'   => $request->m_kota_id, // ID kota/kabupaten tujuan
            'weight'        => $request->weight ?? 20, // berat barang dalam gram
            'courier'       => 'jne' // kode kurir pengiriman: ['jne', 'tiki', 'pos'] untuk starter
        ])->get();


        return response()->json([
            'status' => 200,
            'data' => $cost,
        ],200);
    }
}
