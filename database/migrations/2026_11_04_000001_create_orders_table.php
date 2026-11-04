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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number');
            $table->string('product');
            $table->string('customer_name');
            $table->string('customer_email')->nullable();
            $table->string('customer_avatar')->nullable();
            $table->string('order_date');
            $table->enum('status', ['Paid', 'Pending', 'Cancelled'])->default('Paid');
            $table->decimal('total', 10, 2)->default(0.00);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

