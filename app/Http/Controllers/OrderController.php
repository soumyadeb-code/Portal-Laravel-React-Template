<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Order::query();

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', ucfirst($request->status));
        }

        if ($request->filled('search')) {
            $term = $request->search;
            $query->where(function ($q) use ($term) {
                $q->where('order_number', 'like', "%{$term}%")
                  ->orWhere('product', 'like', "%{$term}%")
                  ->orWhere('customer_name', 'like', "%{$term}%");
            });
        }

        $orders = $query->orderBy('id', 'desc')->paginate(10);

        return response()->json($orders);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_number' => ['required', 'string'],
            'product' => ['required', 'string'],
            'customer_name' => ['required', 'string'],
            'customer_email' => ['nullable', 'email'],
            'order_date' => ['required', 'string'],
            'status' => ['required', 'in:Paid,Pending,Cancelled'],
            'total' => ['required', 'numeric'],
        ]);

        $order = Order::create($validated);

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ], 201);
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json($order);
    }

    public function destroy(Order $order): JsonResponse
    {
        $order->delete();

        return response()->json([
            'message' => 'Order deleted successfully',
        ]);
    }
}

