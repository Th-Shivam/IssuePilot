/**
 * FilterBar Component
 * Control panel for filtering the issue list by stack and difficulty.
 */
function FilterBar({ filters, onFilterChange }) {

    // Configuration for dropdown options
    const stacks = [
        { value: 'all', label: 'All Technologies' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'react', label: 'React' },
        { value: 'python', label: 'Python' },
        { value: 'go', label: 'Go' },
        { value: 'java', label: 'Java' },
        { value: 'rust', label: 'Rust' }
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
