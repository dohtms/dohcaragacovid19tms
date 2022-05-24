<?php

namespace App\Http\Controllers\API\PROFILE;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MyProfileController extends Controller
{
    //
        //

    // test functions, below lines of code was used in PDS/My Profile
    public function employees()
    {
        return DB::table('hris_employee')->take(4)->orderBy('id')->get();
    }
    public function employee(Request $rq)
    {
        $employee = DB::table('hris_employee')
            ->join('hris_employee_address', 'hris_employee.id', '=', 'hris_employee_address.employee_id')
            ->select('hris_employee.*', 'hris_employee_address.*')
            ->where('hris_employee.id',$rq->id)
            ->first();
    return $employee;
    }


    public function employeeUpdate(Request $rq) 
    {
        $employee = Employee::find($rq->id)->first();

        try
        {
            $employee->fname = $rq->fname;
            $employee->mname = $rq->mname;
            $employee->save();
            return $employee;
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }
}
