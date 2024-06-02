<?php

use App\Exceptions\ApiError;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobsController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\PublicController;
use Illuminate\Console\Application;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get("/",function(){
         

            return [
                'code'=>200,
                'msg'=>'Backned Work'
            ];
        
});

Route::prefix("/api/v1/")->group(function(){
       
        // auth routes
    Route::prefix('/auth')->group(function(){
            Route::post('/register',[AuthController::class,'register']);
            Route::post('/login',[AuthController::class,'login']);
                // auth routes for auth
            Route::middleware('auth:sanctum')->group(function(){
                Route::get('/profile',[AuthController::class,'profile']);
                Route::post('/logout',[AuthController::class,'logout']);
            });

            
        });


        // jobs route
        Route::middleware('auth:sanctum')->prefix('/jobs')->group(function(){
                    Route::post("/add",[JobsController::class,'AddNewJob']);
                    Route::get("/get",[JobsController::class,'getAllJobs']);
                    Route::get("/get/{id}",[JobsController::class,'getJob']);
                    Route::delete("/delete/{id}",[JobsController::class,'deleteJob']);
        });

        // public api 

    Route::prefix('/public')->group(function(){

        Route::get('/get-all-jobs',[PublicController::class,'getAllJobs']);
        Route::get('/get-jobs/{slug}',[PublicController::class,'getJobById']);
        Route::get('/company-profile/{id}',[PublicController::class,'getCompanyProfileById']);


        Route::post('/apply-job',[ApplicationController::class,'addApplication'])->middleware('auth:sanctum');

    });


    
});
