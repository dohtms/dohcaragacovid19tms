<?php

namespace App\Http\Controllers\API\PDS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FamilyBackground extends Controller
{
    //
    public function getEmployeeFamily(Request $request) 
    {
        /*
        api for PDS/Family Background
        accepts employee_id
        returns spouse info,father_info,mother_info,children info
        */
        try{
            $family = DB::table('hris_employee_family')
                ->select('spouse_surname','spouse_fname','spouse_mname','spouse_extn','father_surname','father_fname',
                'father_mname','father_extn','mother_maiden','mother_lname','mother_fname','mother_mname')
                ->where('hris_employee_family.employee_id',$request->id)
                ->first();
                $children = DB::table('hris_employee_children')->where('employee_id',$request->id)->get();
                $family->children = $children;
                return response()->json($family);
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }

}
