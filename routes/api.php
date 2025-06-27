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
use Illuminate\Support\Facades\Auth;

Route::middleware('throttle:10,1')->group(function () {
    Route::post('/signup', [UserController::class, 'store']);
    Route::post('/login', [SessionController::class, 'store']);
});
Route::get('/me', [SessionController::class, 'findUser'])->middleware(['auth:api', 'throttle:60,1']);

Route::post('/reset-password-link', [SessionController::class, 'passwordreset']);
Route::post('/reset-password', [SessionController::class, 'resetPassword']);

Route::post('/sendmail', [EmailController::class, 'sendEmail']);

//admin
//get list of recruiter
Route::get('/recruiter', [UserController::class, 'recruiter'])->middleware(['auth:api', 'throttle:60,1']);
Route::patch('/recruiter/{id}/status', [UserController::class, 'updateRecruiterStatus'])->middleware(['auth:api', 'throttle:60,1']);

// Route::middleware('auth:api')->get('/user-test', function () {
//     dd( Auth::user());
// });

//file upload
Route::post('/upload', [FileController::class, 'store'])->middleware(['auth:api', 'throttle:60,1']);
Route::get('/resume/{id}', [FileController::class, 'getFile'])->middleware(['auth:api', 'throttle:60,1']);

Route::get('/career', [CareerController::class, 'index']);

Route::prefix('career')->middleware(['auth:api', 'throttle:60,1'])->group(function () {
    Route::post('/create', [CareerController::class, 'store']);
    Route::get('/my', [CareerController::class, 'mycareer']);
    Route::get('/filter', [CareerController::class, 'filter']);
    Route::get('/{id}', [CareerController::class, 'show']);
    Route::put('/update/{id}', [CareerController::class, 'update']);
    Route::delete('/delete/{id}', [CareerController::class, 'destroy']);
    Route::get('/candidates/{id}', [CareerController::class, 'candidates']);

    Route::post('/{id}/apply', [CareerApplicationController::class, 'apply']);

    Route::patch('/application/{id}/status', [CareerApplicationController::class, 'updateStatus'])->middleware(['auth:api']);
});
Route::get('/applied', [CareerApplicationController::class, 'appliedcareer'])->middleware(['auth:api', 'throttle:60,1']);


//  Company Routes 
Route::prefix('company')->middleware(['auth:api', 'throttle:60,1'])->group(function () {
    Route::post('/create', [CompanyController::class, 'store']);
    Route::put('/update/{id}', [CompanyController::class, 'update']);
    Route::get('/{id}', [CompanyController::class, 'show']);
});
