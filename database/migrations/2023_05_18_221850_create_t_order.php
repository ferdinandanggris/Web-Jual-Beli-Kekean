<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTOrder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('t_order', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->enum("status_pemesanan",["persetujuan_admin","menunggu_pembayaran","pembayaran_diterima","pesanan_dikirim","pesanan_diterima","pesanan_dibatalkan"])->default("persetujuan_admin");
            $table->enum("status_approval",["pending","approve"])->default("pending");
            $table->integer('biaya_pengiriman')->default(0);
            $table->timestamps();
        });

        Schema::create('t_order_detail', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id');
            $table->integer('product_id');
            $table->integer('qty');
            $table->string('size');
            $table->integer('harga');
            $table->integer('total_harga');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('t_order');
        Schema::dropIfExists('t_order_detail');
    }
}
