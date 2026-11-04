<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

// Auth Routes
Route::post('/api/login', [AuthController::class, 'login']);
Route::post('/api/signup', [AuthController::class, 'signup']);
Route::post('/api/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/api/logout', [AuthController::class, 'logout']);
Route::get('/api/me', [AuthController::class, 'me']);
Route::post('/api/profile', [AuthController::class, 'updateProfile']);
Route::post('/api/change-password', [AuthController::class, 'changePassword']);

// Dashboard API
Route::get('/api/dashboard', [DashboardController::class, 'index']);

// Orders API
Route::get('/api/orders', [OrderController::class, 'index']);
Route::post('/api/orders', [OrderController::class, 'store']);
Route::get('/api/orders/{order}', [OrderController::class, 'show']);
Route::delete('/api/orders/{order}', [OrderController::class, 'destroy']);

// Notifications API
Route::get('/api/notifications', [NotificationController::class, 'index']);
Route::post('/api/notifications/mark-read', [NotificationController::class, 'markAllRead']);
Route::delete('/api/notifications/{notification}', [NotificationController::class, 'destroy']);

// Settings API
Route::get('/api/settings', [SettingController::class, 'index']);
Route::post('/api/settings', [SettingController::class, 'update']);

// React SPA Route
Route::view('/{any?}', 'app')->where('any', '.*');
