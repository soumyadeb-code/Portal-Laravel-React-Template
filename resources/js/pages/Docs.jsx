import React, { useState } from 'react';

const initialDocs = [
    { id: 1, title: 'Project specification brief', type: 'Text', size: '512KB', uploaded: '3 mins ago', isNew: true, iconClass: 'fas fa-file-alt text-file', color: 'text-file' },
    { id: 2, title: 'Financial Q3 statement', type: 'Spreadsheet', size: '2.4MB', uploaded: '1 hour ago', isNew: false, iconClass: 'fas fa-file-excel text-file', color: 'text-file' },
    { id: 3, title: 'Marketing brand assets', type: 'Zip file', size: '18MB', uploaded: '1 day ago', isNew: true, iconClass: 'fas fa-file-archive text-file', color: 'text-file' },
    { id: 4, title: 'Keynote Investor Pitch', type: 'Presentation', size: '8.6MB', uploaded: '2 days ago', isNew: false, iconClass: 'fas fa-file-powerpoint text-file', color: 'text-file' },
    { id: 5, title: 'High-res team photo banner', type: 'Image', size: '4.2MB', uploaded: '3 days ago', isNew: false, iconClass: 'fas fa-file-image text-file', color: 'text-file' },
    { id: 6, title: 'Software architecture diagram', type: 'Image', size: '1.1MB', uploaded: '5 days ago', isNew: false, iconClass: 'fas fa-file-image text-file', color: 'text-file' },
    { id: 7, title: 'User interview transcripts', type: 'Text', size: '256KB', uploaded: '1 week ago', isNew: false, iconClass: 'fas fa-file-alt text-file', color: 'text-file' },
    { id: 8, title: 'Client signed agreement', type: 'Text', size: '780KB', uploaded: '2 weeks ago', isNew: false, iconClass: 'fas fa-file-pdf text-file', color: 'text-file' },
];

export default function Docs() {
    const [docs, setDocs] = useState(initialDocs);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [newDocTitle, setNewDocTitle] = useState('');
    const [newDocType, setNewDocType] = useState('Text');

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!newDocTitle) return;
        const newDoc = {
            id: Date.now(),
            title: newDocTitle,
            type: newDocType,
            size: `${Math.floor(Math.random() * 900 + 100)}KB`,
            uploaded: 'Just now',
            isNew: true,
            iconClass: newDocType === 'Image' ? 'fas fa-file-image' : newDocType === 'Spreadsheet' ? 'fas fa-file-excel' : 'fas fa-file-alt',
        };
        setDocs([newDoc, ...docs]);
        setNewDocTitle('');
        setShowUploadModal(false);
    };

    const handleDelete = (id) => {
        setDocs(docs.filter(d => d.id !== id));
    };

    const filteredDocs = docs.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || doc.type.toLowerCase() === typeFilter.toLowerCase();
        return matchesSearch && matchesType;
    });

    return (
        <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">My Docs</h1>
                </div>
                <div className="col-auto">
                    <div className="page-utilities">
                        <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                            <div className="col-auto">
                                <form className="docs-search-form row gx-1 align-items-center" onSubmit={handleSearch}>
                                    <div className="col-auto">
                                        <input 
                                            type="text" 
                                            className="form-control search-docs" 
                                            placeholder="Search docs..."
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
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                >
                                    <option value="All">All Types</option>
                                    <option value="Text">Text file</option>
                                    <option value="Image">Image</option>
                                    <option value="Spreadsheet">Spreadsheet</option>
                                    <option value="Presentation">Presentation</option>
                                    <option value="Zip file">Zip file</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <button className="btn app-btn-primary" onClick={() => setShowUploadModal(true)}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-upload me-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path fillRule="evenodd" d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                    </svg>
                                    Upload File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {filteredDocs.map((doc) => (
                    <div className="col-6 col-md-4 col-xl-3 col-xxl-2" key={doc.id}>
                        <div className="app-card app-card-doc shadow-sm h-100">
                            <div className="app-card-thumb-holder p-3 text-center">
                                <span className="icon-holder">
                                    <i className={`${doc.iconClass} fa-2x text-primary`}></i>
                                </span>
                                {doc.isNew && <span className="badge bg-success ms-2">NEW</span>}
                            </div>
                            <div className="app-card-body p-3 has-card-actions">
                                <h4 className="app-doc-title truncate mb-0" title={doc.title}>
                                    <a href="#" onClick={(e) => e.preventDefault()}>{doc.title}</a>
                                </h4>
                                <div className="app-doc-meta">
                                    <ul className="list-unstyled mb-0">
                                        <li><span className="text-muted">Type:</span> {doc.type}</li>
                                        <li><span className="text-muted">Size:</span> {doc.size}</li>
                                        <li><span className="text-muted">Uploaded:</span> {doc.uploaded}</li>
                                    </ul>
                                </div>
                                <div className="app-card-actions mt-2 text-end">
                                    <button 
                                        className="btn btn-sm btn-outline-danger" 
                                        onClick={() => handleDelete(doc.id)} 
                                        title="Delete document"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow">
                            <form onSubmit={handleUpload}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Upload New Document</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowUploadModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Document Title</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={newDocTitle}
                                            onChange={(e) => setNewDocTitle(e.target.value)}
                                            placeholder="e.g. Q4 Growth Report"
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Document Type</label>
                                        <select 
                                            className="form-select"
                                            value={newDocType}
                                            onChange={(e) => setNewDocType(e.target.value)}
                                        >
                                            <option value="Text">Text file</option>
                                            <option value="Image">Image</option>
                                            <option value="Spreadsheet">Spreadsheet</option>
                                            <option value="Presentation">Presentation</option>
                                            <option value="Zip file">Zip file</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Select File</label>
                                        <input type="file" className="form-control" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn app-btn-secondary" onClick={() => setShowUploadModal(false)}>Cancel</button>
                                    <button type="submit" className="btn app-btn-primary">Upload</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

