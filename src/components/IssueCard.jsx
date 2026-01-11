/**
 * IssueCard Component
 * Displays individual issue details with a difficulty badge and link.
 */
function IssueCard({ title, repo, difficulty, githubUrl }) {

    // Determine badge color based on difficulty/label
    const getBadgeClass = (level) => {
        const lowerLevel = level.toLowerCase();
        if (['good', 'beginner', 'easy'].some(k => lowerLevel.includes(k))) return 'badge-easy';
        if (['help', 'medium'].some(k => lowerLevel.includes(k))) return 'badge-medium';
        if (['hard', 'advanced'].some(k => lowerLevel.includes(k))) return 'badge-hard';
        return 'badge-default';
    };

    return (
        <div className="issue-card">
            <h3 className="issue-title">{title}</h3>

            <div className="issue-repo">
                <span role="img" aria-label="repo">📦</span> {repo}
            </div>

            <div className="labels">
                <span className={`label ${getBadgeClass(difficulty)}`}>
                    {difficulty}
                </span>
            </div>

            <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
            >
                View Issue <span>↗</span>
            </a>
        </div>
    );
}

export default IssueCard;
