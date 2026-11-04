import React, { useEffect, useRef } from 'react';

export default function Charts() {
    const lineRef = useRef(null);
    const barRef = useRef(null);
    const pieRef = useRef(null);
    const doughnutRef = useRef(null);

    const instances = useRef({});

    useEffect(() => {
        if (!window.Chart) return;

        const chartColors = {
            green: '#75c181',
            blue: '#5b99ea',
            gray: '#a9b5c9',
            text: '#252930',
            border: '#e7e9ed'
        };

        // Area Line Chart
        if (lineRef.current) {
            if (instances.current.line) instances.current.line.destroy();
            instances.current.line = new window.Chart(lineRef.current.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Revenue Growth',
                        backgroundColor: 'rgba(117,193,129,0.2)',
                        borderColor: 'rgba(117,193,129, 0.8)',
                        fill: true,
                        data: [65, 59, 80, 81, 56, 55, 90],
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom', align: 'end' }
                    }
                }
            });
        }

        // Bar Chart
        if (barRef.current) {
            if (instances.current.bar) instances.current.bar.destroy();
            instances.current.bar = new window.Chart(barRef.current.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Visits',
                        backgroundColor: chartColors.blue,
                        borderColor: chartColors.blue,
                        borderWidth: 1,
                        maxBarThickness: 24,
                        data: [45, 78, 92, 60, 48, 88, 105]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom', align: 'end' }
                    }
                }
            });
        }

        // Pie Chart
        if (pieRef.current) {
            if (instances.current.pie) instances.current.pie.destroy();
            instances.current.pie = new window.Chart(pieRef.current.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Direct', 'Referral', 'Social Media'],
                    datasets: [{
                        backgroundColor: [chartColors.green, chartColors.blue, chartColors.gray],
                        data: [55, 30, 15]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        // Doughnut Chart
        if (doughnutRef.current) {
            if (instances.current.doughnut) instances.current.doughnut.destroy();
            instances.current.doughnut = new window.Chart(doughnutRef.current.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Desktop', 'Tablet', 'Mobile'],
                    datasets: [{
                        backgroundColor: [chartColors.blue, chartColors.green, chartColors.gray],
                        data: [60, 15, 25]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }

        return () => {
            Object.values(instances.current).forEach(chart => chart?.destroy());
        };
    }, []);

    return (
        <div className="container-xl">
            <h1 className="app-page-title">Charts & Analytics</h1>

            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <h4 className="app-card-title">Area Line Chart Demo</h4>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="chart-container">
                                <canvas ref={lineRef} id="chart-line"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <h4 className="app-card-title">Bar Chart Demo</h4>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="chart-container">
                                <canvas ref={barRef} id="chart-bar"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <h4 className="app-card-title">Pie Chart Demo</h4>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="chart-container">
                                <canvas ref={pieRef} id="chart-pie"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3">
                            <h4 className="app-card-title">Doughnut Chart Demo</h4>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="chart-container">
                                <canvas ref={doughnutRef} id="chart-doughnut"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

