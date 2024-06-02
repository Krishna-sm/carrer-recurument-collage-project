<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiError;
use App\Models\Jobs;
use App\Models\User;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    //
    public function getAllJobs(){
        // $job = Jobs::all()
        // ->select("title","slug","image","user");
      
      
        // $jobs = Jobs::select('title', 'slug', 'image', 'user')
        // ->with('user:id',"name")
        
        // ->jobs

        // $jobs=Jobs::find(1)->get('user');
                    $jobs= Jobs::with(["user:id,name"])->get(["title","slug","user","image"])
                    // -> select('title', 'slug', 'image')
                    // ->user
                    ;
                  
        ;
        return [
            'job'=>$jobs
        ];
    }


    public function getJobById($slug){
        // $job = Jobs::find($id)->with("user")->get();
        // $job = Jobs::with(['user:id,name'])
        // ->select("user", "skills", "title", "short_desc", "desc", "extend_date", "created_at")->find($id)
        // ;
        $job = Jobs::with(['user:id,name'])
        ->where('slug', $slug)
        ->select("id", "user", "skills", "title", "short_desc", "desc", "extend_date", "created_at")
        ->first();

    if (!$job) {
        // return ['error' => 'Job not found'];
        throw new ApiError(400,"Job Not Found");
    }

    return ['job' => $job];
    }

    public function getCompanyProfileById($id){
        $user = User::where("id",$id)
        ->select("id","name","type","email")
        ->get()
        ->first()
        ;

        if(!$user){
            throw new ApiError(400,"User Not Found");
        }
        
            if($user->type!="company"){
            unset($user->type);
                
                 return [
                    'user'=>$user,
                    "comapny"=>null
                ];
            }
            unset($user->type);

        $jobs = Jobs::where("user",$id)
        // ->select("title","slug","image")
        ->with(["user:id,name"])
        ->get(["title","slug","image","user"]);
        $user['total_jobs']=$jobs->count();

        return [
            'user'=>$user,
            'jobs'=>$jobs
        ];
    }




    
}
