import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, closeSidebar, toggleSidebar }) {
    const location = useLocation();
    const [pagesOpen, setPagesOpen] = useState(
        ['/notifications', '/account', '/settings'].some(p => location.pathname.startsWith(p))
    );
    const [externalOpen, setExternalOpen] = useState(
        ['/login', '/signup', '/reset-password', '/404'].some(p => location.pathname.startsWith(p))
    );

    return (
        <>
            <div 
                id="app-sidepanel" 
                className={`app-sidepanel ${isOpen ? 'sidepanel-visible' : 'sidepanel-hidden'}`}
            >
                <div id="sidepanel-drop" className="sidepanel-drop" onClick={closeSidebar}></div>
                <div className="sidepanel-inner d-flex flex-column">
                    {/* Mobile close button */}
                    <a href="#" id="sidepanel-close" className="sidepanel-close d-xl-none" onClick={(e) => { e.preventDefault(); closeSidebar(); }}>
                        &times;
                    </a>
                    
                    <div className="app-branding d-flex align-items-center justify-content-between pe-3">
                        <Link className="app-logo" to="/">
                            <img className="logo-icon me-2" src="/assets/images/app-logo.svg" alt="logo" />
                            <span className="logo-text">PORTAL</span>
                        </Link>
                        {/* Desktop collapse icon inside sidebar */}
                        <button 
                            type="button" 
                            className="btn btn-sm text-secondary d-none d-xl-inline-flex align-items-center justify-content-center p-1 rounded border-0" 
                            onClick={toggleSidebar}
                            title="Collapse sidebar (Full size experience)"
                            style={{ width: '28px', height: '28px', background: '#f5f6fe' }}
                        >
                            <i className="fa-solid fa-angles-left" style={{ fontSize: '0.85rem' }}></i>
                        </button>
                    </div>

                    <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
                        <ul className="app-menu list-unstyled accordion" id="menu-accordion">
                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                                    to="/" 
                                    end
                                    onClick={closeSidebar}
                                >
                                    <span className="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house-door" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4h3.5V7.707L8 2.207l-5.5 5.5z"/>
                                            <path fillRule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text">Overview</span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                                    to="/docs"
                                    onClick={closeSidebar}
                                >
                                    <span className="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-folder" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.5 13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1l.5-9a1 1 0 0 0-1-.981H9.828zm-1.832-.582a4 4 0 0 0 2.83 1.173H13.5a2 2 0 0 1 2 1.962l-.5 9A2 2 0 0 1 13 15H2.5a2 2 0 0 1-2-1.962l-.5-9A2 2 0 0 1 2 2h4.172a2 2 0 0 1 1.414.586l.414.414z"/>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text">Docs</span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                                    to="/orders"
                                    onClick={closeSidebar}
                                >
                                    <span className="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                            <path fillRule="evenodd" d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
                                            <circle cx="3.5" cy="5.5" r=".5"/>
                                            <circle cx="3.5" cy="8" r=".5"/>
                                            <circle cx="3.5" cy="10.5" r=".5"/>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text">Orders</span>
                                </NavLink>
                            </li>

                            <li className="nav-item has-submenu">
                                <a 
                                    className={`nav-link submenu-toggle ${pagesOpen ? '' : 'collapsed'}`} 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); setPagesOpen(!pagesOpen); }}
                                >
                                    <span className="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-files" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
                                            <path d="M6 0h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z"/>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text">Pages</span>
                                    <span className="submenu-arrow">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </span>
                                </a>
                                <div className={`collapse submenu submenu-1 ${pagesOpen ? 'show' : ''}`}>
                                    <ul className="submenu-list list-unstyled">
                                        <li className="submenu-item"><NavLink className="submenu-link" to="/notifications" onClick={closeSidebar}>Notifications</NavLink></li>
                                        <li className="submenu-item"><NavLink className="submenu-link" to="/account" onClick={closeSidebar}>Account</NavLink></li>
                                        <li className="submenu-item"><NavLink className="submenu-link" to="/settings" onClick={closeSidebar}>Settings</NavLink></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item has-submenu">
                                <a 
                                    className={`nav-link submenu-toggle ${externalOpen ? '' : 'collapsed'}`} 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); setExternalOpen(!externalOpen); }}
                                >
                                    <span className="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-columns-gap" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M6 1H1v3h5V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12h-5v3h5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8H1v7h5V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6h-5v7h5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"/>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text">External</span>
                                    <span className="submenu-arrow">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </span>
                                </a>
                                <div className={`collapse submenu submenu-2 ${externalOpen ? 'show' : ''}`}>
                                    <ul className="submenu-list list-unstyled">
                                        <li className="submenu-item"><NavLink className="submenu-link" to="/login" onClick={closeSidebar}>Login</NavLink></li>
                                        <li className="submenu-item"><NavLink className="submenu-link" to="/signup" onClick={closeSidebar}>Signup</NavLink></li>
                                        <li className="submenu-item"><NavLink className="submenu-link" to="/reset-password" onClick={closeSidebar}>Reset password</NavLink></li>
                                        <li className="submenu-item"><NavLink className="submenu-link" to="/404" onClick={closeSidebar}>404 page</NavLink></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                                    to="/charts"
                                    onClick={closeSidebar}
                                >
                                    <span className="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bar-chart-line" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text">Charts</span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink 
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
                                    to="/help"
                                    onClick={closeSidebar}
                                >
                                    <span className="nav-icon">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-question-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                        </svg>
                                    </span>
                                    <span className="nav-link-text">Help</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className="app-sidepanel-footer">
                        <nav className="app-nav app-nav-footer">
                            <ul className="app-menu footer-menu list-unstyled">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/settings" onClick={closeSidebar}>
                                        <span className="nav-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/>
                                                <path fillRule="evenodd" d="M8 5.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zM4.75 8a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0z"/>
                                            </svg>
                                        </span>
                                        <span className="nav-link-text">Settings</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/" target="_blank" rel="noreferrer">
                                        <span className="nav-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                            </svg>
                                        </span>
                                        <span className="nav-link-text">Download</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/" target="_blank" rel="noreferrer">
                                        <span className="nav-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M12 1H4a1 1 0 0 0-1 1v10.755S4 11 8 11s5 1.755 5 1.755V2a1 1 0 0 0-1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                                                <path fillRule="evenodd" d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            </svg>
                                        </span>
                                        <span className="nav-link-text">License</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}
