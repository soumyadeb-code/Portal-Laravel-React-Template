import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="app app-login p-0">
            <div className="row g-0 app-auth-wrapper min-vh-100">
                <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
                    <div className="d-flex flex-column align-content-end h-100">
                        <div className="app-auth-body mx-auto my-auto w-100" style={{ maxWidth: '400px' }}>
                            <div className="app-auth-branding mb-4">
                                <Link className="app-logo" to="/">
                                    <img className="logo-icon me-2" src="/assets/images/app-logo.svg" alt="logo" />
                                    <span className="logo-text">PORTAL</span>
                                </Link>
                            </div>

                            <Outlet />
                        </div>

                        <footer className="app-auth-footer mt-auto">
                            <div className="container text-center py-3">
                                <small className="copyright">
                                    Designed with <i className="fas fa-heart" style={{ color: '#fb866a' }}></i> by{' '}
                                    <a className="app-link" href="http://themes.3rdwavemedia.com" target="_blank" rel="noreferrer">
                                        Xiaoying Riley
                                    </a> for developers
                                </small>
                            </div>
                        </footer>
                    </div>
                </div>

                <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col d-none d-md-block">
                    <div className="auth-background-holder"></div>
                    <div className="auth-background-mask"></div>
                    <div className="auth-background-overlay p-3 p-lg-5">
                        <div className="d-flex flex-column align-content-end h-100">
                            <div className="h-100"></div>
                            <div className="overlay-content p-3 p-lg-4 rounded">
                                <h5 className="mb-3 overlay-title">Explore Portal Admin Template</h5>
                                <div>
                                    Portal is a modern Bootstrap 5 admin dashboard template integrated with Laravel & React, configured with MySQL database <code>sd_portal</code>.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

