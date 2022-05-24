<?php

namespace App\Http\Controllers\API\PDS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Others extends Controller
{
    //
    public function getEmployeeOthers(Request $request)
    {
        /*
        api for PDS/Trainings
        accepts employee id
        returns employee Trainings
        */
        try{
            $ss = DB::table('hris_employee_others')->where('employee_id',$request->id)->where('typeid',1)->get();
            $recognition = DB::table('hris_employee_others')->where('employee_id',$request->id)->where('typeid',2)->get();
            $organization = DB::table('hris_employee_others')->where('employee_id',$request->id)->where('typeid',3)->get();
            return response()->json([
                'ss' => $ss,
                'recognition' => $recognition,
                'organization' => $organization
            ]);
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }

    public function getEmployeeOthersChecklist(Request $request)
    {
        /*
        api for PDS/Trainings
        accepts employee id
        returns employee Trainings
        */
        try{
            $checklist = DB::table('hris_employee')
            ->join('hris_employee_item_34_39','hris_employee.id','hris_employee_item_34_39.employee_id')
            ->select('hris_employee_item_34_39.*')
            ->where('hris_employee.id',$request->id)
            ->get();

            return response()->json($checklist);
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }
}
