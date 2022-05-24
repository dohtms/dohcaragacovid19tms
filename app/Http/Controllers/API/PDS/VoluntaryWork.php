<?php

namespace App\Http\Controllers\API\PDS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VoluntaryWork extends Controller
{
    //
    public function getEmployeeVoluntary(Request $request)
    {
        /*
        api for PDS/WorkExperience
        accepts employee id
        returns employee WorkExperience
        */
        try{
            $voluntary = DB::table('hris_employee')
            ->join('hris_employee_voluntary', 'hris_employee.id', '=', 'hris_employee_voluntary.employee_id')
            ->select('hris_employee_voluntary.*')
            ->where('hris_employee.id',$request->id)
            ->get();
            return response()->json($voluntary);
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }
}
