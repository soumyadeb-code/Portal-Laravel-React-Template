<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Order;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $totalOrdersCount = Order::count();
        $totalSales = Order::where('status', 'Paid')->sum('total');
        $recentOrders = Order::latest()->take(6)->get();
        $recentNotifications = Notification::latest()->take(3)->get();

        return response()->json([
            'stats' => [
                'total_sales' => '$' . number_format($totalSales > 0 ? $totalSales : 12628.00, 2),
                'sales_change' => '+20%',
                'expenses' => '$2,250',
                'expenses_change' => '-5%',
                'projects' => '23',
                'projects_sub' => '3 open',
                'invoices' => '$6,782',
                'invoices_sub' => '6 unpaid',
            ],
            'chart_line' => [
                'labels' => ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                'current_week' => [2450, 4200, 6800, 5100, 7890, 8900, 12628],
                'previous_week' => [1800, 3100, 4900, 4200, 6100, 7200, 9850],
            ],
            'chart_bar' => [
                'labels' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                'orders' => [23, 45, 76, 75, 62, 37, 83],
            ],
            'recent_orders' => $recentOrders,
            'recent_notifications' => $recentNotifications,
        ]);
    }
}

