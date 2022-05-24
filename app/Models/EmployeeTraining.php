<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeTraining extends Model
{
    use HasFactory;
    protected $table="hris_employee_training";
    protected $guarded = [];
    public $timestamps = false;
}
