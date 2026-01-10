function FilterBar({ filters, onFilterChange }) {
    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label className="filter-label">Tech Stack</label>
                <div className="select-wrapper">
                    <select
                        value={filters.language}
                        onChange={(e) => onFilterChange('language', e.target.value)}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="react">React</option>
                        <option value="python">Python</option>
                        <option value="go">Go</option>
                    </select>
                </div>
            </div>

            <div className="filter-group">
                <label className="filter-label">Difficulty</label>
                <div className="select-wrapper">
                    <select
                        value={filters.label}
                        onChange={(e) => onFilterChange('label', e.target.value)}
                    >
                        <option value="good first issue">Good First Issue</option>
                        <option value="help wanted">Help Wanted</option>
                        <option value="beginner">Beginner</option>
                    </select>
                </div>
            </div>

            <button className="btn-search" title="Refresh List">
                <span>Search</span>
            </button>
        </div>
    );
}

export default FilterBar;
