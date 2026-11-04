import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Header({ toggleSidebar, isSidebarOpen }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchMobileVisible, setSearchMobileVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        api.get('/notifications')
            .then(res => {
                setNotifications(res.data.notifications || []);
                setUnreadCount(res.data.unread_count || 0);
            })
            .catch(() => {});
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/orders?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate('/login');
    };

    return (
        <header className="app-header fixed-top">
            <div className="app-header-inner">
                <div className="container-fluid py-2">
                    <div className="app-header-content">
                        <div className="row justify-content-between align-items-center">

                            {/* Hamburger toggler: Available on both desktop and mobile for full-size view */}
                            <div className="col-auto d-flex align-items-center">
                                <a 
                                    id="sidepanel-toggler" 
                                    className={`sidepanel-toggler d-inline-block me-2 ${!isSidebarOpen ? 'is-collapsed text-success' : ''}`} 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); toggleSidebar(); }}
                                    title={isSidebarOpen ? "Collapse sidebar (Full size experience)" : "Expand sidebar"}
                                    aria-label="Toggle sidebar navigation"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img">
                                        <title>Menu</title>
                                        <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"></path>
                                    </svg>
                                </a>

                                {!isSidebarOpen && (
                                    <span className="badge bg-light text-success border border-success d-none d-lg-inline-block ms-1 px-2 py-1" style={{ fontSize: '0.75rem' }}>
                                        <i className="fa-solid fa-expand me-1"></i> Full Size View
                                    </span>
                                )}
                            </div>

                            <div className="search-mobile-trigger d-sm-none col" onClick={() => setSearchMobileVisible(!searchMobileVisible)}>
                                <i className={`search-mobile-trigger-icon fa-solid ${searchMobileVisible ? 'fa-xmark' : 'fa-magnifying-glass'}`}></i>
                            </div>

                            <div className={`app-search-box col ${searchMobileVisible ? 'is-visible' : ''}`}>
                                <form className="app-search-form" onSubmit={handleSearchSubmit}>
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        name="search" 
                                        className="form-control search-input"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button type="submit" className="btn search-btn btn-primary" value="Search">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </form>
                            </div>

                            <div className="app-utilities col-auto">
                                <div className="app-utility-item app-notifications-dropdown dropdown">
                                    <a 
                                        className="dropdown-toggle no-toggle-arrow" 
                                        id="notifications-dropdown-toggle" 
                                        data-bs-toggle="dropdown" 
                                        href="#" 
                                        role="button" 
                                        aria-expanded="false" 
                                        title="Notifications"
                                    >
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bell icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z"/>
                                            <path fillRule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                        </svg>
                                        {unreadCount > 0 && <span className="icon-badge">{unreadCount}</span>}
                                    </a>

                                    <div className="dropdown-menu p-0" aria-labelledby="notifications-dropdown-toggle">
                                        <div className="dropdown-menu-header p-3">
                                            <h5 className="dropdown-menu-title mb-0">Notifications</h5>
                                        </div>
                                        <div className="dropdown-menu-content">
                                            {notifications.slice(0, 3).map((item, idx) => (
                                                <div className="item p-3" key={item.id || idx}>
                                                    <div className="row gx-2 justify-content-between align-items-center">
                                                        <div className="col-auto">
                                                            {item.avatar ? (
                                                                <img className="profile-image" src={item.avatar.startsWith('/') ? item.avatar : `/${item.avatar}`} alt="" />
                                                            ) : (
                                                                <div className={`app-icon-holder ${idx % 2 === 1 ? 'icon-holder-mono' : ''}`}>
                                                                    <i className={item.icon || 'fa-solid fa-bell'}></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="col">
                                                            <div className="info">
                                                                <div className="desc">{item.message}</div>
                                                                <div className="meta">{item.time_ago}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link className="link-mask" to={item.action_url || '/notifications'}></Link>
                                                </div>
                                            ))}
                                            {notifications.length === 0 && (
                                                <div className="p-3 text-center text-muted">No new notifications</div>
                                            )}
                                        </div>
                                        <div className="dropdown-menu-footer p-2 text-center">
                                            <Link to="/notifications">View all</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="app-utility-item app-user-dropdown dropdown">
                                    <a 
                                        className="dropdown-toggle" 
                                        id="user-dropdown-toggle" 
                                        data-bs-toggle="dropdown" 
                                        href="#" 
                                        role="button" 
                                        aria-expanded="false"
                                    >
                                        <img 
                                            src={user?.avatar ? (user.avatar.startsWith('/') ? user.avatar : `/${user.avatar}`) : '/assets/images/user.png'} 
                                            alt="user profile" 
                                        />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="user-dropdown-toggle">
                                        <li><div className="dropdown-item-text fw-bold text-dark">{user?.name || 'User'}</div></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/account">Account</Link></li>
                                        <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>Log Out</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
