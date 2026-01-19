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
            <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label
                    htmlFor="gsoc-toggle"
                    className="filter-label"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                >
                    <input
                        id="gsoc-toggle"
                        type="checkbox"
                        checked={filters.gsocOnly || false}
                        onChange={(e) => onFilterChange('gsocOnly', e.target.checked)}
                        style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            accentColor: 'var(--accent-primary)'
                        }}
                    />
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        GSoC Organizations Only
                        <span style={{
                            fontSize: '0.7rem',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            color: 'white',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}>
                            NEW
                        </span>
                    </span>
                </label>
            </div>

            <button className="btn-search" title="Refresh List" onClick={() => window.location.reload()}>
                <span>Refresh</span>
            </button>
        </div>
    );
}

export default FilterBar;
