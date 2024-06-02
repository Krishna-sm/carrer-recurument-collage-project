<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiError;
use App\Models\application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    //

    public function addApplication(Request $request){

        $user = $request->user();
        if($user['type'] != 'user'){
            throw new ApiError(404, "You are Not a Valid User");
        }
        $data = $request->validate([
            'name'=>'required|max:255',
            'email'=>'required|max:255',
            'bio'=>'required|max:400',
            'resume'=>'required|mimes:jpeg,jpg,png,pdf|max:4096',
            'job_id'=>'required',
        ]);

            $data['user_id']=$user['id'];

            if($request->hasFile('resume')){
                $file_name = $data['name']."-".time().".".$request->file('resume')->getClientOriginalExtension();
                $path = $request->file('resume')->storeAs('/resume/', $file_name,'public');
                $data['resume'] = $path;
            }


            application::create($data);


            return response()->json([
                'msg' => 'Job Applied Successfully'
            ], 200);

    }
}
