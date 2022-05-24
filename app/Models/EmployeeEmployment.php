<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeEmployment extends Model
{
    use HasFactory;
    protected $table="hris_employee_employment";
    protected $guarded = [];
    public $timestamps = false;
}
