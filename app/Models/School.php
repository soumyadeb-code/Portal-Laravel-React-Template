<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class School extends Model
{
    protected $fillable = [
        'name',
        'trust_name',
        'email',
        'phone',
        'address',
        'code',
        'logo',
    ];

    public function admin(): HasOne
    {
        return $this->hasOne(User::class)->where('role', 'school_admin');
    }
}
