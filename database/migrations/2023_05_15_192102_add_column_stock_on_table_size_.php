<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnStockOnTableSize extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('size', function (Blueprint $table) {
            $table->integer('stock_s')->default(0)->after('s');
            $table->integer('stock_m')->default(0)->after('m');
            $table->integer('stock_xs')->default(0)->after('xs');
            $table->integer('stock_l')->default(0)->after('l');
            $table->integer('stock_xl')->default(0)->after('xl');
            $table->integer('stock_xxl')->default(0)->after('xxl');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('size', function (Blueprint $table) {
            $table->dropColumn('stock_s');
            $table->dropColumn('stock_m');
            $table->dropColumn('stock_xs');
            $table->dropColumn('stock_l');
            $table->dropColumn('stock_xl');
            $table->dropColumn('stock_xxl');
        });
    }
}
