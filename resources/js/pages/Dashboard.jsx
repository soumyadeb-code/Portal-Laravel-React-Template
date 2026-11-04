import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);
    const lineChartInstance = useRef(null);
    const barChartInstance = useRef(null);

    useEffect(() => {
        api.get('/dashboard')
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Initialize Chart.js
    useEffect(() => {
        if (!data || !window.Chart) return;

        const chartColors = {
            green: '#75c181',
            gray: '#a9b5c9',
            text: '#252930',
            border: '#e7e9ed'
        };

        // Line Chart
        if (lineChartRef.current) {
            if (lineChartInstance.current) {
                lineChartInstance.current.destroy();
            }
            const ctxLine = lineChartRef.current.getContext('2d');
            lineChartInstance.current = new window.Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: data.chart_line.labels,
                    datasets: [
                        {
                            label: 'Current week',
                            fill: false,
                            backgroundColor: chartColors.green,
                            borderColor: chartColors.green,
                            data: data.chart_line.current_week,
                            tension: 0.3,
                        },
                        {
                            label: 'Previous week',
                            borderDash: [3, 5],
                            backgroundColor: chartColors.gray,
                            borderColor: chartColors.gray,
                            data: data.chart_line.previous_week,
                            fill: false,
                            tension: 0.3,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    aspectRatio: 1.5,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            align: 'end',
                        },
                        title: {
                            display: true,
                            text: 'Sales Trend Overview'
                        }
                    }
                }
            });
        }

        // Bar Chart
        if (barChartRef.current) {
            if (barChartInstance.current) {
                barChartInstance.current.destroy();
            }
            const ctxBar = barChartRef.current.getContext('2d');
            barChartInstance.current = new window.Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: data.chart_bar.labels,
                    datasets: [{
                        label: 'Orders',
                        backgroundColor: chartColors.green,
                        borderColor: chartColors.green,
                        borderWidth: 1,
                        maxBarThickness: 16,
                        data: data.chart_bar.orders
                    }]
                },
                options: {
                    responsive: true,
                    aspectRatio: 1.5,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            align: 'end',
                        },
                        title: {
                            display: true,
                            text: 'Weekly Orders'
                        }
                    }
                }
            });
        }

        return () => {
            if (lineChartInstance.current) lineChartInstance.current.destroy();
            if (barChartInstance.current) barChartInstance.current.destroy();
        };
    }, [data]);

    const stats = data?.stats || {
        total_sales: '$12,628',
        sales_change: '+20%',
        expenses: '$2,250',
        expenses_change: '-5%',
        projects: '23',
        projects_sub: '3 open',
        invoices: '6',
        invoices_sub: '$6,782 unpaid',
    };

    return (
        <div className="container-xl">
            <h1 className="app-page-title">Overview</h1>

            {/* Alert / Welcome banner */}
            <div className="app-card alert alert-dismissible shadow-sm mb-4 border-left-decoration" role="alert">
                <div className="inner">
                    <div className="app-card-body p-3 p-lg-4">
                        <h3 className="mb-3">Welcome, developer!</h3>
                        <div className="row gx-5 gy-3">
                            <div className="col-12 col-lg-9">
                                <div>
                                    Portal is a free Bootstrap 5 admin dashboard template converted into a full-featured Laravel 12 & React application with MySQL (database: <code>sd_portal</code>). The design is modern, clean, and modular.
                                </div>
                            </div>
                            <div className="col-12 col-lg-3">
                                <a 
                                    className="btn app-btn-primary" 
                                    href="https://themes.3rdwavemedia.com/bootstrap-templates/admin-dashboard/portal-free-bootstrap-admin-dashboard-template-for-developers/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-earmark-arrow-down me-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                                        <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"/>
                                        <path fillRule="evenodd" d="M8 6a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 10.293V6.5A.5.5 0 0 1 8 6z"/>
                                    </svg>
                                    Free Download
                                </a>
                            </div>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            </div>

            {/* Stats row */}
            <div className="row g-4 mb-4">
                <div className="col-6 col-lg-3">
                    <div className="app-card app-card-stat shadow-sm h-100">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1">Total Sales</h4>
                            <div className="stats-figure">{stats.total_sales}</div>
                            <div className="stats-meta text-success">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                </svg> {stats.sales_change}
                            </div>
                        </div>
                        <Link className="app-card-link-mask" to="/orders"></Link>
                    </div>
                </div>

                <div className="col-6 col-lg-3">
                    <div className="app-card app-card-stat shadow-sm h-100">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1">Expenses</h4>
                            <div className="stats-figure">{stats.expenses}</div>
                            <div className="stats-meta text-success">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg> {stats.expenses_change}
                            </div>
                        </div>
                        <Link className="app-card-link-mask" to="/orders"></Link>
                    </div>
                </div>

                <div className="col-6 col-lg-3">
                    <div className="app-card app-card-stat shadow-sm h-100">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1">Projects</h4>
                            <div className="stats-figure">{stats.projects}</div>
                            <div className="stats-meta">{stats.projects_sub}</div>
                        </div>
                        <Link className="app-card-link-mask" to="/docs"></Link>
                    </div>
                </div>

                <div className="col-6 col-lg-3">
                    <div className="app-card app-card-stat shadow-sm h-100">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1">Invoices</h4>
                            <div className="stats-figure">{stats.invoices}</div>
                            <div className="stats-meta">{stats.invoices_sub}</div>
                        </div>
                        <Link className="app-card-link-mask" to="/orders"></Link>
                    </div>
                </div>
            </div>

            {/* Charts row */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <h4 className="app-card-title">Line Chart Example</h4>
                                </div>
                                <div className="col-auto">
                                    <div className="card-header-action">
                                        <Link to="/charts">More charts</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body p-3 p-lg-4">
                            <div className="mb-3 d-flex">
                                <select className="form-select form-select-sm ms-auto d-inline-flex w-auto" defaultValue="1">
                                    <option value="1">This week</option>
                                    <option value="2">Today</option>
                                    <option value="3">This Month</option>
                                    <option value="4">This Year</option>
                                </select>
                            </div>
                            <div className="chart-container">
                                <canvas ref={lineChartRef} id="canvas-linechart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <h4 className="app-card-title">Bar Chart Example</h4>
                                </div>
                                <div className="col-auto">
                                    <div className="card-header-action">
                                        <Link to="/charts">More charts</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body p-3 p-lg-4">
                            <div className="mb-3 d-flex">
                                <select className="form-select form-select-sm ms-auto d-inline-flex w-auto" defaultValue="1">
                                    <option value="1">This week</option>
                                    <option value="2">Today</option>
                                    <option value="3">This Month</option>
                                    <option value="4">This Year</option>
                                </select>
                            </div>
                            <div className="chart-container">
                                <canvas ref={barChartRef} id="canvas-barchart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress and Stats Table row */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-progress-list h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <h4 className="app-card-title">Progress</h4>
                                </div>
                                <div className="col-auto">
                                    <div className="card-header-action">
                                        <a href="#" onClick={(e) => e.preventDefault()}>All projects</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body">
                            <div className="item p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="title mb-1">Project lorem ipsum dolor sit amet</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                                <a className="item-link-mask" href="#" onClick={(e) => e.preventDefault()}></a>
                            </div>

                            <div className="item p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="title mb-1">Project duis aliquam et lacus quis ornare</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: '34%' }} aria-valuenow="34" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                                <a className="item-link-mask" href="#" onClick={(e) => e.preventDefault()}></a>
                            </div>

                            <div className="item p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="title mb-1">Project sed tempus felis id lacus pulvinar</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: '68%' }} aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                                <a className="item-link-mask" href="#" onClick={(e) => e.preventDefault()}></a>
                            </div>

                            <div className="item p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <div className="title mb-1">Project lorem ipsum dolor sit amet</div>
                                        <div className="progress">
                                            <div className="progress-bar bg-success" role="progressbar" style={{ width: '52%' }} aria-valuenow="52" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                                <a className="item-link-mask" href="#" onClick={(e) => e.preventDefault()}></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-stats-table h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <h4 className="app-card-title">Stats List</h4>
                                </div>
                                <div className="col-auto">
                                    <div className="card-header-action">
                                        <a href="#" onClick={(e) => e.preventDefault()}>View report</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body p-3 p-lg-4">
                            <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                    <thead>
                                        <tr>
                                            <th className="meta">Source</th>
                                            <th className="meta stat-cell">Views</th>
                                            <th className="meta stat-cell">Today</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><a href="https://google.com" target="_blank" rel="noreferrer">google.com</a></td>
                                            <td className="stat-cell">110</td>
                                            <td className="stat-cell">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                                </svg> 30%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="https://getbootstrap.com" target="_blank" rel="noreferrer">getbootstrap.com</a></td>
                                            <td className="stat-cell">67</td>
                                            <td className="stat-cell">23%</td>
                                        </tr>
                                        <tr>
                                            <td><a href="https://w3schools.com" target="_blank" rel="noreferrer">w3schools.com</a></td>
                                            <td className="stat-cell">56</td>
                                            <td className="stat-cell">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                                </svg> 20%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a href="https://javascript.com" target="_blank" rel="noreferrer">javascript.com</a></td>
                                            <td className="stat-cell">24</td>
                                            <td className="stat-cell">-</td>
                                        </tr>
                                        <tr>
                                            <td><a href="https://github.com" target="_blank" rel="noreferrer">github.com</a></td>
                                            <td className="stat-cell">17</td>
                                            <td className="stat-cell">15%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions row */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-4">
                    <div className="app-card app-card-basic d-flex flex-column align-items-start shadow-sm h-100">
                        <div className="app-card-header p-3 border-bottom-0">
                            <div className="row align-items-center gx-3">
                                <div className="col-auto">
                                    <div className="app-icon-holder">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                                            <path fillRule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <h4 className="app-card-title">Invoices</h4>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body px-4">
                            <div className="intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet eros vel diam semper mollis.</div>
                        </div>
                        <div className="app-card-footer p-4 mt-auto">
                            <Link className="btn app-btn-secondary" to="/orders">Create New</Link>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="app-card app-card-basic d-flex flex-column align-items-start shadow-sm h-100">
                        <div className="app-card-header p-3 border-bottom-0">
                            <div className="row align-items-center gx-3">
                                <div className="col-auto">
                                    <div className="app-icon-holder">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-code-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                            <path fillRule="evenodd" d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <h4 className="app-card-title">Apps</h4>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body px-4">
                            <div className="intro">Pellentesque varius, elit vel volutpat sollicitudin, lacus quam efficitur augue vitae elit.</div>
                        </div>
                        <div className="app-card-footer p-4 mt-auto">
                            <Link className="btn app-btn-secondary" to="/docs">Create New</Link>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="app-card app-card-basic d-flex flex-column align-items-start shadow-sm h-100">
                        <div className="app-card-header p-3 border-bottom-0">
                            <div className="row align-items-center gx-3">
                                <div className="col-auto">
                                    <div className="app-icon-holder">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-tools" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M0 1l1-1 3.081 2.2a1 1 0 0 1 .419.815v.07a1 1 0 0 1-.285.698l-1.414 1.414a1 1 0 0 1-.707.293h-.07a1 1 0 0 1-.814-.419L0 1zm12.354 12.354l-3-3a.5.5 0 0 1 .708-.708l3 3a.5.5 0 0 1-.708.708z"/>
                                            <path fillRule="evenodd" d="M9.854 4.854l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708.708zM14 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <h4 className="app-card-title">Tools</h4>
                                </div>
                            </div>
                        </div>
                        <div className="app-card-body px-4">
                            <div className="intro">Sed tincidunt, magna ut vehicula volutpat, turpis diam condimentum justo, rem ipsam.</div>
                        </div>
                        <div className="app-card-footer p-4 mt-auto">
                            <Link className="btn app-btn-secondary" to="/settings">Create New</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

