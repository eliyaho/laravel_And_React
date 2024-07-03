<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class MortgagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Clear existing data if needed
        DB::table('mortgages')->truncate();

        $faker = Faker::create();
        $batchSize = 500; // Number of records to insert in each batch
        $totalRecords = 10000;

        for ($i = 0; $i < $totalRecords; $i += $batchSize) {
            $mortgages = [];
            $currentTime = now()->toDateTimeString(); // Get current time once per batch

            for ($j = 0; $j < $batchSize; $j++) {
                $mortgages[] = [
                    'bank_name' => $faker->company,
                    'amount' => rand(100000, 1000000),
                    'term' => rand(10, 30),
                    'created_at' => $currentTime,
                    'updated_at' => $currentTime,
                ];
            }

            DB::table('mortgages')->insert($mortgages);
            echo "Inserted {$batchSize} records. Total records inserted: " . ($i + $batchSize) . "\n";
        }

        echo "Seeding completed successfully!\n";
    }
}
