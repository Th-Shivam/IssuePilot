/**
 * FilterBar Component
 * Control panel for filtering the issue list by stack and difficulty.
 */
function FilterBar({ filters, onFilterChange }) {

    // Configuration for dropdown options
    const stacks = [
        { value: 'all', label: 'All Technologies' }
    ];

    const difficulties = [
        { value: 'all', label: 'All Levels' },
        { value: 'beginner', label: 'Beginner / Good First Issue' },
        { value: 'medium', label: 'Medium / Help Wanted' },
        { value: 'hard', label: 'Hard / Bug' }
    ];

    return (
        <div className="filter-bar">
            {/* Tech Stack Filter */}
            <div className="filter-group">
                <label className="filter-label">
                    Tech Stack
                    <span style={{
                        marginLeft: '8px',
                        fontSize: '0.75rem',
                        color: 'var(--accent-primary)',
                        fontWeight: '500',
                        opacity: '0.8'
                    }}>
                        (Coming Soon)
                    </span>
                </label>
                <div className="select-wrapper">
                    <select
                        value={filters.language}
                        disabled
                        style={{
                            cursor: 'not-allowed',
                            opacity: '0.6',
                            backgroundColor: 'var(--bg-secondary)'
                        }}
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

            {/* GSoC Organizations Filter */}
            <div className="filter-group gsoc-filter-group">
                <label className="filter-label" style={{ marginBottom: '8px' }}>
                    GSoC Organizations
                </label>
                <label className="toggle-switch-container">
                    <input
                        id="gsoc-toggle"
                        type="checkbox"
                        checked={filters.gsocOnly || false}
                        onChange={(e) => onFilterChange('gsocOnly', e.target.checked)}
                        className="toggle-input"
                    />
                    <div className="toggle-switch">
                        <div className="toggle-slider"></div>
                        <span className="toggle-label toggle-label-off">All</span>
                        <span className="toggle-label toggle-label-on">GSoC</span>
                    </div>
                    <span className="gsoc-new-badge">NEW</span>
                </label>
            </div>

            <button className="btn-search" title="Refresh List" onClick={() => window.location.reload()}>
                <span>Refresh</span>
            </button>
        </div>
    );
}

export default FilterBar;
