export const handler = async (event) => {
  // 1. Headers for CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
  };

  try {
    // 2. Parse Query Parameters
    // API Gateway passes query params in event.queryStringParameters
    const params = event.queryStringParameters || {};
    const language = params.language || 'javascript'; // Default to javascript
    const state = params.state || 'open';

    // 3. Construct GitHub Search Query
    // Example: "language:javascript state:open type:issue label:\"good first issue\""
    const query = `language:${language} state:${state} type:issue label:"good first issue"`;
    const encodedQuery = encodeURIComponent(query);
    
    // 4. GitHub API URL
    const githubUrl = `https://api.github.com/search/issues?q=${encodedQuery}&sort=updated&order=desc&per_page=10`;

    // 5. Fetch from GitHub
    // Note: Node.js 18 has native fetch
    const token = process.env.GITHUB_TOKEN; // Read from Environment Variables
    const requestHeaders = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'IssuePilot-Lambda' // GitHub requires a User-Agent
    };

    // Add Authorization if token exists (Recommended to avoid rate limits)
    if (token) {
      requestHeaders['Authorization'] = `token ${token}`;
    }

    const response = await fetch(githubUrl, { headers: requestHeaders });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error:', errorText);
      return {
        statusCode: response.status,
        headers: headers,
        body: JSON.stringify({ message: "Failed to fetch from GitHub", error: errorText })
      };
    }

    const data = await response.json();

    // 6. Map to Simplified Format
    const issues = data.items.map(item => ({
      id: item.id,
      title: item.title,
      repository: item.repository_url.split('repos/')[1], // Extract "owner/repo"
      techStack: language, // Identify stack by the query
      difficulty: "Beginner", // Assumed based on label query
      labels: item.labels.map(l => l.name),
      githubUrl: item.html_url
    }));

    // 7. Return Success Response
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(issues),
    };

  } catch (error) {
    console.error('Lambda Error:', error);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message
      }),
    };
  }
};
