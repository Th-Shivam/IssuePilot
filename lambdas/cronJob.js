import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// GSoC Organizations List (GitHub organization names)
// Update this list annually when new GSoC organizations are announced
const GSOC_ORGANIZATIONS = [
    'python', 'django', 'flask', 'pytorch', 'tensorflow', 'scikit-learn',
    'numpy', 'pandas-dev', 'matplotlib', 'nodejs', 'expressjs', 'reactjs',
    'vuejs', 'angular', 'webpack', 'kubernetes', 'docker', 'apache',
    'mozilla', 'chromium', 'linux', 'mongodb', 'postgresql', 'redis',
    'mariadb', 'git', 'gitlab-org', 'github', 'openai', 'huggingface',
    'keras-team', 'cncf', 'openfaas', 'istio', 'flutter',
    'react-native-community', 'jupyter', 'apache-spark', 'owasp',
    'freecodecamp', 'oppia', 'publiclab', 'spring-projects', 'twbs',
    'tailwindlabs', 'socketio', 'airbnb', 'reduxjs', 'vercel'
];

/**
 * Check if a repository belongs to a GSoC organization
 * @param {string} repositoryUrl - GitHub API repository URL
 * @returns {boolean} - True if the organization is in the GSoC list
 */
const isGSoCOrganization = (repositoryUrl) => {
    if (!repositoryUrl || typeof repositoryUrl !== 'string') {
        return false;
    }
    
    // Extract org name from URL like "https://api.github.com/repos/tensorflow/tensorflow"
    const match = repositoryUrl.match(/repos\/([^\/]+)\//);
    if (!match || !match[1]) {
        return false;
    }
    
    const orgName = match[1].toLowerCase();
    return GSOC_ORGANIZATIONS.includes(orgName);
};

const classifyIssue = (issue) => {
    const title = (issue.title || "").toLowerCase();
    const body = (issue.body || "").toLowerCase();
    const labels = (issue.labels || []).map(l => l.name.toLowerCase());
    const labelCount = labels.length;

    // 1. HARD
    const hardLabels = ["bug", "performance", "architecture", "security"];
    const hardKeywords = ["optimize", "performance", "memory", "crash", "scalability"];
    if (labels.some(l => hardLabels.some(hl => l.includes(hl))) || 
        hardKeywords.some(w => title.includes(w) || body.includes(w)) || 
        labelCount >= 4) {
        return "Hard";
    }

    // 2. BEGINNER
    const beginnerLabels = ["good first issue", "beginner", "easy"];
    const beginnerKeywords = ["easy", "starter", "beginner"];
    if (labels.some(l => beginnerLabels.some(bl => l.includes(bl))) || 
        (beginnerKeywords.some(w => title.includes(w) || body.includes(w)) && labelCount <= 2)) {
        return "Beginner";
    }

    // 3. MEDIUM
    return "Medium";
};

export const handler = async (event) => {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const TABLE_NAME = "IssuePilotIssues"; 
    
    if (!GITHUB_TOKEN) {
        console.error("Missing GITHUB_TOKEN");
        return { statusCode: 500, body: "Error: Missing GITHUB_TOKEN" };
    }

    const pagesToFetch = 2; 
    const resultsPerPage = 100;
    let allIssues = [];

    // Query: Open, unassigned issues with specific labels
    const query = encodeURIComponent('is:issue is:open no:assignee label:"good first issue","help wanted",bug,enhancement');

    console.log(`Starting fetch (Pages: ${pagesToFetch})...`);

    for (let page = 1; page <= pagesToFetch; page++) {
        try {
            const url = `https://api.github.com/search/issues?q=${query}&per_page=${resultsPerPage}&page=${page}`;
            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "IssuePilot-Cron"
                }
            });

            if (!response.ok) {
                console.error(`Page ${page} failed: ${response.status}`);
                if (response.status === 403) break; 
                continue;
            }

            const data = await response.json();
            const issues = data.items || [];
            allIssues = allIssues.concat(issues);
            
            // 4s delay to respect rate limits
            await new Promise(resolve => setTimeout(resolve, 4000));

        } catch (error) {
            console.error(`Fetch error page ${page}:`, error);
        }
    }

    if (allIssues.length === 0) {
        console.log("No issues fetched.");
        return { statusCode: 200, body: "No issues." };
    }

    // --- DynamoDB Write (Upsert / De-duplication) ---
    const now = Date.now();
    // TTL: 24 Hours (24 * 60 * 60 seconds)
    const expiry = Math.floor(now / 1000) + 86400; 
    const stats = { Beginner: 0, Medium: 0, Hard: 0 };

    // Valid items only (ensure category/issueId exist)
    const dbItems = allIssues
        .map(issue => {
            if (!issue.id) return null;
            
            const category = classifyIssue(issue);
            stats[category]++;

            // Debug: Check GSoC detection
            const gsocStatus = isGSoCOrganization(issue.repository_url);
            const repoName = issue.repository_url ? issue.repository_url.replace("https://api.github.com/repos/", "") : "unknown";
            console.log(`[GSoC Debug] Repo: ${repoName}, isGSoC: ${gsocStatus}`);

            return {
                PutRequest: {
                    Item: {
                        category: category, 
                        issueId: issue.id.toString(),
                        title: issue.title || "No Title",
                        repository: repoName,
                        techStack: "Unknown", 
                        labels: issue.labels ? issue.labels.map(l => l.name) : [],
                        isGSoC: gsocStatus,
                        githubUrl: issue.html_url || "",
                        fetchedAt: now,
                        ttl: expiry
                    }
                }
            };
        })
        .filter(item => item !== null);

    // Batch Write (Max 25 items)
    let savedCount = 0;
    const chunkSize = 25;
    
    for (let i = 0; i < dbItems.length; i += chunkSize) {
        const chunk = dbItems.slice(i, i + chunkSize);
        try {
            await docClient.send(new BatchWriteCommand({
                RequestItems: { [TABLE_NAME]: chunk }
            }));
            savedCount += chunk.length;
        } catch (err) {
            console.error(`Batch write error at index ${i}:`, err.message);
        }
    }

    console.log(`Summary: Fetched ${allIssues.length}, Saved ${savedCount}. Stats: ${JSON.stringify(stats)}`);

    return {
        statusCode: 200,
        body: JSON.stringify({ saved: savedCount, stats })
    };
};
