<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeEligibility extends Model
{
    use HasFactory;
    protected $table="hris_employee_eligibility";
    protected $guarded = [];
    public $timestamps = false;
}
