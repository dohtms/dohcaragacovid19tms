<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeFamily extends Model
{
    use HasFactory;
    protected $table="hris_employee_family";
    protected $guarded = [];
    public $timestamps = false;
}
