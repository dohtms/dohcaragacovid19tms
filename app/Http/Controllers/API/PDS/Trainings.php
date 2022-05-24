<?php

namespace App\Http\Controllers\API\PDS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Trainings extends Controller
{
    //
    public function getEmployeeTrainings(Request $request)
    {
        /*
        api for PDS/Trainings
        accepts employee id
        returns employee Trainings
        */
        try{
            $trainings = DB::table('hris_employee')
            ->join('hris_employee_training', 'hris_employee.id', '=', 'hris_employee_training.employee_id')
            ->select('hris_employee_training.*')
            ->where('hris_employee.id',$request->id)
            ->get();
            return response()->json($trainings);
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }
}
