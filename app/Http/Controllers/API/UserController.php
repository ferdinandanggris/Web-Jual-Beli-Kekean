<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\AddressUtama;
use App\Http\Resources\User\AddressUtamaCollection;
use App\Models\User;
use App\Models\UserAddress;
use App\Models\UserKontak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        
    }

    public function getAddress()
    {
        $user = User::with('getAddress')->find(auth('sanctum')->user()->id);
        return response()->json([
            'status' => 200,
            'data' => $user->getAddress,
        ],200);
    }

    public function getAddressByUser()
    {
        $address = UserAddress::with(['kota','provinsi'])->where('m_user_id',auth('sanctum')->user()->id)->get();
        return response()->json([
            'status' => 200,
            'data' => new AddressUtamaCollection($address),
        ],200);
    }

    public function getAddressUtama(){
        $user = UserAddress::with(['kota','provinsi'])->where('m_user_id',auth('sanctum')->user()->id)->where('is_utama',1)->first();
        return response()->json([
            'status' => 200,
            'data' => new AddressUtama($user),
        ],200);
    }

    public function destroyAddress($id){
        UserAddress::where('id',$id)->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Address deleted successfully',
        ],200);
    }

    public function getAddressById($id){
        $address = UserAddress::with(['kota','provinsi'])->where('id',$id)->first();
        return response()->json([
            'status' => 200,
            'data' => $address,
        ],200);
    }

    public function saveAddress(Request $request){
        $userId =auth('sanctum')->user()->id;
        $payload = $request->only([
            'id',
            'm_user_id',
            'label_alamat',
            'nama',
            'telepon',
            'alamat_lengkap',
            'm_kota_id',
            'm_provinsi_id',
            'kode_pos',
            'catatan',
            'is_utama'
        ]);
        if (isset($payload['id']) && $payload['id'] != null) {
            UserAddress::where('id',$payload['id'])->update($payload);
            return response()->json([
                'status' => 200,
                'message' => 'Address updated successfully',
            ],200);
        }
        $payload['m_user_id'] = $userId;
        isset($payload['is_utama']) ?  : $payload['is_utama'] = 0;

        if ($payload['is_utama'] == 0) {
            UserAddress::where('m_user_id',$userId)->count() == 0 ? $payload['is_utama'] = 1 : $payload['is_utama'] = 0;
        }

        UserAddress::create($payload);

        return response()->json([
            'status' => 200,
            'message' => 'Address saved successfully',
        ],200);
    }

    public function setUtama($m_user_address_id){
        $userId =auth('sanctum')->user()->id;
        $payload['m_user_id'] = $userId;

        UserAddress::where('m_user_id',$userId)->update(['is_utama'=>0]);
        UserAddress::where('id',$m_user_address_id)->update(['is_utama'=>1]);

        return response()->json([
            'status' => 200,
            'message' => 'Address saved successfully',
        ],200);
    }
}
