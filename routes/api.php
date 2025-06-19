<?php

use App\Http\Controllers\CareerApplicationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmailController;
use App\Mail\Email;

Route::middleware('throttle:10,1')->group(function () {
    Route::post('/signup', [UserController::class, 'store']);
    Route::post('/login', [SessionController::class, 'store']);
});

Route::post('/reset-password-link', [SessionController::class, 'passwordreset']);
// routes/api.php
Route::post('/reset-password', [SessionController::class, 'resetPassword']);

//  todo nned to handle error in case of wrong email in reset password email

Route::post('/sendmail', [EmailController::class, 'sendEmail']);



//file upload
Route::post('/upload', [FileController::class, 'store'])->middleware(['auth:api', 'throttle:60,1']);

//  Career Routes 
Route::prefix('career')->middleware(['auth:api', 'throttle:60,1'])->group(function () {
    Route::post('/create', [CareerController::class, 'store']);
    Route::get('/show', [CareerController::class, 'index']);
    Route::put('/update/{id}', [CareerController::class, 'update']);
    Route::delete('/delete/{id}', [CareerController::class, 'destroy']);
    Route::get('/filter', [CareerController::class, 'filter']);

    Route::post('/{id}/apply', [CareerApplicationController::class, 'apply']);

    
    Route::patch('/application/{id}/status', [CareerApplicationController::class, 'updateStatus'])->middleware(['auth:api']);
});


//  Company Routes 
Route::prefix('company')->middleware(['auth:api', 'throttle:60,1'])->group(function () {
    Route::post('/create', [CompanyController::class, 'store']);
    Route::put('/update/{id}', [CompanyController::class, 'update']);
});
