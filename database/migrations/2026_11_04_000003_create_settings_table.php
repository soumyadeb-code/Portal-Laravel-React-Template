<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('business_name')->default('Portal Inc.');
            $table->string('portal_name')->default('Portal BS5 Admin');
            $table->string('currency')->default('USD ($)');
            $table->string('timezone')->default('America/New_York (UTC-5)');
            $table->string('plan_name')->default('Pro Plan');
            $table->string('plan_price')->default('$29 / month');
            $table->string('plan_renews')->default('2026-12-01');
            $table->string('webhook_url')->nullable()->default('https://yourwebsite.com/api/webhook');
            $table->string('webhook_secret')->nullable()->default('whsec_9a8b7c6d5e4f3a2b1c');
            $table->boolean('email_notifications')->default(true);
            $table->boolean('security_alerts')->default(true);
            $table->boolean('promotional_emails')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};

