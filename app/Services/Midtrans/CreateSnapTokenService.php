<?php
 
namespace App\Services\Midtrans;

use App\Models\Order;
use Midtrans\Snap;
 
class CreateSnapTokenService extends Midtrans
{
    protected $order;
 
    public function __construct($order)
    {
        parent::__construct();
 
        $this->order = $order;
    }
 
    public function getSnapToken()
    {
        $dataOrder = Order::with('orderDetailWithProduct')->where('id', $this->order->id)->first();
        $params = [];

        $params['transaction_details'] = [
            'order_id' => $this->order->id_transaksi,
            'gross_amount' => ($this->order->total_harga_produk + $this->order->biaya_pengiriman),
        ];
        
        foreach ($dataOrder->orderDetailWithProduct as $key => $value) {
            $params["item_details"][] = [
                'id' => $value->product->id,
                'name' => $value->product->product_name,
                'price' => $value->harga,
                'quantity' => $value->qty,
            ];
        }
        $params["item_details"][] = [
            'id' => 'ongkir123',
            'price' => $this->order->biaya_pengiriman,
            'quantity' => 1,
            'name' => 'Biaya Pengiriman',
        ];
 
        $snapToken = Snap::getSnapToken($params);
 
        return $snapToken;
    }
}