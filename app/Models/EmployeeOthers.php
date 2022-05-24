<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeOthers extends Model
{
    use HasFactory;
    protected $table="hris_employee_others";
    protected $guarded = [];
    public $timestamps = false;
}
