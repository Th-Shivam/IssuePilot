import { useState, useEffect } from 'react';
import IssueCard from './IssueCard';
import { dummyIssues } from '../data/dummyIssues';
import { apiCall } from '../services/api';

function IssueList({ filters }) {
    // State to hold the filtering results
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

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
        try {
            // 1. Map Frontend Filters to Backend Params
            let categoriesToFetch = [];
            const label = filters.label.toLowerCase().trim();
            const language = filters.language.toLowerCase().trim();

            // Map 'label' filter to Backend 'category'
            if (label === 'all' || label === 'all levels') {
                categoriesToFetch = ['Beginner', 'Medium', 'Hard'];
            } else if (['good first issue', 'beginner', 'easy'].includes(label)) {
                categoriesToFetch = ['Beginner'];
            } else if (['help wanted', 'enhancement', 'medium'].includes(label)) {
                categoriesToFetch = ['Medium'];
            } else if (['bug', 'performance', 'hard'].includes(label)) {
                categoriesToFetch = ['Hard'];
            } else {
                categoriesToFetch = ['Medium']; // Default fallback
            }

            // Map 'language' filter to Backend 'techStack'
            const techStack = (language === 'all' || language === 'all technologies') ? null : filters.language;

            // 2. Fetch Data (Parallel for 'all' categories)
            const promises = categoriesToFetch.map(category => {
                const params = new URLSearchParams();
                params.append('category', category);
                if (techStack) params.append('techStack', techStack);

                return apiCall(`/Issues?${params.toString()}`);
            });

            const responses = await Promise.all(promises);

            // 3. Merge & Flatten Results
            // Each response is { count: N, items: [...] }
            const allItems = responses.flatMap(res => res?.items || []);

            return allItems;

        } catch (error) {
            console.error("API Fetch Error:", error);
            throw error;
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
    // Calculate pagination logic
    const totalPages = Math.ceil(issues.length / ITEMS_PER_PAGE);
    const indexOfLastIssue = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstIssue = indexOfLastIssue - ITEMS_PER_PAGE;
    const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top of list smoothly
        window.scrollTo({ top: 100, behavior: 'smooth' });
    };

    return (
        <div className="issue-list-container">
            <div className="list-meta" style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                Found {issues.length} {issues.length === 1 ? 'mission' : 'missions'}
            </div>

            <div className="issue-list">
                {currentIssues.map((issue, index) => (
                    <IssueCard
                        key={issue.issueId || index}
                        title={issue.title}
                        repo={issue.repository}
                        difficulty={issue.category || "Medium"}
                        githubUrl={issue.githubUrl}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="pagination-controls" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '3rem'
                }}>
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === 1 ? 0.5 : 1,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Previous
                    </button>

                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Page <span style={{ color: 'white', fontWeight: 'bold' }}>{currentPage}</span> of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            opacity: currentPage === totalPages ? 0.5 : 1,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default IssueList;
