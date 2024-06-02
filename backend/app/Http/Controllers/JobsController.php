<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiError;
use App\Models\Jobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class JobsController extends Controller
{
    //

    public function AddNewJob(Request $req){

        $user = $req->user();
        if($user['type'] != 'company'){
            throw new ApiError(404, "You are Not a Valid User");
        }
    
        $data = $req->validate([
            'title' => 'required|max:150',
            'short_desc' => 'required|max:5000',
            'skills' => 'required|max:350',
            'desc' => 'required|max:5000',
            'extend_date' => 'required|date',
            'image' => 'required|mimes:jpeg,jpg,png,gif|max:2048', //1024*2=2mb
        ]);
    

        $exist_obj = Jobs::where('title',$data['title'])
        ->where('user',  $user['id'])
        ->first();
        if($exist_obj){
                throw new ApiError(400,"Title Already Exist");
        }



        $data['user'] = $user['id'];
        $data['slug'] = implode("-", explode(" ", strtolower($data['title']))).time();
    
        try {
            if($req->hasFile('image')){
                $file_name = $data['slug']."-".time().".".$req->file('image')->getClientOriginalExtension();
                $path = $req->file('image')->storeAs('', $file_name,'public');
                $data['image'] = $path;
            }
         Jobs::create($data);
    
            return response()->json([
                'msg' => 'Job Created'
            ], 200);
        } catch (\Exception $e) {
            // Delete the image if an exception occurs
            if(isset($data['image'])){
                // Storage::delete($data['image']);
            File::delete(public_path('/storage/'.$data['image']));

            }
    
            // Throw the exception again to propagate it
            throw $e;
        }
    }


    public function getAllJobs(Request $req){
        $limit = 10;
        // $current_page = $req->query("page") || 1;

        $user = $req->user();

        $all_jobs = Jobs::where("user",$user['id'])
        ->select("title","slug","image","short_desc","extend_date","id")
        ->paginate($limit);

        // $all_jobs->items();
        $has_more = $all_jobs->currentPage() < $all_jobs->lastPage();
        return response()->json(['jobs'=>$all_jobs->items(),'total'=>$all_jobs->total(),'has_more'=>$has_more],200);

    }
    public function getJob(Request $req,$id){

        $user = $req->user();

        $job = Jobs::where('user', $user['id'])
        ->where('id', $id)
        ->first();

        return response()->json(['job'=>$job],200);

    }

    public function deleteJob(Request $req,$id){

        $user = $req->user();

        $job = Jobs::where('user', $user['id'])
        ->where('id', $id)
        ->first();

        if(!$job){
                    throw new ApiError(400,"Job Not Found");
                   
        }

       

        if (File::exists(public_path('/storage/'.$job->image))) {
            // Storage::delete
            // Storage::delete($job->image);
            File::delete(public_path('/storage/'.$job->image));
        // return response()->json(['msg'=>'Job deleted'],200);

        }

        $job->delete();

        return response()->json(['msg'=>'Job deleted'],200);

    }

    
}
