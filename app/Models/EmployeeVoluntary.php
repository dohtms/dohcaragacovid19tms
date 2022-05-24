<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeVoluntary extends Model
{
    use HasFactory;
    protected $table="hris_employee_voluntary";
    protected $guarded = [];
    public $timestamps = false;
}
