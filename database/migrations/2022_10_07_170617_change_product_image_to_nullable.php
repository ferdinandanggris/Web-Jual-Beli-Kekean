<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeProductImageToNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('image_detail1')->nullable()->change();
            $table->string('image_detail2')->nullable()->change();
            $table->string('image_detail3')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('nullable', function (Blueprint $table) {
            $table->string('image_detail1')->change();
            $table->string('image_detail2')->change();
            $table->string('image_detail3')->change();
        });
    }
}
