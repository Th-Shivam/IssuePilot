import IssueCard from './IssueCard';
import { useState, useEffect } from 'react';
import { apiCall } from '../services/api';

function IssueList({ filters }) {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIssues = async () => {
            setLoading(true);
            setError(null);
            try {
                const endpoint = `/issues?stack=${filters.language}&difficulty=${filters.label}`;
                const data = await apiCall(endpoint);
                setIssues(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, [filters]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                <div className="loading-spinner" style={{ marginBottom: '1rem', fontSize: '2rem' }}>🌀</div>
                <p>Searching the cosmos for issues...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <h3>Oops! Something went wrong.</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!loading && !error && issues.length === 0) {
        return (
            <div className="empty-state">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔭</div>
                <h3>No issues found yet</h3>
                <p>Try changing filters or explore a new tech stack.<br />Your first contribution is out there!</p>
            </div>
        );
    }

    return (
        <div className="issue-list">
            {issues.map(issue => (
                <IssueCard
                    key={issue.id}
                    title={issue.title}
                    repo={issue.repository_url ? issue.repository_url.split('repos/')[1] : (issue.repo || 'Unknown Repo')}
                    difficulty={issue.labels && issue.labels.length > 0 ? issue.labels[0].name : (issue.difficulty || 'Help Wanted')}
                    githubUrl={issue.html_url || issue.githubUrl}
                />
            ))}
        </div>
    );
}

export default IssueList;
