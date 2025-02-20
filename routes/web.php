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
    return file_get_contents(public_path('build/index.html')); // טוען את ה-HTML של React
})->where('any', '.*'); // תופס כל נתיב שלא מתאים ל-API
