<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PdsController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PDS\PersonalInformation;
use App\Http\Controllers\API\PDS\FamilyBackground;
use App\Http\Controllers\API\PDS\Education;
use App\Http\Controllers\API\PDS\Eligibility;
use App\Http\Controllers\API\PDS\WorkExp;
use App\Http\Controllers\API\PDS\VoluntaryWork;
use App\Http\Controllers\API\PDS\Trainings;
use App\Http\Controllers\API\PDS\Others;
use App\Http\Controllers\API\PROFILE\MyProfileController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('profile/employees',[MyProfileController::class,'employees']);
Route::post('profile/employee',[MyProfileController::class,'employee']);
Route::get('profile/fetchEmployees',[MyProfileController::class,'fetchEmployees']);
Route::post('profile/employeeUpdate',[MyProfileController::class,'employeeUpdate']);

// private route
Route::middleware(['auth:sanctum'])->group(function(){

});
// for pds/Personal routes
Route::post('pds/getEmployeePersonal',[PersonalInformation::class,'getEmployeePersonal']);
Route::post('pds/employeePersonalUpdate',[PdsController::class,'employeePersonalUpdate']);
Route::post('pds/employeePersonalUpdater',[PersonalInformation::class,'employeePersonalUpdater']);
Route::post('pds/employeePersonalwithUpdate',[PersonalInformation::class,'employeePersonalwithUpdate']);
// for pds/Familybackground routes
Route::post('pds/getEmployeeFamily',[FamilyBackground::class,'getEmployeeFamily']);
// for pds/Educational background
Route::post('pds/getEmployeeEducation',[Education::class,'getEmployeeEducation']);
// for pds/Eligibility
Route::post('pds/getEmployeeEligibility',[Eligibility::class,'getEmployeeEligibility']);
// for pds/Work Experience
Route::post('pds/getEmployeeWorkExp',[WorkExp::class,'getEmployeeWorkExp']);
//  for pds/Voluntary work
Route::post('pds/getEmployeeVoluntary',[VoluntaryWork::class,'getEmployeeVoluntary']);
//  for pds/Trainings
Route::post('pds/getEmployeeTrainings',[Trainings::class,'getEmployeeTrainings']);
//  for pds/Others
Route::post('pds/getEmployeeOthers',[Others::class,'getEmployeeOthers']);
//  for pds/Others
Route::post('pds/getEmployeeOthersChecklist',[Others::class,'getEmployeeOthersChecklist']);

// Auth Controller
Route::get('createAccounts',[AuthController::class,'createAccounts']);
// 
Route::post('hrisLogin',[AuthController::class,'hrisLogin']);
