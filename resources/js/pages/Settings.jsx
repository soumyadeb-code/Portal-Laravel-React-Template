import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function Settings() {
    const [settings, setSettings] = useState({
        business_name: 'Portal Inc.',
        portal_name: 'Portal BS5 Admin',
        currency: 'USD ($)',
        timezone: 'America/New_York (UTC-5)',
        plan_name: 'Pro Plan',
        plan_price: '$29 / month',
        plan_renews: '2026-12-01',
        webhook_url: 'https://yourwebsite.com/api/webhook',
        webhook_secret: 'whsec_9a8b7c6d5e4f3a2b1c',
        email_notifications: true,
        security_alerts: true,
        promotional_emails: false,
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/settings')
            .then(res => {
                setSettings(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSubmitGeneral = async (e) => {
        e.preventDefault();
        try {
            await api.post('/settings', settings);
            setMessage('General settings saved successfully!');
            setTimeout(() => setMessage(''), 4000);
        } catch (err) {
            setMessage('Failed to save settings.');
        }
    };

    const handleToggle = async (key) => {
        const updated = { ...settings, [key]: !settings[key] };
        setSettings(updated);
        try {
            await api.post('/settings', updated);
        } catch (e) {
            // rollback
            setSettings(settings);
        }
    };

    return (
        <div className="container-xl">
            <h1 className="app-page-title">Settings</h1>

            {message && <div className="alert alert-success">{message}</div>}

            <hr className="mb-4" />

            {/* General Settings */}
            <div className="row g-4 settings-section">
                <div className="col-12 col-md-4">
                    <h3 className="section-title">General</h3>
                    <div className="section-intro">Configure your business identity, portal name, currency, and primary contact information.</div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="app-card app-card-settings shadow-sm p-4">
                        <div className="app-card-body">
                            <form className="settings-form" onSubmit={handleSubmitGeneral}>
                                <div className="mb-3">
                                    <label className="form-label">Business Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={settings.business_name} 
                                        onChange={e => setSettings({ ...settings, business_name: e.target.value })}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Portal Brand Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={settings.portal_name} 
                                        onChange={e => setSettings({ ...settings, portal_name: e.target.value })}
                                        required 
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Currency</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={settings.currency} 
                                            onChange={e => setSettings({ ...settings, currency: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Timezone</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={settings.timezone} 
                                            onChange={e => setSettings({ ...settings, timezone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn app-btn-primary">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4" />

            {/* Plans & Billing */}
            <div className="row g-4 settings-section">
                <div className="col-12 col-md-4">
                    <h3 className="section-title">Plan &amp; Billing</h3>
                    <div className="section-intro">Review your subscription plan tier, next renewal date, invoices, and payment cycles.</div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="app-card app-card-settings shadow-sm p-4">
                        <div className="app-card-body">
                            <div className="mb-2"><strong>Current Plan:</strong> {settings.plan_name} ({settings.plan_price})</div>
                            <div className="mb-2"><strong>Status:</strong> <span className="badge bg-success">Active</span></div>
                            <div className="mb-2"><strong>Renews on:</strong> {settings.plan_renews}</div>
                            <div className="mb-4"><strong>Billing Invoices:</strong> <Link to="/orders">View invoices</Link></div>
                            <div className="row justify-content-between">
                                <div className="col-auto">
                                    <button className="btn app-btn-primary" onClick={() => alert('Upgrade modal is available for enterprise tiers.')}>Upgrade Plan</button>
                                </div>
                                <div className="col-auto">
                                    <button className="btn app-btn-secondary" onClick={() => alert('Subscription auto-renew modified.')}>Manage Billing</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4" />

            {/* Notifications Preferences */}
            <div className="row g-4 settings-section">
                <div className="col-12 col-md-4">
                    <h3 className="section-title">Notifications</h3>
                    <div className="section-intro">Control which email events and alerts trigger notifications in your dashboard.</div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="app-card app-card-settings shadow-sm p-4">
                        <div className="app-card-body">
                            <form className="settings-form" onSubmit={e => e.preventDefault()}>
                                <div className="form-check form-switch mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="settings-switch-1" 
                                        checked={settings.email_notifications}
                                        onChange={() => handleToggle('email_notifications')} 
                                    />
                                    <label className="form-check-label" htmlFor="settings-switch-1">Email notifications for team updates & orders</label>
                                </div>
                                <div className="form-check form-switch mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="settings-switch-2" 
                                        checked={settings.security_alerts}
                                        onChange={() => handleToggle('security_alerts')} 
                                    />
                                    <label className="form-check-label" htmlFor="settings-switch-2">Security alerts & suspicious login warnings</label>
                                </div>
                                <div className="form-check form-switch mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="settings-switch-3" 
                                        checked={settings.promotional_emails}
                                        onChange={() => handleToggle('promotional_emails')} 
                                    />
                                    <label className="form-check-label" htmlFor="settings-switch-3">Weekly digest & product release notes</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4" />

            {/* Webhook & Integrations */}
            <div className="row g-4 settings-section mb-4">
                <div className="col-12 col-md-4">
                    <h3 className="section-title">Webhooks</h3>
                    <div className="section-intro">Transmit live order and registration events to external endpoints and microservices.</div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="app-card app-card-settings shadow-sm p-4">
                        <div className="app-card-body">
                            <form onSubmit={handleSubmitGeneral}>
                                <div className="mb-3">
                                    <label className="form-label">Webhook URL</label>
                                    <input 
                                        type="url" 
                                        className="form-control" 
                                        value={settings.webhook_url || ''} 
                                        onChange={e => setSettings({ ...settings, webhook_url: e.target.value })}
                                        placeholder="https://example.com/api/webhook" 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Signing Secret</label>
                                    <input 
                                        type="text" 
                                        className="form-control font-monospace" 
                                        value={settings.webhook_secret || ''} 
                                        readOnly 
                                    />
                                </div>
                                <button type="submit" className="btn app-btn-primary">Save Webhook</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

