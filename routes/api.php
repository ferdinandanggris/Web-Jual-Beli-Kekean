<?php

use App\Http\Controllers\API\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\Api\TextureController;

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
    Route::post("/", [OrderController::class, "order"]);
});
// Route::group(["prefix" => "payments"], function () {
//     Route::get("/", [PaymentController::class, "getPayment"]);
//     Route::get("/{id}", [PaymentController::class, "show"]);
//     Route::post("/", [PaymentController::class, "addPayment"]);
//     Route::put("/", [PaymentController::class, "updatePayment"]);
//     Route::delete("/{id}", [PaymentController::class, "destroy"]);
// });
