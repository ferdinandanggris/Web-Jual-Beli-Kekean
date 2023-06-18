<?php

use App\Http\Controllers\API\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CheckOngkirController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\Api\TextureController;
use App\Http\Controllers\API\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);   
Route::post('login', [AuthController::class, 'login']);

Route::post('add-product', [ProductController::class, 'store']);
Route::post('save-image/', [ProductController::class, 'storeImage']);
Route::post('edit-image/{id}', [ProductController::class, 'editImage']);
Route::post('save-model', [ProductController::class, 'storeModel']);
Route::put('update-products/{id}', [ProductController::class, 'update']);
Route::delete('delete-products/{id}', [ProductController::class, 'destroy']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'indexDetail']);
Route::get('edit-products/{id}', [ProductController::class, 'edit']);

Route::post('add-to-cart', [CartController::class, 'addToCart']);
Route::get('cart', [CartController::class, 'viewcart']);
Route::put('cart-update-quantity/{id}', [CartController::class, 'updateQuantity']);
Route::delete('delete-cart-item/{id}', [CartController::class, 'deleteCartItem']);

Route::get('payments', [PaymentController::class, 'getPayment']);
Route::get('payments/{id}', [PaymentController::class, 'show']);
Route::post('add-payment', [PaymentController::class, 'addPayment']);
Route::put('update-payment', [PaymentController::class, 'updatePayment']);
Route::delete('delete-payment/{id}', [PaymentController::class, 'destroy']);

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {
    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message' => 'You are in', 'status' => 200], 200);
    });
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(["prefix" => "article"], function () {
    Route::get("/", [ArticleController::class, "index"]);
    Route::get("/{id}", [ArticleController::class, "show"]);
    Route::post("/", [ArticleController::class, "store"]);
    Route::put("/", [ArticleController::class, "update"]);
    Route::delete("/{id}", [ArticleController::class, "destroy"]);
});

Route::group(["prefix" => "texture"], function () {
    Route::get("/", [TextureController::class, "index"]);
    Route::get("/{id}", [TextureController::class, "show"]);
    Route::post("/", [TextureController::class, "store"]);
    Route::put("/", [TextureController::class, "update"]);
    Route::delete("/{id}", [TextureController::class, "destroy"]);
});

Route::group(['prefix' => "order"],function(){
    Route::get("/", [OrderController::class, "index"]);
    Route::post("/update-status", [OrderController::class, "updateStatus"]);
    Route::post("/update-status-batal", [OrderController::class, "updateStatusBatal"]);
    Route::get("/{id}", [OrderController::class, "show"]);
    Route::post("/checkout", [OrderController::class, "checkoutPembayaran"]);
    Route::post("/", [OrderController::class, "order"]);
    Route::post("/saveAdmin", [OrderController::class, "updateOrder"]);
});

Route::get('/getProvinsi', [CheckOngkirController::class , 'index']);
Route::post('/ongkir', [CheckOngkirController::class , 'check_ongkir']);
Route::get('/getKotaByProvince/{province_id}', [CheckOngkirController::class , 'getCities']);

Route::group(['prefix' => "profil"],function(){
    Route::put("/", [UserController::class, "updateProfil"]);
    Route::post("/address", [UserController::class, "saveAddress"]);
    Route::delete("/address/{id}", [UserController::class, "destroyAddress"]);
    Route::put("/address/{id}", [UserController::class, "updateAddress"]);
    Route::get("/address/{id}", [UserController::class, "getAddressById"]);
    Route::get("/address", [UserController::class, "getAddress"]);
    Route::post("/address/utama/{m_user_address_id}", [UserController::class, "setUtama"]);
    Route::get("/address/utama", [UserController::class, "getAddressUtama"]);
    Route::get("/transaction", [OrderController::class, "getOrderByUser"]);
});


// Route::group(["prefix" => "payments"], function () {
//     Route::get("/", [PaymentController::class, "getPayment"]);
//     Route::get("/{id}", [PaymentController::class, "show"]);
//     Route::post("/", [PaymentController::class, "addPayment"]);
//     Route::put("/", [PaymentController::class, "updatePayment"]);
//     Route::delete("/{id}", [PaymentController::class, "destroy"]);
// });
