<?php

namespace App\Http\Controllers\API\PDS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Education extends Controller
{
    //
    public function getEmployeeEducation(Request $request)
    {
        /*
        api for PDS/Education
        accepts employee id
        returns employee educational background 
        */
        try{
            $elementary = DB::table('hris_employee_education')
            ->where('employee_id',$request->id)
            ->where('elevel','like','%elementary%')
            ->get();
            $secondary = DB::table('hris_employee_education')
            ->where('employee_id',$request->id)
            ->where('elevel','like','%secondary%')
            ->get();
            $vocation = DB::table('hris_employee_education')
            ->where('employee_id',$request->id)
            ->where('elevel','like','%vocational/trade course%')
            ->get();
            $college = DB::table('hris_employee_education')
            ->where('employee_id',$request->id)
            ->where('elevel','like','%college%')
            ->get();
            
            return response()->json([
                'elementary' => $elementary,
                'secondary' => $secondary,
                'vocational' => $vocation,
                'college' => $college
            ]);
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }
}
