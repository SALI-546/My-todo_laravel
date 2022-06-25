<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodosStatus extends Model
{
    use HasFactory;
    protected $table = 'todos_status';

    protected $fillable = [
        'status_name',
        'status_description',
    ];

}
