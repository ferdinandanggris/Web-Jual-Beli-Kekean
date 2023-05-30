<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\Order\OrderCollection;
use App\Models\Keranjang;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function __construct()
    {
        
    }

    public function index()
    {
        $order = Order::with('user')->get();
        return response()->json([
            'status' => 200,
            'order' => new OrderCollection($order),
        ]);
    }

    public function order(Request $request){
        try {
            if (!isset($request->cart)) {
                return response()->json([
                    'status' => 422,
                    'message' => 'Data keranjang tidak boleh kosong',
                ]);
            }
            $cart = $request->cart;
            $payloadOrder =
                ['user_id' => $cart[0]['user_id'],
                'total_harga_produk' => $request->total_price,
                ];
                DB::beginTransaction();
                $dataOrder = Order::create($payloadOrder);
            foreach ($cart as $crt) {
                $payloadOrderDetail = [
                    'product_id' => $crt['product_id'],
                    'qty' => $crt['qty'],
                    'size' => $crt['size'],
                    'harga'=> Product::where('id', $crt['product_id'])->first()->price,
                ];
                $payloadOrderDetail['order_id'] = $dataOrder->id;
                $dataOrderDetail = OrderDetail::create($payloadOrderDetail);
                if ($dataOrderDetail) {
                    Keranjang::where('id', $crt['id'])->delete();
                }
                DB::commit();
                return response()->json([
                    'status' => 200,
                    'message' => 'Berhasil menambahkan data order',
                ]);
            }
            
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage()
            ]);
        }
    }
}
