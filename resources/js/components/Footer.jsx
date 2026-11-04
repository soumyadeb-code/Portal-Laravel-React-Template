import React from 'react';

export default function Footer() {
    return (
        <footer className="app-footer">
            <div className="container text-center py-3">
                <small className="copyright">
                    Designed with <span className="sr-only">love</span><i className="fa-solid fa-heart" style={{ color: '#fb866a' }}></i> by{' '}
                    <a className="app-link" href="http://themes.3rdwavemedia.com" target="_blank" rel="noreferrer">Xiaoying Riley</a> for developers
                </small>
            </div>
        </footer>
    );
}

