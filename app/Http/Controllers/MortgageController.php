<?php

namespace App\Http\Controllers;

use App\Models\Mortgage;
use Illuminate\Http\Request;
use Faker\Factory as Faker;

class MortgageController extends Controller
{
    /**
     * Preload 10,000 random mortgages.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function preloadMortgages(Request $request)
    {
        // Clear existing data if needed
        Mortgage::truncate();

        // Generate 10,000 random mortgages
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

            Mortgage::insert($mortgages);
            echo "Inserted {$batchSize} records. Total records inserted: " . ($i + $batchSize) . "\n";
        }

        return response()->json(['message' => '10,000 random mortgages preloaded successfully']);
    }

    /**
     * Fetch all mortgages.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchMortgages(Request $request)
    {
        $mortgages = Mortgage::paginate(20); // Example pagination
        return response()->json($mortgages);
    }
}
