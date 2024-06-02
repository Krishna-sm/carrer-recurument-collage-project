<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','short_desc','desc','extend_date','image','user','slug','skills'
    ];

    
        public function user(){
           return $this->belongsTo(User::class,"user");
        }
  
}
