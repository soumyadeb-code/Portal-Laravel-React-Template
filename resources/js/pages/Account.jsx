import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Account() {
    const { user, updateProfile, changePassword } = useAuth();

    // Profile state
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [title, setTitle] = useState(user?.title || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [location, setLocation] = useState(user?.location || '');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileMessage, setProfileMessage] = useState('');

    // Security state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
    const [twoFactor, setTwoFactor] = useState(user?.two_factor_enabled || false);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({ name, email, title, bio, location });
            setProfileMessage('Profile updated successfully!');
            setIsEditingProfile(false);
            setTimeout(() => setProfileMessage(''), 4000);
        } catch (err) {
            setProfileMessage('Failed to update profile.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'danger', text: 'New passwords do not match.' });
            return;
        }
        try {
            await changePassword(currentPassword, newPassword);
            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setIsChangingPassword(false);
            setTimeout(() => setPasswordMessage({ type: '', text: '' }), 4000);
        } catch (err) {
            setPasswordMessage({ type: 'danger', text: err.response?.data?.message || 'Failed to change password.' });
        }
    };

    const handleToggleTwoFactor = async () => {
        const nextState = !twoFactor;
        setTwoFactor(nextState);
        try {
            await updateProfile({ two_factor_enabled: nextState });
        } catch (e) {
            setTwoFactor(!nextState);
        }
    };

    return (
        <div className="container-xl">
            <h1 className="app-page-title">My Account</h1>

            {profileMessage && <div className="alert alert-success">{profileMessage}</div>}
            {passwordMessage.text && <div className={`alert alert-${passwordMessage.type}`}>{passwordMessage.text}</div>}

            <div className="row gy-4">
                {/* Profile Card */}
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-account shadow-sm d-flex flex-column align-items-start h-100">
                        <div className="app-card-header p-3 border-bottom-0">
                            <div className="row align-items-center gx-3">
                                <div className="col-auto">
                                    <div className="app-icon-holder">
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <h4 className="app-card-title">Profile</h4>
                                </div>
                            </div>
                        </div>

                        <div className="app-card-body px-4 w-100">
                            {isEditingProfile ? (
                                <form onSubmit={handleProfileSubmit} className="py-2">
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Job Title</label>
                                        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Location</label>
                                        <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Bio</label>
                                        <textarea className="form-control" rows="2" value={bio} onChange={e => setBio(e.target.value)}></textarea>
                                    </div>
                                    <div className="d-flex gap-2 mb-3">
                                        <button type="submit" className="btn app-btn-primary">Save Changes</button>
                                        <button type="button" className="btn app-btn-secondary" onClick={() => setIsEditingProfile(false)}>Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="item border-bottom py-3">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-auto">
                                                <div className="item-label mb-2"><strong>Photo</strong></div>
                                                <div className="item-data">
                                                    <img className="profile-image" src={user?.avatar ? (user.avatar.startsWith('/') ? user.avatar : `/${user.avatar}`) : '/assets/images/user.png'} alt="" />
                                                </div>
                                            </div>
                                            <div className="col text-end">
                                                <button className="btn-sm app-btn-secondary" onClick={() => setIsEditingProfile(true)}>Change</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item border-bottom py-3">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-auto">
                                                <div className="item-label"><strong>Name</strong></div>
                                                <div className="item-data">{user?.name}</div>
                                            </div>
                                            <div className="col text-end">
                                                <button className="btn-sm app-btn-secondary" onClick={() => setIsEditingProfile(true)}>Change</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item border-bottom py-3">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-auto">
                                                <div className="item-label"><strong>Email</strong></div>
                                                <div className="item-data">{user?.email}</div>
                                            </div>
                                            <div className="col text-end">
                                                <button className="btn-sm app-btn-secondary" onClick={() => setIsEditingProfile(true)}>Change</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item border-bottom py-3">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-auto">
                                                <div className="item-label"><strong>Title & Location</strong></div>
                                                <div className="item-data">{user?.title || 'Senior Developer'} - {user?.location || 'Bristol, UK'}</div>
                                            </div>
                                            <div className="col text-end">
                                                <button className="btn-sm app-btn-secondary" onClick={() => setIsEditingProfile(true)}>Change</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item py-3">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-auto">
                                                <div className="item-label"><strong>Bio</strong></div>
                                                <div className="item-data text-muted">{user?.bio || 'Building modern, responsive admin portals and dashboards for developer teams.'}</div>
                                            </div>
                                            <div className="col text-end">
                                                <button className="btn-sm app-btn-secondary" onClick={() => setIsEditingProfile(true)}>Change</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Preferences Card */}
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-account shadow-sm d-flex flex-column align-items-start h-100">
                        <div className="app-card-header p-3 border-bottom-0">
                            <div className="row align-items-center gx-3">
                                <div className="col-auto">
                                    <div className="app-icon-holder">
                                        <i className="fa-solid fa-sliders"></i>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <h4 className="app-card-title">Preferences</h4>
                                </div>
                            </div>
                        </div>

                        <div className="app-card-body px-4 w-100">
                            <div className="item border-bottom py-3">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-auto">
                                        <div className="item-label"><strong>Language</strong></div>
                                        <div className="item-data">English (United States)</div>
                                    </div>
                                    <div className="col text-end">
                                        <span className="badge bg-success">Default</span>
                                    </div>
                                </div>
                            </div>

                            <div className="item border-bottom py-3">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-auto">
                                        <div className="item-label"><strong>Time Zone</strong></div>
                                        <div className="item-data">America/New_York (UTC-05:00)</div>
                                    </div>
                                    <div className="col text-end">
                                        <span className="badge bg-secondary">System</span>
                                    </div>
                                </div>
                            </div>

                            <div className="item py-3">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-auto">
                                        <div className="item-label"><strong>Currency</strong></div>
                                        <div className="item-data">USD ($)</div>
                                    </div>
                                    <div className="col text-end">
                                        <span className="badge bg-secondary">Primary</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Card */}
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-account shadow-sm d-flex flex-column align-items-start h-100">
                        <div className="app-card-header p-3 border-bottom-0">
                            <div className="row align-items-center gx-3">
                                <div className="col-auto">
                                    <div className="app-icon-holder">
                                        <i className="fa-solid fa-shield-halved"></i>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <h4 className="app-card-title">Security</h4>
                                </div>
                            </div>
                        </div>

                        <div className="app-card-body px-4 w-100">
                            {isChangingPassword ? (
                                <form onSubmit={handlePasswordSubmit} className="py-2">
                                    <div className="mb-3">
                                        <label className="form-label">Current Password</label>
                                        <input type="password" className="form-control" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">New Password</label>
                                        <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirm New Password</label>
                                        <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6} />
                                    </div>
                                    <div className="d-flex gap-2 mb-3">
                                        <button type="submit" className="btn app-btn-primary">Update Password</button>
                                        <button type="button" className="btn app-btn-secondary" onClick={() => setIsChangingPassword(false)}>Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <div className="item border-bottom py-3">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-auto">
                                            <div className="item-label"><strong>Password</strong></div>
                                            <div className="item-data">••••••••••••</div>
                                        </div>
                                        <div className="col text-end">
                                            <button className="btn-sm app-btn-secondary" onClick={() => setIsChangingPassword(true)}>Change</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="item py-3">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-auto">
                                        <div className="item-label"><strong>Two-Factor Authentication</strong></div>
                                        <div className="item-data text-muted">
                                            {twoFactor ? (
                                                <span className="text-success"><i className="fa-solid fa-circle-check me-1"></i>Enabled</span>
                                            ) : (
                                                <span className="text-secondary"><i className="fa-solid fa-circle-xmark me-1"></i>Disabled</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col text-end">
                                        <button className="btn-sm app-btn-secondary" onClick={handleToggleTwoFactor}>
                                            {twoFactor ? 'Disable' : 'Enable'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods Card */}
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-account shadow-sm d-flex flex-column align-items-start h-100">
                        <div className="app-card-header p-3 border-bottom-0">
                            <div className="row align-items-center gx-3">
                                <div className="col-auto">
                                    <div className="app-icon-holder">
                                        <i className="fa-solid fa-credit-card"></i>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <h4 className="app-card-title">Payment Methods</h4>
                                </div>
                            </div>
                        </div>

                        <div className="app-card-body px-4 w-100">
                            <div className="item border-bottom py-3">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-auto">
                                        <div className="item-label"><i className="fab fa-cc-visa me-2 fa-lg text-primary"></i><strong>Credit Card</strong></div>
                                        <div className="item-data">4242 •••• •••• 4242 (Expires 12/28)</div>
                                    </div>
                                    <div className="col text-end">
                                        <span className="badge bg-success">Primary</span>
                                    </div>
                                </div>
                            </div>

                            <div className="item py-3">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-auto">
                                        <div className="item-label"><i className="fab fa-paypal me-2 fa-lg text-info"></i><strong>PayPal</strong></div>
                                        <div className="item-data">{user?.email || 'admin@portal.test'}</div>
                                    </div>
                                    <div className="col text-end">
                                        <span className="badge bg-secondary">Connected</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

