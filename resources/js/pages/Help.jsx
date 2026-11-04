import React, { useState } from 'react';

export default function Help() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState('faq1-1');

    const toggleAccordion = (id) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    const faqs = [
        {
            id: 'faq1-1',
            category: 'Product',
            question: 'How do I customize the Portal theme and colors?',
            answer: 'You can customize all variables in the SCSS files or override CSS rules in resources/css/app.css. The template is built on Bootstrap 5 utility classes.'
        },
        {
            id: 'faq1-2',
            category: 'Product',
            question: 'Can I connect multiple databases in Laravel?',
            answer: 'Yes! Laravel supports multiple database connections out of the box. You can configure them in config/database.php and specify connections on models with protected $connection = "other_db";'
        },
        {
            id: 'faq1-3',
            category: 'Product',
            question: 'How does React interact with Laravel in this project?',
            answer: 'React is powered by Vite. The backend exposes clean REST API endpoints in routes/web.php under /api, which React fetches via Axios with CSRF protection.'
        },
        {
            id: 'faq2-1',
            category: 'Account & Billing',
            question: 'Where can I update my billing email and credit card?',
            answer: 'Head over to the Settings or Account section from the top-right profile menu to manage your credentials, notifications, and subscription plan.'
        },
        {
            id: 'faq2-2',
            category: 'Account & Billing',
            question: 'What is the refund and cancellation policy?',
            answer: 'You can cancel anytime directly from your settings. Upon cancellation, your account remains active until the end of your billing cycle.'
        }
    ];

    const filteredFaqs = faqs.filter(f => 
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container-xl">
            <h1 className="app-page-title">Help Center</h1>

            {/* Search Help */}
            <div className="app-card shadow-sm p-4 mb-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 text-center">
                        <h3 className="mb-3">How can we help you today?</h3>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search questions, keywords, or topics..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn app-btn-primary" type="button">
                                <i className="fa-solid fa-magnifying-glass me-1"></i> Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product FAQs */}
            <div className="app-card app-card-accordion shadow-sm mb-4">
                <div className="app-card-header p-4 pb-2 border-0">
                    <h4 className="app-card-title">Frequently Asked Questions</h4>
                </div>
                <div className="app-card-body p-4 pt-0">
                    <div className="faq-accordion accordion">
                        {filteredFaqs.map((faq) => (
                            <div className="accordion-item mb-2" key={faq.id}>
                                <h2 className="accordion-header">
                                    <button 
                                        className={`accordion-button btn btn-link ${openIndex === faq.id ? '' : 'collapsed'}`} 
                                        type="button" 
                                        onClick={() => toggleAccordion(faq.id)}
                                    >
                                        <span className="badge bg-secondary me-2">{faq.category}</span>
                                        {faq.question}
                                    </button>
                                </h2>
                                <div className={`accordion-collapse collapse ${openIndex === faq.id ? 'show' : ''}`}>
                                    <div className="accordion-body text-start p-3 text-muted">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Help Callouts */}
            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <div className="app-card app-card-basic d-flex flex-column align-items-start shadow-sm h-100 p-4">
                        <div className="app-icon-holder mb-3">
                            <i className="fa-solid fa-headset fa-xl text-primary"></i>
                        </div>
                        <h4 className="app-card-title mb-2">Need 24/7 Dedicated Support?</h4>
                        <p className="text-muted">Our enterprise support engineers are available round the clock to help you debug and scale your installation.</p>
                        <a className="btn app-btn-primary mt-auto" href="mailto:support@example.com">Contact Support</a>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="app-card app-card-basic d-flex flex-column align-items-start shadow-sm h-100 p-4">
                        <div className="app-icon-holder mb-3">
                            <i className="fa-solid fa-book fa-xl text-primary"></i>
                        </div>
                        <h4 className="app-card-title mb-2">Explore Documentation</h4>
                        <p className="text-muted">Review comprehensive guides, code architecture tutorials, and responsive Bootstrap 5 component references.</p>
                        <a className="btn app-btn-secondary mt-auto" href="https://themes.3rdwavemedia.com" target="_blank" rel="noreferrer">Open Docs</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

