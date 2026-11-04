import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = () => {
        setLoading(true);
        api.get('/notifications')
            .then(res => {
                setNotifications(res.data.notifications || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAllRead = async () => {
        try {
            await api.post('/notifications/mark-read');
            fetchNotifications();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notifications/${id}`);
            setNotifications(notifications.filter(n => n.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const getCategoryBadge = (category) => {
        switch (category?.toLowerCase()) {
            case 'billing': return 'badge bg-warning';
            case 'project': return 'badge bg-info';
            case 'news': return 'badge bg-success';
            case 'analytics': return 'badge bg-primary';
            case 'system': return 'badge bg-dark';
            default: return 'badge bg-secondary';
        }
    };

    return (
        <div className="container-xl">
            <div className="position-relative mb-4">
                <div className="row g-3 justify-content-between align-items-center">
                    <div className="col-auto">
                        <h1 className="app-page-title mb-0">Notifications</h1>
                    </div>
                    <div className="col-auto">
                        <button className="btn app-btn-secondary" onClick={handleMarkAllRead}>
                            <i className="fa-solid fa-check-double me-1"></i> Mark all as read
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5 text-muted">Loading notifications...</div>
            ) : notifications.length === 0 ? (
                <div className="app-card shadow-sm p-4 text-center text-muted">
                    <i className="fa-regular fa-bell-slash fa-2x mb-2"></i>
                    <div>You have no notifications at this time.</div>
                </div>
            ) : (
                notifications.map((item) => (
                    <div className={`app-card app-card-notification shadow-sm mb-4 ${!item.is_read ? 'border-start border-4 border-success' : ''}`} key={item.id}>
                        <div className="app-card-header px-4 py-3">
                            <div className="row g-3 align-items-center">
                                <div className="col-12 col-lg-auto text-center text-lg-start">
                                    {item.avatar ? (
                                        <img 
                                            className="profile-image" 
                                            src={item.avatar.startsWith('/') ? item.avatar : `/${item.avatar}`} 
                                            alt="" 
                                        />
                                    ) : (
                                        <div className="app-icon-holder">
                                            <i className={item.icon || 'fa-solid fa-bell'}></i>
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 col-lg-auto text-center text-lg-start">
                                    <div className="notification-type mb-2">
                                        <span className={getCategoryBadge(item.category)}>{item.category}</span>
                                        {!item.is_read && <span className="badge bg-danger ms-2">Unread</span>}
                                    </div>
                                    <h4 className="notification-title mb-1">{item.title}</h4>
                                    <ul className="notification-meta list-inline mb-0">
                                        <li className="list-inline-item">{item.time_ago}</li>
                                        <li className="list-inline-item">|</li>
                                        <li className="list-inline-item">System & User Activity</li>
                                    </ul>
                                </div>
                                <div className="col-12 col-lg-auto ms-lg-auto text-end">
                                    <button 
                                        className="btn btn-sm btn-outline-danger" 
                                        onClick={() => handleDelete(item.id)}
                                        title="Dismiss"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="notification-content">{item.message}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

