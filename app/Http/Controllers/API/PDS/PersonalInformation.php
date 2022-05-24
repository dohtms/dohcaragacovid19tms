<?php

namespace App\Http\Controllers\API\PDS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \stdClass;

class PersonalInformation extends Controller
{
    //
    public function getEmployeePersonal(Request $request) 
    {
        /*
        api for PDS/Personal Background
        accepts employee_id
        returns employee info (hris_employee) table and address (hris_employee_address)
        */
        try{
            $personalInfo = DB::table('hris_employee')
            ->join('hris_employee_address', 'hris_employee.id', '=', 'hris_employee_address.employee_id')
            ->select('hris_employee_address.*','hris_employee_address.id as address_id','hris_employee.*')
            ->where('hris_employee.id',$request->id)
            ->first();
            return response()->json($personalInfo);
        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
    }

    public function employeePersonalUpdate(Request $request)
    {
        // update employee personal information
        // takes request of id, and personal information
        // returns true if updated, returns false in not
        $personalInfo = $request->personalInfo;
        try{
            $check_if_exist = DB::table('hris_update_employee')->where('employee_id',$request->id)->where('status',0)->first();
            if($check_if_exist != null)
            {
                DB::beginTransaction();
                try 
                {
                    DB::table('hris_update_employee')
                    ->where([['employee_id',$request->id],['status',0]])
                    // ->where()
                    ->update([
                        'employee_id' => $request->id,
                        'fname' => !empty($personalInfo['fname']) ? $personalInfo['fname'] : null,
                        'lname' => !empty($personalInfo['lname']) ? $personalInfo['lname'] : null,
                        'mname' => !empty($personalInfo['mname']) ? $personalInfo['mname'] : null,
                        'extname' => !empty($personalInfo['extname']) ? $personalInfo['extname'] : null,
                        'dob' => !empty($personalInfo['dob']) ? $personalInfo['dob'] : null,
                        'baddress' => !empty($personalInfo['baddress']) ? $personalInfo['baddress'] : null,
                        'sex' => !empty($personalInfo['sex']) ? $personalInfo['sex'] : null,
                        'civilstatus' => !empty($personalInfo['civilstatus']) ? $personalInfo['civilstatus'] : null,
                        'citizenship' => !empty($personalInfo['citizenship']) ? $personalInfo['citizenship'] : null,
                        'height' => !empty($personalInfo['height']) ? $personalInfo['height'] : null,
                        'weight' => !empty($personalInfo['weight']) ? $personalInfo['weight'] : null,
                        'bloodtype' => !empty($personalInfo['bloodtype']) ? $personalInfo['bloodtype'] : null,
                        'cpno' => !empty($personalInfo['cpno']) ? $personalInfo['cpno'] : null,
                        'telno' => !empty($personalInfo['telno']) ? $personalInfo['telno'] : null,
                        'emailadd' => !empty($personalInfo['emailadd']) ? $personalInfo['emailadd'] : null,
                        'gsisno' => !empty($personalInfo['gsisno']) ? $personalInfo['gsisno'] : null,
                        'gsisbp' => !empty($personalInfo['gsisbp']) ? $personalInfo['gsisbp'] : null,
                        'pag_ibig' => !empty($personalInfo['pag_ibig']) ? $personalInfo['pag_ibig'] : null,
                        'philhealth' => !empty($personalInfo['philhealth']) ? $personalInfo['philhealth'] : null,
                        'sssno' => !empty($personalInfo['sssno']) ? $personalInfo['sssno'] : null,
                        'tin' => !empty($personalInfo['tin']) ? $personalInfo['tin'] : null,
                    ]);
                    DB::table('hris_update_employee_address')
                    ->where('employee_id',$request->id)
                    ->where('status',0)
                    ->update([
                        'radUnit' => !empty($personalInfo['radUnit']) ? $personalInfo['radUnit'] : null,
                        'radStreet' => !empty($personalInfo['radStreet']) ? $personalInfo['radStreet'] : null,
                        'radVillage' => !empty($personalInfo['radVillage']) ? $personalInfo['radVillage'] : null,
                        'radBrgy' => !empty($personalInfo['radBrgy']) ? $personalInfo['radBrgy'] : null,
                        'radCity' => !empty($personalInfo['radCity']) ? $personalInfo['radCity'] : null,
                        'radProvince' => !empty($personalInfo['radProvince']) ? $personalInfo['radProvince'] : null,
                        'radZip' => !empty($personalInfo['radZip']) ? $personalInfo['radZip'] : null,
                        'padUnit' => !empty($personalInfo['padUnit']) ? $personalInfo['padUnit'] : null,
                        'padStreet' => !empty($personalInfo['padStreet']) ? $personalInfo['padStreet'] : null,
                        'padVillage' => !empty($personalInfo['padVillage']) ? $personalInfo['padVillage'] : null,
                        'padBrgy' => !empty($personalInfo['padBrgy']) ? $personalInfo['padBrgy'] : null,
                        'padCity' => !empty($personalInfo['padCity']) ? $personalInfo['padCity'] : null,
                        'padProvince' => !empty($personalInfo['padProvince']) ? $personalInfo['padProvince'] : null,
                        'padZip' => !empty($personalInfo['padZip']) ? $personalInfo['padZip'] : null,
                    ]);
                    DB::commit();
                    return response()->json([
                        'status' => 200
                    ]);
                }
                catch(\Exception $e)
                {
                    DB::rollback();
                    return response()->json([
                        'status' => 500,
                        'message' => $e->getMessage()
                    ]);
                }
            }
            else {
                DB::beginTransaction();
                try 
                {
                    DB::table('hris_update_employee')->insert([
                        'employee_id' => $request->id,
                        'status' => 0,
                        'fname' => !empty($personalInfo['fname']) ? $personalInfo['fname'] : null,
                        'lname' => !empty($personalInfo['lname']) ? $personalInfo['lname'] : null,
                        'mname' => !empty($personalInfo['mname']) ? $personalInfo['mname'] : null,
                        'extname' => !empty($personalInfo['extname']) ? $personalInfo['extname'] : null,
                        'baddress' => !empty($personalInfo['baddress']) ? $personalInfo['baddress'] : null,
                        'dob' => !empty($personalInfo['dob']) ? $personalInfo['dob'] : null,
                        'sex' => !empty($personalInfo['sex']) ? $personalInfo['sex'] : null,
                        'civilstatus' => !empty($personalInfo['civilstatus']) ? $personalInfo['civilstatus'] : null,
                        'citizenship' => !empty($personalInfo['citizenship']) ? $personalInfo['citizenship'] : null,
                        'height' => !empty($personalInfo['height']) ? $personalInfo['height'] : null,
                        'weight' => !empty($personalInfo['weight']) ? $personalInfo['weight'] : null,
                        'bloodtype' => !empty($personalInfo['bloodtype']) ? $personalInfo['bloodtype'] : null,
                        'cpno' => !empty($personalInfo['cpno']) ? $personalInfo['cpno'] : null,
                        'telno' => !empty($personalInfo['telno']) ? $personalInfo['telno'] : null,
                        'emailadd' => !empty($personalInfo['emailadd']) ? $personalInfo['emailadd'] : null,
                        'gsisno' => !empty($personalInfo['gsisno']) ? $personalInfo['gsisno'] : null,
                        'gsisbp' => !empty($personalInfo['gsisbp']) ? $personalInfo['gsisbp'] : null,
                        'pag_ibig' => !empty($personalInfo['pag_ibig']) ? $personalInfo['pag_ibig'] : null,
                        'philhealth' => !empty($personalInfo['philhealth']) ? $personalInfo['philhealth'] : null,
                        'sssno' => !empty($personalInfo['sssno']) ? $personalInfo['sssno'] : null,
                        'tin' => !empty($personalInfo['tin']) ? $personalInfo['tin'] : null,
                    ]);
                    DB::table('hris_update_employee_address')->insert([
                        'employee_id' => $request->id,
                        'status' => 0,
                        'radUnit' => !empty($personalInfo['radUnit']) ? $personalInfo['radUnit'] : null,
                        'radStreet' => !empty($personalInfo['radStreet']) ? $personalInfo['radStreet'] : null,
                        'radVillage' => !empty($personalInfo['radVillage']) ? $personalInfo['radVillage'] : null,
                        'radBrgy' => !empty($personalInfo['radBrgy']) ? $personalInfo['radBrgy'] : null,
                        'radCity' => !empty($personalInfo['radCity']) ? $personalInfo['radCity'] : null,
                        'radProvince' => !empty($personalInfo['radProvince']) ? $personalInfo['radProvince'] : null,
                        'radZip' => !empty($personalInfo['radZip']) ? $personalInfo['radZip'] : null,
                        'padUnit' => !empty($personalInfo['padUnit']) ? $personalInfo['padUnit'] : null,
                        'padStreet' => !empty($personalInfo['padStreet']) ? $personalInfo['padStreet'] : null,
                        'padVillage' => !empty($personalInfo['padVillage']) ? $personalInfo['padVillage'] : null,
                        'padBrgy' => !empty($personalInfo['padBrgy']) ? $personalInfo['padBrgy'] : null,
                        'padCity' => !empty($personalInfo['padCity']) ? $personalInfo['padCity'] : null,
                        'padProvince' => !empty($personalInfo['padProvince']) ? $personalInfo['padProvince'] : null,
                        'padZip' => !empty($personalInfo['padZip']) ? $personalInfo['padZip'] : null,
                    ]);
                    DB::commit();
                    return response()->json([
                        'status' => 200
                    ]);
                }
                catch(\Exception $e)
                {
                    DB::rollback();
                    return reponse()->json([
                        'status' => 500,
                        'message' => $e->getMessage()
                    ]);
                }
              
            }
        }
        catch(\Exception $e)
        {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function employeePersonalUpdater(Request $request)
    {
        $employee_id = $request->id;
        $personal_information = $request->personalInfo;
        foreach($personal_information as $personal)
        {
            DB::table('hris_info_update')->insert([
                'employee_id' => $request->id,
                'table_name' => 'hris_employee',
                'table_field' => $personal['table_field'],
                'row_index' => 0,
                'old_value' => 'sample',
                'new_value' => $personal['value'],
                'status' => 0
            ]);
        }
    }

    public function employeePersonalwithUpdate(Request $request)
    {
        $employee_id = $request->id;
        $with_update =  DB::table('hris_info_update')->where('employee_id',$request->id)->get();
        $object = array();
        $temp_obj = new stdClass();
        foreach ($with_update as $update)
        {
            $temp_obj->{$update->table_field} = [
                "id" =>  $update->id,
                "employee_id" => $update->employee_id,
                "table_name" => $update->table_name,
                "table_field" => $update->table_field,
                "row_index" => $update->row_index,
                "old_value" => $update->old_value,
                "new_value" => $update->new_value,
                "status" => $update->status
            ];
        }
        return $temp_obj;
    }
}
