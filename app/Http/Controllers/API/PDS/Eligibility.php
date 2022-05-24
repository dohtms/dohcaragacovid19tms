<?php

namespace App\Http\Controllers\API\PDS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Eligibility extends Controller
{
    //
    public function getEmployeeEligibility(Request $request)
    {
        /*
        api for PDS/Eligibility
        accepts employee id
        returns employee eligibility
        */
        try{
            $eligibility = DB::table('hris_employee')
            ->join('hris_employee_eligibility', 'hris_employee.id', '=', 'hris_employee_eligibility.employee_id')
            ->select('hris_employee_eligibility.*')
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
