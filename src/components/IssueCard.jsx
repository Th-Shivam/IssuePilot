function IssueCard({ title, repo, difficulty, githubUrl }) {
    // Helper to determine badge color class
    const getBadgeClass = (difficulty) => {
        const diff = difficulty.toLowerCase();
        if (diff.includes('good') || diff.includes('beginner') || diff.includes('easy')) return 'badge-easy';
        if (diff.includes('help') || diff.includes('medium')) return 'badge-medium';
        if (diff.includes('hard')) return 'badge-hard';
        return 'badge-default';
    };

    return (
        <div className="issue-card">
            <h3 className="issue-title">
                {title}
            </h3>
            <div className="issue-repo">
                <span>📦</span> {repo}
            </div>

            <div className="labels">
                <span className={`label ${getBadgeClass(difficulty)}`}>
                    {difficulty}
                </span>
            </div>

            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="view-btn">
                View Issue <span style={{ marginLeft: '6px' }}>↗</span>
            </a>
        </div>
    );
}

export default IssueCard;
