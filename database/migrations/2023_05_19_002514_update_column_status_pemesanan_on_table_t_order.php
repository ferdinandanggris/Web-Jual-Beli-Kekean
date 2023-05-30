<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateColumnStatusPemesananOnTableTOrder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('t_order', function (Blueprint $table) {
            $table->enum("status_pemesanan",["menunggu_persetujuan_admin","menunggu_pembayaran","pembayaran_diterima","pesanan_dikirim","pesanan_diterima","pesanan_dibatalkan"])->default("menunggu_persetujuan_admin");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
