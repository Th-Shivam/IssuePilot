import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import IssueList from '../components/IssueList';

function ExplorePage() {
    const [filters, setFilters] = useState({
        language: 'all',
        label: 'all',
        gsocOnly: false
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="container page-transition" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: '700' }}>Explore Open Source Opportunities</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Find GitHub issues that match your skills and start contributing.
                </p>
            </div>
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <IssueList filters={filters} />
        </div>
    );
}

export default ExplorePage;
