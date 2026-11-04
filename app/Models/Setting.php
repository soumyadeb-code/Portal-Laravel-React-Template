<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business_name',
        'portal_name',
        'currency',
        'timezone',
        'plan_name',
        'plan_price',
        'plan_renews',
        'webhook_url',
        'webhook_secret',
        'email_notifications',
        'security_alerts',
        'promotional_emails',
    ];

    protected $casts = [
        'email_notifications' => 'boolean',
        'security_alerts' => 'boolean',
        'promotional_emails' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

