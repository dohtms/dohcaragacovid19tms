<?php

namespace App\Http\Controllers\API\PDS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WorkExp extends Controller
{
    //
    public function getEmployeeWorkExp(Request $request)
    {
        /*
        api for PDS/WorkExperience
        accepts employee id
        returns employee WorkExperience
        */
        try{
            $eligibility = DB::table('hris_employee')
            ->join('hris_employee_employment', 'hris_employee.id', '=', 'hris_employee_employment.employee_id')
            ->select('hris_employee_employment.*')
            ->where('hris_employee.id',$request->id)
            ->get();
            return response()->json($eligibility);
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }
}
