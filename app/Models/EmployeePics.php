<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeePics extends Model
{
    use HasFactory;
    protected $table="hris_employee_pics";
    protected $guarded = [];
    public $timestamps = false;
}
