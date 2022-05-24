<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeReference extends Model
{
    use HasFactory;
    protected $table="hris_employee_reference";
    protected $guarded = [];
    public $timestamps = false;
}
