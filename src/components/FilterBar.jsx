/**
 * FilterBar Component
 * Control panel for filtering the issue list by stack and difficulty.
 */
function FilterBar({ filters, onFilterChange }) {

    // Configuration for dropdown options
    const stacks = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'react', label: 'React' },
        { value: 'python', label: 'Python' },
        { value: 'go', label: 'Go' }
    ];

    const difficulties = [
        { value: 'good first issue', label: 'Good First Issue' },
        { value: 'help wanted', label: 'Help Wanted' },
        { value: 'beginner', label: 'Beginner' }
    ];

    return (
        <div className="filter-bar">
            {/* Tech Stack Filter */}
            <div className="filter-group">
                <label className="filter-label">Tech Stack</label>
                <div className="select-wrapper">
                    <select
                        value={filters.language}
                        onChange={(e) => onFilterChange('language', e.target.value)}
                    >
                        {stacks.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Difficulty Filter */}
            <div className="filter-group">
                <label className="filter-label">Difficulty</label>
                <div className="select-wrapper">
                    <select
                        value={filters.label}
                        onChange={(e) => onFilterChange('label', e.target.value)}
                    >
                        {difficulties.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button className="btn-search" title="Refresh List" onClick={() => window.location.reload()}>
                <span>Refresh</span>
            </button>
        </div>
    );
}

export default FilterBar;
