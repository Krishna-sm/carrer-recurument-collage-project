<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
        $table->id();
            $table->unsignedBigInteger('user');
            $table->string('title',255);
            $table->string('slug',255)->unique();
            $table->string('image');// image path 
            $table->string('short_desc'); 
            $table->string('desc');//markdown data
            $table->date('extend_date');//markdown data
            $table->timestamps();

            $table->foreign('user')->references('id')->on('users')->onDelete('cascade');



        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
};
