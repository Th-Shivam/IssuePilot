import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import IssueList from '../components/IssueList';

function Explore() {
  const [filters, setFilters] = useState({
    language: 'all',
    label: 'all'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container" style={{ paddingTop: '120px' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>Explore Opportunities</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Find your next mission</p>
      </div>
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <IssueList filters={filters} />
    </div>
  );
}

export default Explore;
