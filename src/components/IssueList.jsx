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

                // Apply GSoC filter if enabled
                let filteredData = data;
                if (filters.gsocOnly) {
                    filteredData = data.filter(issue => issue.isGSoC === true);
                }

                setIssues(filteredData);
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
            {/* GSoC Disclaimer Banner - Premium Professional Design */}
            {filters.gsocOnly && (
                <div style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.12), rgba(255, 152, 0, 0.08))',
                    border: '1.5px solid rgba(255, 193, 7, 0.35)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    marginBottom: '28px',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px rgba(255, 193, 7, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                    animation: 'slideInDown 0.4s ease-out'
                }}>
                    {/* Decorative top gradient line */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #FFC107, #FF9800, #FFC107)',
                        backgroundSize: '200% 100%'
                    }} />

                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px'
                    }}>
                        {/* Icon Container with premium styling */}
                        <div style={{
                            flexShrink: 0,
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.25), rgba(255, 152, 0, 0.25))',
                            border: '1px solid rgba(255, 193, 7, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: '#FFC107',
                            boxShadow: '0 4px 12px rgba(255, 193, 7, 0.2)'
                        }}>
                            !
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '10px'
                            }}>
                                <h4 style={{
                                    margin: 0,
                                    color: '#FFC107',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    letterSpacing: '0.3px',
                                    textShadow: '0 2px 8px rgba(255, 193, 7, 0.3)'
                                }}>
                                    GSoC Organizations Filter Active
                                </h4>
                                <span style={{
                                    fontSize: '0.7rem',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    background: 'rgba(255, 193, 7, 0.2)',
                                    border: '1px solid rgba(255, 193, 7, 0.4)',
                                    color: '#FFD54F',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Info
                                </span>
                            </div>

                            <p style={{
                                margin: 0,
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.9rem',
                                lineHeight: '1.6',
                                fontWeight: '400'
                            }}>
                                Contributing to these organizations does <strong style={{
                                    color: '#FFC107',
                                    fontWeight: '700'
                                }}>not guarantee</strong> GSoC selection.
                                Selection depends on your <span style={{
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    fontWeight: '500'
                                }}>proposal quality, contribution history, and mentor evaluation</span>.
                                <br />
                                <span style={{
                                    display: 'inline-block',
                                    marginTop: '6px',
                                    color: '#FFD54F',
                                    fontSize: '0.85rem',
                                    fontStyle: 'italic'
                                }}>
                                    Tip: Focus on meaningful contributions to projects you're passionate about!
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
