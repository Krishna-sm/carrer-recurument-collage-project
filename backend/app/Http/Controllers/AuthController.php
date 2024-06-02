<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiError;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; 

class AuthController extends Controller
{
    public function register(Request $req){



        $data = $req->validate([
            'name'=>'required',
            'email'=>'email|required',
            'password'=>'required',
            'type'=>['required','in:company,user']
        ],
    [
        'type'=>'Type must be one of Company or User'
    ]);
                // check user is exist or not 

                $user = User::where('email',$data['email'])->first();

                if($user){
                    throw new ApiError(400,"User Already Exist");
                    return;
                }



    $data['password']= Hash::make( $data['password']);
    $user = User::create($data);

    $token = $user->createToken('auth_token')->plainTextToken;



      return  response()->json([
        'msg'=>'Register Success',
            'token'=>  $token 
      ],200);

                // throw new ApiError(500,"something went wrong");
    }

    public function login(Request $req){



        $data = $req->validate([
            'email'=>'email|required',
            'password'=>'required'
        ]);
                // check user is exist or not 

                $user = User::where('email',$data['email'])->first();

                if(!$user){
                    throw new ApiError(400,"User Not Found");
                    return;
                }



    $isValid= Hash::check( $data['password'],$user->password);
    if(!$isValid){
        throw new ApiError(400,"Credentials Not Valid");
        return;
    }


    $token = $user->createToken('auth_token')->plainTextToken;



      return  response()->json([
        'msg'=>'Login Success',
            'token'=>  $token 
      ],200);

                // throw new ApiError(500,"something went wrong");
    }

    public function profile(Request $req){
        $user = $req->user();
        return response()->json(['user' => $user], 200);
    }
    public function logout(Request $req){
        $req->user()->currentAccessToken()->delete();
        return response()->json(['msg' =>'Logout Success'], 200);
    }

    
    //
}
