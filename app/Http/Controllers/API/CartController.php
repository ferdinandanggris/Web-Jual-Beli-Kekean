<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Product;
use App\Models\Keranjang;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Facade\FlareClient\Http\Response;
use PDF;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;
            $product_size = $request->product_size;

            if ($product_size == '') {
                return response()->json([
                    'status' => 500,
                    'message' => 'Harap memilih ukuran produk',
                ]);
            } else if ($product_qty == 0) {
                return response()->json([
                    'status' => 500,
                    'message' => 'harap menentukan jumlah produk yang akan dibeli',
                ]);
            }

            $productCheck = Product::where('id', $product_id)->with('size')->first();
            if ($productCheck) {
                $dataKeranjang = Keranjang::where('product_id', $product_id)->where('user_id', $user_id)->where('size', $product_size)->first();
                if (!empty($dataKeranjang)) {
                    $size = $this->checkStock($product_size);
                    if($productCheck->size->$size < $dataKeranjang->qty + $product_qty){
                        return response()->json([
                            'status' => 409,
                            'message' => 'Kamu telah memasukkan ' . $dataKeranjang->qty . ' barang ke dalam keranjang. Kamu tidak bisa menambah jumlah barang di keranjang karena telah melebihi batas pembelian promosi.',
                        ]);
                    }
                    $dataKeranjang->qty = $dataKeranjang->qty + $product_qty;
                    $dataKeranjang->save();
                    return response()->json([
                        'status' => 201,
                        'message' => 'Barang berhasil ditambahkan ke keranjang',
                    ]);
                } else {
                    $size = $this->checkStock($product_size);
                    if($productCheck->size->$size < $product_qty){
                        return response()->json([
                            'status' => 409,
                            'message' => 'Kamu tidak bisa menambah jumlah barang di keranjang karena telah melebihi batas pembelian promosi.',
                        ]);
                    }
                    if ($product_size == '') {
                        return response()->json([
                            'status' => 500,
                            'message' => 'Harap memilih ukuran produk',
                        ]);
                    } else if ($product_qty == 0) {
                        return response()->json([
                            'status' => 500,
                            'message' => 'harap menentukan jumlah produk yang akan dibeli',
                        ]);
                    } else {
                        $cartItem = new Keranjang;
                        $cartItem->user_id = $user_id;
                        $cartItem->product_id = $product_id;
                        $cartItem->qty = $product_qty;
                        $cartItem->size = $product_size;
                        $cartItem->save();
                        return response()->json([
                            'status' => 201,
                            'message' => 'Barang berhasil ditambahkan ke keranjang',
                        ]);
                    }
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product tidak ditemukan',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login untuk menambahkan ke keranjang',
            ]);
        }
    }

    public function viewcart()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $user = auth('sanctum')->user();
            $cartItems = Keranjang::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cartItems,
                'user' => $user,
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login untuk melihat keranjang',
            ]);
        }
    }

    public function updateQuantity($cart_id, Request $request)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Keranjang::where('id', $cart_id)->where('user_id', $user_id)->first();
            $cartItem->qty = $request->newQty;
            $cartItem->update();

            return response()->json([
                'status' => 200,
                'message' => 'Berhasil menambah barang',
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login untuk mengubah keranjang',
            ]);
        }
    }

    public function deleteCartItem($cart_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Keranjang::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($cartItem) {
                $cartItem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Item berhasil dihapus',
                ]);
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Item tidak ditemukan',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login untuk mengubah keranjang',
            ]);
        }
    }

    private function checkStock($params){
        switch($params){
            case 'XS':
                return 'stock_xs';
                break;
            case 'S' :
                return 'stock_s';
                break;
            case 'M' :
                return 'stock_m';
                break;
            case 'L' :
                return 'stock_l';
                break;
            case 'XL':
                return 'stock_xxl';
                break;
            default :
                return 'stock_xs';
                break;
        }
    } 
}
