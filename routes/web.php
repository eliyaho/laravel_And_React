<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\MortgageController;

// Route::get('/', function () {
//     return view('welcome');
// });

// // Apply the CORS middleware to the mortgages routes
// Route::middleware(\App\Http\Middleware\CorsMiddleware::class)->prefix('mortgages')->group(function () {
//     // Route for preloading mortgages (supports POST and GET)
//     Route::match(['post', 'get'], 'preload', [MortgageController::class, 'preloadMortgages']);

//     // Route for fetching mortgages (supports GET)
//     Route::get('fetch', [MortgageController::class, 'fetchMortgages']);

//     // Route for login (supports POST)
//     Route::match(['post', 'get'], 'login', [MortgageController::class, 'login']);
// });
//פקודה בשביל הרצה דרך הגיט האב
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('index'); // קובץ Blade שמכיל את ה-HTML של React
})->where('any', '.*');
