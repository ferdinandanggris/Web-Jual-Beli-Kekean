<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnTitleEnglishAndIsiEnglishOnTableArticles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('articles', 'title_english') && Schema::hasColumn('articles', 'isi_english')) {
            Schema::table('articles', function (Blueprint $table) {
                $table->string('title_english')->nullable()->after('title');
                $table->mediumText('isi_english')->nullable()->after('isi');
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
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('title_english');
            $table->dropColumn('isi_english');
        });
    }
}
