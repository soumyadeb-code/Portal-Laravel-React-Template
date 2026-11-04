import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

export default function Orders() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';

    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showNewModal, setShowNewModal] = useState(false);
    const [newOrderForm, setNewOrderForm] = useState({
        order_number: `#${Math.floor(10000 + Math.random() * 90000)}`,
        product: '',
        customer_name: '',
        customer_email: '',
        order_date: 'Today',
        status: 'Paid',
        total: '',
    });

    const fetchOrders = () => {
        setLoading(true);
        api.get(`/orders?status=${statusFilter}&search=${encodeURIComponent(searchTerm)}`)
            .then(res => {
                setOrders(res.data.data || res.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchOrders();
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            await api.post('/orders', newOrderForm);
            setShowNewModal(false);
            setNewOrderForm({
                order_number: `#${Math.floor(10000 + Math.random() * 90000)}`,
                product: '',
                customer_name: '',
                customer_email: '',
                order_date: 'Today',
                status: 'Paid',
                total: '',
            });
            fetchOrders();
        } catch (err) {
            alert('Failed to create order. Please check required fields.');
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;
        try {
            await api.delete(`/orders/${id}`);
            setSelectedOrder(null);
            fetchOrders();
        } catch (err) {
            alert('Failed to delete order');
        }
    };

    const exportToCSV = () => {
        if (orders.length === 0) return;
        const headers = ['Order', 'Product', 'Customer', 'Date', 'Status', 'Total'];
        const rows = orders.map(o => [
            o.order_number,
            `"${o.product.replace(/"/g, '""')}"`,
            `"${o.customer_name.replace(/"/g, '""')}"`,
            `"${o.order_date}"`,
            o.status,
            o.total
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `orders_${statusFilter}_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid': return 'badge bg-success';
            case 'pending': return 'badge bg-warning';
            case 'cancelled': return 'badge bg-danger';
            default: return 'badge bg-secondary';
        }
    };

    return (
        <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Orders</h1>
                </div>
                <div className="col-auto">
                    <div className="page-utilities">
                        <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                            <div className="col-auto">
                                <form className="table-search-form row gx-1 align-items-center" onSubmit={handleSearchSubmit}>
                                    <div className="col-auto">
                                        <input 
                                            type="text" 
                                            id="search-orders" 
                                            name="searchorders" 
                                            className="form-control search-orders" 
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <button type="submit" className="btn app-btn-secondary">Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-auto">
                                <select 
                                    className="form-select w-auto"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <button className="btn app-btn-secondary" onClick={exportToCSV}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-download me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                    Download CSV
                                </button>
                            </div>
                            <div className="col-auto">
                                <button className="btn app-btn-primary" onClick={() => setShowNewModal(true)}>
                                    <i className="fa-solid fa-plus me-1"></i> New Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav id="orders-table-tab" className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
                <a 
                    className={`flex-sm-fill text-sm-center nav-link ${statusFilter === 'all' ? 'active' : ''}`} 
                    href="#all"
                    onClick={(e) => { e.preventDefault(); setStatusFilter('all'); }}
                >
                    All
                </a>
                <a 
                    className={`flex-sm-fill text-sm-center nav-link ${statusFilter === 'paid' ? 'active' : ''}`} 
                    href="#paid"
                    onClick={(e) => { e.preventDefault(); setStatusFilter('paid'); }}
                >
                    Paid
                </a>
                <a 
                    className={`flex-sm-fill text-sm-center nav-link ${statusFilter === 'pending' ? 'active' : ''}`} 
                    href="#pending"
                    onClick={(e) => { e.preventDefault(); setStatusFilter('pending'); }}
                >
                    Pending
                </a>
                <a 
                    className={`flex-sm-fill text-sm-center nav-link ${statusFilter === 'cancelled' ? 'active' : ''}`} 
                    href="#cancelled"
                    onClick={(e) => { e.preventDefault(); setStatusFilter('cancelled'); }}
                >
                    Cancelled
                </a>
            </nav>

            <div className="tab-content" id="orders-table-tab-content">
                <div className="tab-pane fade show active">
                    <div className="app-card app-card-orders-table shadow-sm mb-5">
                        <div className="app-card-body">
                            <div className="table-responsive">
                                <table className="table app-table-hover mb-0 text-left">
                                    <thead>
                                        <tr>
                                            <th className="cell">Order</th>
                                            <th className="cell">Product</th>
                                            <th className="cell">Customer</th>
                                            <th className="cell">Date</th>
                                            <th className="cell">Status</th>
                                            <th className="cell">Total</th>
                                            <th className="cell text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4">Loading orders...</td>
                                            </tr>
                                        ) : orders.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4 text-muted">No orders found matching criteria.</td>
                                            </tr>
                                        ) : (
                                            orders.map((order) => (
                                                <tr key={order.id}>
                                                    <td className="cell fw-bold">{order.order_number}</td>
                                                    <td className="cell"><span className="truncate">{order.product}</span></td>
                                                    <td className="cell">{order.customer_name}</td>
                                                    <td className="cell"><span>{order.order_date}</span></td>
                                                    <td className="cell"><span className={getBadgeClass(order.status)}>{order.status}</span></td>
                                                    <td className="cell">${Number(order.total).toFixed(2)}</td>
                                                    <td className="cell text-end">
                                                        <button 
                                                            className="btn-sm app-btn-secondary me-2" 
                                                            onClick={() => setSelectedOrder(order)}
                                                        >
                                                            View
                                                        </button>
                                                        <button 
                                                            className="btn-sm btn-outline-danger" 
                                                            onClick={() => handleDeleteOrder(order.id)}
                                                            title="Delete"
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Order Modal */}
            {selectedOrder && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details: {selectedOrder.order_number}</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
                            </div>
                            <div className="modal-body">
                                <dl className="row mb-0">
                                    <dt className="col-sm-4">Product</dt>
                                    <dd className="col-sm-8">{selectedOrder.product}</dd>

                                    <dt className="col-sm-4">Customer</dt>
                                    <dd className="col-sm-8">{selectedOrder.customer_name}</dd>

                                    <dt className="col-sm-4">Customer Email</dt>
                                    <dd className="col-sm-8">{selectedOrder.customer_email || 'N/A'}</dd>

                                    <dt className="col-sm-4">Date</dt>
                                    <dd className="col-sm-8">{selectedOrder.order_date}</dd>

                                    <dt className="col-sm-4">Status</dt>
                                    <dd className="col-sm-8"><span className={getBadgeClass(selectedOrder.status)}>{selectedOrder.status}</span></dd>

                                    <dt className="col-sm-4">Total Amount</dt>
                                    <dd className="col-sm-8 fw-bold text-success">${Number(selectedOrder.total).toFixed(2)}</dd>
                                </dl>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn app-btn-secondary" onClick={() => setSelectedOrder(null)}>Close</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteOrder(selectedOrder.id)}>Delete Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Order Modal */}
            {showNewModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow">
                            <form onSubmit={handleCreateOrder}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Create New Order</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowNewModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Order Number</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={newOrderForm.order_number} 
                                            onChange={(e) => setNewOrderForm({ ...newOrderForm, order_number: e.target.value })}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Product Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={newOrderForm.product} 
                                            onChange={(e) => setNewOrderForm({ ...newOrderForm, product: e.target.value })}
                                            placeholder="e.g. Bootstrap Admin Template License" 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Customer Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={newOrderForm.customer_name} 
                                            onChange={(e) => setNewOrderForm({ ...newOrderForm, customer_name: e.target.value })}
                                            placeholder="e.g. John Doe" 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Customer Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            value={newOrderForm.customer_email} 
                                            onChange={(e) => setNewOrderForm({ ...newOrderForm, customer_email: e.target.value })}
                                            placeholder="e.g. john@example.com" 
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Status</label>
                                            <select 
                                                className="form-select"
                                                value={newOrderForm.status}
                                                onChange={(e) => setNewOrderForm({ ...newOrderForm, status: e.target.value })}
                                            >
                                                <option value="Paid">Paid</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Total ($)</label>
                                            <input 
                                                type="number" 
                                                step="0.01" 
                                                className="form-control" 
                                                value={newOrderForm.total} 
                                                onChange={(e) => setNewOrderForm({ ...newOrderForm, total: e.target.value })}
                                                placeholder="99.00" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn app-btn-secondary" onClick={() => setShowNewModal(false)}>Cancel</button>
                                    <button type="submit" className="btn app-btn-primary">Create Order</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

