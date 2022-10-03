<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->unsignedBigInteger('size_id');
            $table->integer('price');
            $table->text('description');
            $table->boolean('has_3d');
            $table->string('image_detail1');
            $table->string('image_detail2');
            $table->string('image_detail3');
            $table->string('model_3d');
            $table->foreign('size_id')
                ->references('id')
                ->on('size');
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
        Schema::dropIfExists('products');
    }
}
