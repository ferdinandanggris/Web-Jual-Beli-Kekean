<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnProductNameEnglishAndDescriptionEnglishOnTableProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('products', 'product_name_english') && Schema::hasColumn('products', 'description_english')) {
            Schema::table('products', function (Blueprint $table) {
                $table->string('product_name_english')->nullable()->after('product_name');
                $table->text('description_english')->nullable()->after('description');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('product_name_english');
            $table->dropColumn('description_english');
        });
    }
}
