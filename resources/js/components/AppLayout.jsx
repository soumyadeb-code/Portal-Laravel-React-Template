import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function AppLayout() {
    const isDesktop = () => window.innerWidth >= 1200;

    // Check localStorage for saved desktop preference
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined' && isDesktop()) {
            const saved = localStorage.getItem('portal_sidebar_open');
            return saved !== null ? saved === 'true' : true;
        }
        return false;
    });

    const location = useLocation();

    // Auto-adjust when resizing across breakpoints
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                const saved = localStorage.getItem('portal_sidebar_open');
                setIsSidebarOpen(saved !== null ? saved === 'true' : true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto close only on mobile when clicking a navigation link
    useEffect(() => {
        if (window.innerWidth < 1200) {
            setIsSidebarOpen(false);
        }
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const toggleSidebar = () => {
        const nextState = !isSidebarOpen;
        setIsSidebarOpen(nextState);

        // Save preference on desktop
        if (window.innerWidth >= 1200) {
            localStorage.setItem('portal_sidebar_open', String(nextState));
        }

        // Trigger resize event after transition so Chart.js graphs reflow automatically
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 350);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        if (window.innerWidth >= 1200) {
            localStorage.setItem('portal_sidebar_open', 'false');
        }
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 350);
    };

    return (
        <div className="app">
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} toggleSidebar={toggleSidebar} />
            <div className={`app-wrapper ${!isSidebarOpen ? 'full-width' : ''}`}>
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}
