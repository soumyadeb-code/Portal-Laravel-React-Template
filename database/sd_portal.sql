-- MySQL dump for database sd_portal
-- Portal Bootstrap 5 Admin Dashboard - Laravel & React
-- Host: 127.0.0.1:3306

CREATE DATABASE IF NOT EXISTS `sd_portal` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sd_portal`;

-- Users table
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Admin',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Senior Developer',
  `bio` text COLLATE utf8mb4_unicode_ci,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'assets/images/users/user-1.jpg',
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'Bristol, UK',
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'https://themes.3rdwavemedia.com',
  `two_factor_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `title`, `bio`, `avatar`, `location`, `website`, `two_factor_enabled`) VALUES
(1, 'Xiaoying Riley', 'admin@portal.test', '$2y$12$N30tY6UvF5N2iGj2qR4oeePqN9pX6mSg1q.y8g1.eKz2E1lU0L1uy', 'Admin', 'Product Designer & Developer', 'Building modern, responsive admin portals and dashboards for developer teams.', 'assets/images/users/user-1.jpg', 'Bristol, UK', 'https://themes.3rdwavemedia.com', 0);

-- Orders table
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Paid','Pending','Cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Paid',
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `orders` (`id`, `order_number`, `product`, `customer_name`, `customer_email`, `customer_avatar`, `order_date`, `status`, `total`) VALUES
(1, '#15346', 'Donna R. Folse', 'Amy Wong', 'amy.wong@example.com', 'assets/images/users/user-1.jpg', '17 Oct 2026', 'Paid', 100.00),
(2, '#15345', 'Morbi semper augue', 'James Newbie', 'james.newbie@example.com', 'assets/images/users/user-2.jpg', '16 Oct 2026', 'Paid', 110.50),
(3, '#15344', 'Curabitur mattis', 'Raymond Mims', 'raymond.mims@example.com', 'assets/images/users/user-3.jpg', '16 Oct 2026', 'Pending', 259.35),
(4, '#15343', 'Fusce sed maximus justo', 'Pamela Lawson', 'pamela.lawson@example.com', 'assets/images/users/user-4.jpg', '15 Oct 2026', 'Paid', 199.00),
(5, '#15342', 'Lorem ipsum dolor sit amet', 'Dave Smith', 'dave.smith@example.com', 'assets/images/users/user-5.jpg', '15 Oct 2026', 'Cancelled', 42.00),
(6, '#15341', 'Aenean cursus imperdiet', 'Sarah Johnson', 'sarah.j@example.com', 'assets/images/users/user-6.jpg', '14 Oct 2026', 'Paid', 89.99),
(7, '#15340', 'Vestibulum hendrerit', 'Alex Morgan', 'alex.m@example.com', 'assets/images/users/user-1.jpg', '14 Oct 2026', 'Paid', 310.00),
(8, '#15339', 'Phasellus vitae nisi', 'Emma Watson', 'emma.w@example.com', 'assets/images/users/user-2.jpg', '13 Oct 2026', 'Pending', 145.20);

-- Notifications table
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'General',
  `time_ago` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Just now',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `action_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `category`, `time_ago`, `avatar`, `icon`, `is_read`, `action_url`) VALUES
(1, 1, 'Amy Wong', 'Amy shared a file with you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Project', '2 hrs ago', 'assets/images/profiles/profile-1.png', NULL, 0, '/notifications'),
(2, 1, 'Invoice Ready', 'You have a new invoice #INV-2026-089. Proin venenatis interdum est.', 'Billing', '1 day ago', NULL, 'bi bi-receipt', 0, '/orders'),
(3, 1, 'Sales Growth Alert', 'Your weekly sales have surpassed last month target by 18%. Great progress!', 'Analytics', '2 days ago', NULL, 'bi bi-bar-chart-line', 0, '/charts'),
(4, 1, 'System Maintenance', 'Routine server update is scheduled for Sunday at 02:00 UTC. Zero downtime anticipated.', 'System', '3 days ago', NULL, 'bi bi-gear', 1, '/settings'),
(5, 1, 'James Newbie', 'James posted a new question in the developer community documentation board.', 'Docs', '4 days ago', 'assets/images/profiles/profile-2.png', NULL, 1, '/docs');

-- Settings table
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `business_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Portal Inc.',
  `portal_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Portal BS5 Admin',
  `currency` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USD ($)',
  `timezone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'America/New_York (UTC-5)',
  `plan_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pro Plan',
  `plan_price` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '$29 / month',
  `plan_renews` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2026-12-01',
  `webhook_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'https://yourwebsite.com/api/webhook',
  `webhook_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'whsec_9a8b7c6d5e4f3a2b1c',
  `email_notifications` tinyint(1) NOT NULL DEFAULT '1',
  `security_alerts` tinyint(1) NOT NULL DEFAULT '1',
  `promotional_emails` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `settings` (`id`, `user_id`, `business_name`, `portal_name`, `currency`, `timezone`, `plan_name`, `plan_price`, `plan_renews`, `webhook_url`, `webhook_secret`, `email_notifications`, `security_alerts`, `promotional_emails`) VALUES
(1, 1, 'Portal Inc.', 'Portal BS5 Admin', 'USD ($)', 'America/New_York (UTC-5)', 'Pro Plan', '$29 / month', '2026-12-01', 'https://yourwebsite.com/api/webhook', 'whsec_9a8b7c6d5e4f3a2b1c', 1, 1, 0);

