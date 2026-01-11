import { useState, useEffect } from 'react';
import IssueCard from './IssueCard';
import { dummyIssues } from '../data/dummyIssues';

function IssueList({ filters }) {
    // State to hold the filtering results
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Data Source Abstraction ---
    const USE_REAL_API = true; // Switched to true for API integration

    // Mock API Fetcher
    const fetchFromDummy = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const results = dummyIssues.filter(issue => {
                    const stackMatch = filters.language === 'all' ||
                        issue.techStack.toLowerCase() === filters.language.toLowerCase();

                    let difficultyMatch = true;
                    if (filters.label !== 'all') {
                        if (filters.label === 'good first issue' || filters.label === 'help wanted') {
                            difficultyMatch = issue.labels.includes(filters.label);
                        } else {
                            difficultyMatch = issue.difficulty.toLowerCase() === filters.label.toLowerCase();
                        }
                    }
                    return stackMatch && difficultyMatch;
                });
                resolve(results);
            }, 1200); // Simulated delay
        });
    };

    // Real API Fetcher
    const fetchFromAPI = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
            console.warn('VITE_API_URL is not defined in .env');
            return [];
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Client-side filtering (since our basic Lambda returns everything)
            return data.filter(issue => {
                const stackMatch = filters.language === 'all' ||
                    issue.techStack.toLowerCase() === filters.language.toLowerCase();

                let difficultyMatch = true;
                if (filters.label !== 'all') {
                    if (filters.label === 'good first issue' || filters.label === 'help wanted') {
                        difficultyMatch = issue.labels.includes(filters.label);
                    } else {
                        difficultyMatch = issue.difficulty.toLowerCase() === filters.label.toLowerCase();
                    }
                }
                return stackMatch && difficultyMatch;
            });
        } catch (error) {
            console.error("API Fetch Error:", error);
            throw error; // Re-throw to be caught by the main effect
        }
    };

    // Effect to filter issues whenever filters change
    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const data = USE_REAL_API ? await fetchFromAPI() : await fetchFromDummy();
                setIssues(data);
            } catch (error) {
                console.error("Failed to fetch issues:", error);
                setIssues([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    // Loading State (Skeleton)
    if (loading) {
        return (
            <div className="issue-list-container">
                <div className="list-meta" style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Scanning deep space...
                </div>
                <div className="issue-list">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="issue-card skeleton-card">
                            <div className="skeleton-line title-line"></div>
                            <div className="skeleton-line repo-line"></div>
                            <div className="skeleton-badges">
                                <div className="skeleton-badge"></div>
                                <div className="skeleton-badge"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Empty State
    if (issues.length === 0) {
        return (
            <div className="empty-state">
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔭</span>
                <h3>No signals found</h3>
                <p>Try changing filters or explore a new tech stack.<br />Your first contribution is out there!</p>
            </div>
        );
    }

    // Results State
    return (
        <div className="issue-list-container">
            <div className="list-meta" style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                Found {issues.length} {issues.length === 1 ? 'mission' : 'missions'}
            </div>

            <div className="issue-list">
                {issues.map(issue => (
                    <IssueCard
                        key={issue.id}
                        title={issue.title}
                        repo={issue.repository}
                        difficulty={issue.difficulty}
                        githubUrl={issue.githubUrl}
                    />
                ))}
            </div>
        </div>
    );
}

export default IssueList;
