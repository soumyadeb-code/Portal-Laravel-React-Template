import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import AppLayout from './components/AppLayout';
import AuthLayout from './components/AuthLayout';

import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Charts from './pages/Charts';
import Docs from './pages/Docs';
import Help from './pages/Help';
import Notifications from './pages/Notifications';
import Account from './pages/Account';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Main App Layout */}
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/charts" element={<Charts />} />
                        <Route path="/docs" element={<Docs />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>

                    {/* Auth Pages */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Route>

                    {/* 404 Pages */}
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
}

