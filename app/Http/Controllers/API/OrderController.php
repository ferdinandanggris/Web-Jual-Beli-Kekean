<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\Order\OrderCollection;
use App\Http\Resources\Order\ProductDetailCollection;
use App\Models\Keranjang;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Size;
use App\Services\Midtrans\CreateSnapTokenService;
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

    public function getOrderByUser(){
        $userId =auth('sanctum')->user()->id;
        $order = Order::with('orderDetailWithProduct')->where("user_id","=",$userId)->orderBy("created_at","desc")->get();
        foreach ($order as $key => $value) {
            $order[$key]["waktu"] = date("d F Y",strtotime($value->created_at));
        }
        return response()->json([
            'status' => 200,
            'data' => $order
        ]);
    }

    public function updateOrder(Request $request){
        $payload = $request->only([
            'status_pemesanan',
            'status_approval',
            'status_pengiriman',
            'resi',
        ]);
        $order = Order::where("id","=",$request->order_id)->update($payload);
        return response()->json([
            'status' => 200,
            'data' => $order
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['orderDetailWithProduct','userAddress'])->find($id);
        return response()->json([
            'status' => 200,
            'data' => [
                'order' => $order,
                'detail'=> isset($order->orderDetailWithProduct) ? new ProductDetailCollection($order->orderDetailWithProduct) : [],
            ]
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
                $product = Product::where('id', $crt['product_id'])->first();
                $size = Size::where('id', $product['size_id'])->first();

                if ($crt['qty'] > $size['stock_' . strtolower($crt['size'])]) {
                    DB::rollBack();
                    return response()->json([
                        'status' => 422,
                        'message' => 'Stok produk tidak mencukupi',
                    ]);
                }
                $size['stock_' . strtolower($crt['size'])] = $size['stock_' . strtolower($crt['size'])] - $crt['qty'];
                $size->save();

                $payloadOrderDetail = [
                    'product_id' => $crt['product_id'],
                    'qty' => $crt['qty'],
                    'size' => $crt['size'],
                    'harga'=> Product::where('id', $crt['product_id'])->first()->price * $crt['qty'],
                ];
                
                $payloadOrderDetail['order_id'] = $dataOrder->id;
                $dataOrderDetail = OrderDetail::create($payloadOrderDetail);
                if ($dataOrderDetail) {
                    Keranjang::where('id', $crt['id'])->delete();
                }
            }
            DB::commit();
            return response()->json([
                'status' => 200,
                'data' => Order::with('orderDetailWithProduct')->where('id', $dataOrder->id)->first(),
                'message' => 'Berhasil menambahkan data order',
            ]);
            
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage()
            ]);
        }
    }

    public function checkoutPembayaran(Request $request){
        try {
            $order = Order::where('id', $request->order_id)->first();
            $snapToken = $order->snap_token ?? null;
            $getCountOrderToday = Order::whereDate('created_at', date('Y-m-d'))->count();
            if (empty($snapToken)) {
                $order->id_transaksi = 'TRX-'.date('YmdHis'). '-' . ($getCountOrderToday + 1);
                $order->biaya_pengiriman = $request->ongkir;
                $order->m_user_address_id = $request->user_address_id;
                $order->tipe_pengiriman = $request->tipe_pengiriman;
                $midtrans = new CreateSnapTokenService($order);
                $snapToken = $midtrans->getSnapToken();
                $order->snap_token = $snapToken;
                $order->save();
            }

            return response()->json([
                'status' => 200,
                'data' => [
                    'snap_token' => $snapToken,
                    'order' => $order,
                ]
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function updateStatus(Request $request){
        try {
            $order = Order::where('id_transaksi', $request->transaksi_id)->first();
            $order->status_pemesanan = $request->status_pemesanan;
            $order->save();
            return response()->json([
                'status' => 200,
                'data' => $order,
                'message' => 'Berhasil mengubah status pemesanan',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function updateStatusBatal(Request $request){
        try {
            $order = Order::where('id', $request->id)->first();
            $order->status_pemesanan = $request->status_pemesanan;
            $order->save();
            return response()->json([
                'status' => 200,
                'data' => $order,
                'message' => 'Berhasil mengubah status pemesanan',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage(),
            ]);
        }
    }

    public function updateStatusSelesai(Request $request){
        try {
            $order = Order::where('id', $request->id)->first();
            $order->status_pengiriman = $request->status_pengiriman;
            $order->save();
            return response()->json([
                'status' => 200,
                'data' => $order,
                'message' => 'Berhasil mengubah status pengiriman',
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 422,
                'message' => $th->getMessage(),
            ]);
        }
    }


}
