<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class application extends Model
{
    use HasFactory;
    protected $fillable=[
        'name',
        'email',
        'bio',
        'resume',
        'job_id',
        'user_id',

    ];
}
