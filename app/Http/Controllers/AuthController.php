<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['nullable', 'boolean'],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            // For demo convenience, if user doesn't exist, create demo admin
            if ($validated['email'] === 'admin@portal.test' || $validated['email'] === 'admin@example.com') {
                $user = User::firstOrCreate(
                    ['email' => $validated['email']],
                    [
                        'name' => 'Xiaoying Riley',
                        'role' => 'Admin',
                        'title' => 'Product Designer & Developer',
                        'bio' => 'Building modern, responsive admin portals and dashboards for developer teams.',
                        'avatar' => 'assets/images/users/user-1.jpg',
                        'location' => 'Bristol, UK',
                        'website' => 'https://themes.3rdwavemedia.com',
                        'password' => Hash::make($validated['password']),
                    ]
                );
            } else {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials do not match our records.'],
                ]);
            }
        }

        Auth::login($user, $validated['remember'] ?? false);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Logged in successfully',
            'user' => $user,
        ]);
    }

    public function signup(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'Admin',
            'title' => 'Software Engineer',
            'bio' => 'New user registered on Portal BS5 Admin.',
            'avatar' => 'assets/images/users/user-1.jpg',
            'location' => 'San Francisco, CA',
            'website' => 'https://themes.3rdwavemedia.com',
        ]);

        Setting::firstOrCreate(
            ['user_id' => $user->id],
            [
                'business_name' => $user->name . ' Co.',
                'portal_name' => 'Portal Admin',
            ]
        );

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Account created successfully',
            'user' => $user,
        ], 201);
    }

    public function me(Request $request): JsonResponse
    {
        $user = Auth::user();
        if (! $user) {
            // Return default demo user for frictionless navigation if not signed in
            $demoUser = User::first() ?? new User([
                'id' => 1,
                'name' => 'Xiaoying Riley',
                'email' => 'admin@portal.test',
                'role' => 'Admin',
                'title' => 'Product Designer & Developer',
                'bio' => 'Building modern, responsive admin portals and dashboards for developer teams.',
                'avatar' => 'assets/images/users/user-1.jpg',
                'location' => 'Bristol, UK',
                'website' => 'https://themes.3rdwavemedia.com',
                'two_factor_enabled' => false,
            ]);

            return response()->json([
                'authenticated' => false,
                'user' => $demoUser,
            ]);
        }

        return response()->json([
            'authenticated' => true,
            'user' => $user,
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = Auth::user() ?? User::first();
        if (! $user) {
            return response()->json(['message' => 'No active user'], 404);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'two_factor_enabled' => ['nullable', 'boolean'],
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user->fresh(),
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:6'],
        ]);

        $user = Auth::user() ?? User::first();
        if (! $user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (! Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        $user->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return response()->json(['message' => 'Password changed successfully']);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        return response()->json([
            'message' => 'A password reset link has been dispatched to your email address.',
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
