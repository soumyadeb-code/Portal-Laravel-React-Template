<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@portal.test'],
            [
                'name' => 'Xiaoying Riley',
                'role' => 'Admin',
                'title' => 'Product Designer & Developer',
                'bio' => 'Building modern, responsive admin portals and dashboards for developer teams.',
                'avatar' => 'assets/images/users/user-1.jpg',
                'location' => 'Bristol, UK',
                'website' => 'https://themes.3rdwavemedia.com',
                'password' => Hash::make('password123'),
                'two_factor_enabled' => false,
            ]
        );

        Setting::firstOrCreate(
            ['id' => 1],
            [
                'user_id' => $admin->id,
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

        $orders = [
            [
                'order_number' => '#15346',
                'product' => 'Donna R. Folse',
                'customer_name' => 'Amy Wong',
                'customer_email' => 'amy.wong@example.com',
                'customer_avatar' => 'assets/images/users/user-1.jpg',
                'order_date' => '17 Oct 2026',
                'status' => 'Paid',
                'total' => 100.00,
            ],
            [
                'order_number' => '#15345',
                'product' => 'Morbi semper augue',
                'customer_name' => 'James Newbie',
                'customer_email' => 'james.newbie@example.com',
                'customer_avatar' => 'assets/images/users/user-2.jpg',
                'order_date' => '16 Oct 2026',
                'status' => 'Paid',
                'total' => 110.50,
            ],
            [
                'order_number' => '#15344',
                'product' => 'Curabitur mattis',
                'customer_name' => 'Raymond Mims',
                'customer_email' => 'raymond.mims@example.com',
                'customer_avatar' => 'assets/images/users/user-3.jpg',
                'order_date' => '16 Oct 2026',
                'status' => 'Pending',
                'total' => 259.35,
            ],
            [
                'order_number' => '#15343',
                'product' => 'Fusce sed maximus justo',
                'customer_name' => 'Pamela Lawson',
                'customer_email' => 'pamela.lawson@example.com',
                'customer_avatar' => 'assets/images/users/user-4.jpg',
                'order_date' => '15 Oct 2026',
                'status' => 'Paid',
                'total' => 199.00,
            ],
            [
                'order_number' => '#15342',
                'product' => 'Lorem ipsum dolor sit amet',
                'customer_name' => 'Dave Smith',
                'customer_email' => 'dave.smith@example.com',
                'customer_avatar' => 'assets/images/users/user-5.jpg',
                'order_date' => '15 Oct 2026',
                'status' => 'Cancelled',
                'total' => 42.00,
            ],
            [
                'order_number' => '#15341',
                'product' => 'Aenean cursus imperdiet',
                'customer_name' => 'Sarah Johnson',
                'customer_email' => 'sarah.j@example.com',
                'customer_avatar' => 'assets/images/users/user-6.jpg',
                'order_date' => '14 Oct 2026',
                'status' => 'Paid',
                'total' => 89.99,
            ],
            [
                'order_number' => '#15340',
                'product' => 'Vestibulum hendrerit',
                'customer_name' => 'Alex Morgan',
                'customer_email' => 'alex.m@example.com',
                'customer_avatar' => 'assets/images/users/user-1.jpg',
                'order_date' => '14 Oct 2026',
                'status' => 'Paid',
                'total' => 310.00,
            ],
            [
                'order_number' => '#15339',
                'product' => 'Phasellus vitae nisi',
                'customer_name' => 'Emma Watson',
                'customer_email' => 'emma.w@example.com',
                'customer_avatar' => 'assets/images/users/user-2.jpg',
                'order_date' => '13 Oct 2026',
                'status' => 'Pending',
                'total' => 145.20,
            ],
        ];

        foreach ($orders as $orderData) {
            Order::firstOrCreate(['order_number' => $orderData['order_number']], $orderData);
        }

        $notifications = [
            [
                'title' => 'Amy Wong',
                'message' => 'Amy shared a file with you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'category' => 'Project',
                'time_ago' => '2 hrs ago',
                'avatar' => 'assets/images/profiles/profile-1.png',
                'icon' => null,
                'is_read' => false,
                'action_url' => '/notifications',
            ],
            [
                'title' => 'Invoice Ready',
                'message' => 'You have a new invoice #INV-2026-089. Proin venenatis interdum est.',
                'category' => 'Billing',
                'time_ago' => '1 day ago',
                'avatar' => null,
                'icon' => 'bi bi-receipt',
                'is_read' => false,
                'action_url' => '/orders',
            ],
            [
                'title' => 'Sales Growth Alert',
                'message' => 'Your weekly sales have surpassed last month target by 18%. Great progress!',
                'category' => 'Analytics',
                'time_ago' => '2 days ago',
                'avatar' => null,
                'icon' => 'bi bi-bar-chart-line',
                'is_read' => false,
                'action_url' => '/charts',
            ],
            [
                'title' => 'System Maintenance',
                'message' => 'Routine server update is scheduled for Sunday at 02:00 UTC. Zero downtime anticipated.',
                'category' => 'System',
                'time_ago' => '3 days ago',
                'avatar' => null,
                'icon' => 'bi bi-gear',
                'is_read' => true,
                'action_url' => '/settings',
            ],
            [
                'title' => 'James Newbie',
                'message' => 'James posted a new question in the developer community documentation board.',
                'category' => 'Docs',
                'time_ago' => '4 days ago',
                'avatar' => 'assets/images/profiles/profile-2.png',
                'icon' => null,
                'is_read' => true,
                'action_url' => '/docs',
            ],
        ];

        foreach ($notifications as $notificationData) {
            Notification::firstOrCreate(
                ['title' => $notificationData['title'], 'time_ago' => $notificationData['time_ago']],
                $notificationData
            );
        }
    }
}

