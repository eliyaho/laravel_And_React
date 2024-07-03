<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Faker\Factory as Faker;

class CreateMortgagesTable extends Migration
{
    public function up()
    {
        Schema::dropIfExists('mortgages'); // Drop table if exists

        Schema::create('mortgages', function (Blueprint $table) {
            $table->id();
            $table->string('bank_name');
            $table->float('amount');
            $table->integer('term');
            $table->timestamps();
        });

        $faker = Faker::create();
        $mortgages = [];
        $batchSize = 10; // Number of records to insert in each batch

        for ($i = 0; $i < 10000; $i++) {
            $mortgages[] = [
                'bank_name' => $faker->company,
                'amount' => rand(100000, 1000000), // Example random amount
                'term' => rand(10, 30), // Example random term
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Insert batch when reaching batch size or end of loop
            if (($i + 1) % $batchSize == 0 || $i == 9999) {
                DB::table('mortgages')->insert($mortgages);
                $mortgages = []; // Reset array
            }
        }
    }

    public function down()
    {
        Schema::dropIfExists('mortgages');
    }
}
