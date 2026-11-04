<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        $setting = Setting::firstOrCreate(
            ['id' => 1],
            [
                'business_name' => 'Portal Inc.',
                'portal_name' => 'Portal BS5 Admin',
                'currency' => 'USD ($)',
                'timezone' => 'America/New_York (UTC-5)',
                'plan_name' => 'Pro Plan',
                'plan_price' => '$29 / month',
                'plan_renews' => '2026-12-01',
                'webhook_url' => 'https://yourwebsite.com/api/webhook',
                'webhook_secret' => 'whsec_9a8b7c6d5e4f3a2b1c',
                'email_notifications' => true,
                'security_alerts' => true,
                'promotional_emails' => false,
            ]
        );

        return response()->json($setting);
    }

    public function update(Request $request): JsonResponse
    {
        $setting = Setting::firstOrCreate(['id' => 1]);

        $validated = $request->validate([
            'business_name' => ['sometimes', 'string', 'max:255'],
            'portal_name' => ['sometimes', 'string', 'max:255'],
            'currency' => ['sometimes', 'string', 'max:50'],
            'timezone' => ['sometimes', 'string', 'max:100'],
            'plan_name' => ['sometimes', 'string', 'max:100'],
            'plan_price' => ['sometimes', 'string', 'max:100'],
            'webhook_url' => ['nullable', 'url', 'max:255'],
            'webhook_secret' => ['nullable', 'string', 'max:255'],
            'email_notifications' => ['nullable', 'boolean'],
            'security_alerts' => ['nullable', 'boolean'],
            'promotional_emails' => ['nullable', 'boolean'],
        ]);

        $setting->update($validated);

        return response()->json([
            'message' => 'Settings saved successfully',
            'setting' => $setting->fresh(),
        ]);
    }
}

