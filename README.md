# Portal - Laravel 12 & React 19 Admin Dashboard

This project is a complete conversion of the **Portal Bootstrap 5 Admin Dashboard Template** into a modern, full-stack **Laravel 12** and **React 19** application with MySQL database configuration (`sd_portal`).

---

## 🚀 Tech Stack & Features

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 + React Router DOM 7
- **Collapsible Sidebar**: Full-size desktop experience toggle via header hamburger & sidebar angle button (with localStorage state persistence and auto-reflow for Chart.js)
- **Styling**: Bootstrap 5 + Portal Theme CSS & FontAwesome
- **Charts**: Chart.js (Line, Bar, Pie, Doughnut)
- **Build Tool**: Vite 7 + `@vitejs/plugin-react` + `laravel-vite-plugin`
- **Database**: MySQL (`sd_portal`)

---

## 🗄️ Database Setup (`sd_portal`)

The `.env` file is pre-configured for MySQL with database name `sd_portal`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sd_portal
DB_USERNAME=root
DB_PASSWORD=
```

### Option 1: Run Laravel Migrations & Seeders (Recommended)
Make sure MySQL is running in your local environment (e.g. via XAMPP, WAMP, or MySQL Service):
```bash
# 1. Create the database in MySQL:
# CREATE DATABASE sd_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 2. Run migrations and seed sample data:
php artisan migrate --seed
```

### Option 2: Direct SQL Import
A complete SQL script with schema and sample records is provided at:
`database/sd_portal.sql`

You can import it directly via MySQL CLI or phpMyAdmin:
```bash
mysql -u root -p < database/sd_portal.sql
```

---

## ⚡ Running the Project

### 1. Start Laravel Backend
```bash
php artisan serve
```
The application will be accessible at: `http://127.0.0.1:8000`

### 2. Start Vite Development Server (Optional for Hot Reload)
```bash
npm run dev
```

### 3. Build Production Assets
Production bundle is already compiled in `public/build/`. To rebuild at any time:
```bash
npm run build
```

---

## 🔑 Default Credentials

- **Email**: `admin@portal.test`
- **Password**: `password123`

*(You can also register a new account on the `/signup` page)*

---

## 📂 Pages & Routes Overview

| Route | Page Name | Description |
|---|---|---|
| `/` | **Overview / Dashboard** | Stat cards ($12.6k sales, expenses, projects, invoices), Chart.js Line & Bar charts, Project progress, referral sources, and quick actions |
| `/orders` | **Orders** | Filter orders by tabs (All, Paid, Pending, Cancelled), search input, CSV export, create order modal, and view modal |
| `/charts` | **Charts & Analytics** | Area Line Chart, Bar Chart, Pie Chart, and Doughnut Chart |
| `/docs` | **My Docs** | Document manager with type filters (Text, Image, Spreadsheet, Zip), upload file modal, and search |
| `/help` | **Help Center** | Searchable knowledge base, FAQ accordion categories (Product, Billing), and support contacts |
| `/notifications` | **Notifications** | Notification feed with unread indicators, category badges, mark all as read, and delete |
| `/account` | **My Account** | User profile card with inline editor, security & password change, 2FA toggle, preferences, and payment methods |
| `/settings` | **Settings** | General settings, plan & billing info, notification toggles, and webhook configuration |
| `/login` | **Login** | Authentication form with remember me and forgot password links |
| `/signup` | **Signup** | Registration form with terms agreement |
| `/reset-password` | **Reset Password** | Password reset request form |
| `/404` | **404 Page** | Page not found error state |

