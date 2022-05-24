<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Hash;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
    //
    public function hrisLogin(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'username' => 'required | min:4',
            'password' => 'required | min:6'
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_error' => $validator->messages()
            ]);
        }
        else 
        {
            $user = User::where('username',$request->username)->first();
            if( !$user || !Hash::check($request->password,$user->password))
            {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credentials'
                ]);
            }
            else{
                $token = $user->createToken($user->username.'_TOKEN')->plainTextToken; 
                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'name' => $user->name,
                    'roles' => $user->roles,
                    'employee_id' => $user->employee_id
                ]);
            }
        }
    }
    public function createAccounts()
    {
        $employee =  DB::table('hris_employee')->take(20)->get();
        $new_arr = [];
        $temp_arr = [];
        $newname;
        $default_password = Hash::make('123456');
        $username;
        DB::beginTransaction();
        try{
            foreach($employee as $emp)
            {
                $mname = $emp->mname == '' ? '' : $emp->mname[0];
                if($emp->extname)
                {
                    $extname = str_replace('.', '', $emp->extname);
                    $username = strtolower($emp->fname[0]).strtolower($mname).mb_strtolower($emp->lname).strtolower($extname);
                }
                else {
                    $username = strtolower($emp->fname[0]).strtolower($mname).mb_strtolower($emp->lname);
                }
                
                User::create([
                    'name' => $emp->fname . ' '.$emp->mname . ' ' . $emp->lname . ' ' . $emp->extname,
                    'username' => $username,
                    'password' => $default_password,
                    'employee_id' => $emp->id,
                    'roles' => 0
                ]);
            }
            DB::commit();
            return response()->json([
                'status' => 200,
                'message' => 'account created'
            ]);
        }
        catch(\Exception $e)
        {
            DB::rollback();
            return response()->json([
                'status' => 500,
                'error' => $e->getMessage()
            ]);
        }
    }
}
