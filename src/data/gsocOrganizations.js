/**
 * GSoC Organizations List
 * 
 * This file contains GitHub organization names that participate in Google Summer of Code.
 * 
 * HOW TO UPDATE THIS LIST MANUALLY (Once per year, around February-March):
 * 
 * Step 1: Visit the official GSoC website for the current year
 *         Example: https://summerofcode.withgoogle.com/programs/2025/organizations
 * 
 * Step 2: Browse through the organizations and find their GitHub organization names
 *         - Click on each organization's page
 *         - Look for their GitHub repository links
 *         - Extract the organization name (e.g., "tensorflow" from "github.com/tensorflow/...")
 * 
 * Step 3: Add new organizations to the array below
 *         - Keep the format: lowercase GitHub org name as a string
 *         - Maintain alphabetical order for easy maintenance
 *         - Remove organizations that are no longer participating (optional)
 * 
 * Step 4: Update the LAST_UPDATED constant below with the current date
 * 
 * ALTERNATIVE (Easier): Use the third-party API
 *         - Fetch from: https://api.gsocorganizations.dev/2025.json
 *         - Extract the GitHub org names from the JSON response
 *         - Copy them into this array
 * 
 * Last Updated: 2025-01-18
 * GSoC Year: 2024 (Sample data - update for 2025 when available)
 */

export const GSOC_ORGANIZATIONS = [
  // Popular GSoC Organizations (Sample - based on historical participation)
  
  // Programming Languages & Frameworks
  'python',
  'django',
  'flask',
  'pytorch',
  'tensorflow',
  'scikit-learn',
  'numpy',
  'pandas-dev',
  'matplotlib',
  
  // Web Development
  'nodejs',
  'expressjs',
  'reactjs',
  'vuejs',
  'angular',
  'webpack',
  
  // Operating Systems & Infrastructure
  'kubernetes',
  'docker',
  'apache',
  'mozilla',
  'chromium',
  'linux',
  
  // Databases
  'mongodb',
  'postgresql',
  'redis',
  'mariadb',
  
  // Version Control & DevOps
  'git',
  'gitlab-org',
  'github',
  
  // Machine Learning & AI
  'openai',
  'huggingface',
  'keras-team',
  
  // Cloud & Distributed Systems
  'cncf',
  'openfaas',
  'istio',
  
  // Mobile Development
  'flutter',
  'react-native-community',
  
  // Data Science
  'jupyter',
  'apache-spark',
  
  // Security
  'owasp',
  
  // Education & Community
  'freecodecamp',
  'oppia',
  'publiclab',
  
  // Add more organizations here as needed
];

/**
 * Metadata about this list
 */
export const GSOC_LIST_METADATA = {
  lastUpdated: '2025-01-18',
  gsocYear: 2024,
  totalOrganizations: GSOC_ORGANIZATIONS.length,
  source: 'Manual curation from GSoC official website',
  notes: 'This is sample data. Update with actual 2025 organizations when announced.'
};

/**
 * Helper function to check if a repository belongs to a GSoC organization
 * @param {string} repoFullName - Full repository name (e.g., "tensorflow/tensorflow")
 * @returns {boolean} - True if the organization is in the GSoC list
 */
export const isGSoCOrganization = (repoFullName) => {
  if (!repoFullName || typeof repoFullName !== 'string') {
    return false;
  }
  
  const orgName = repoFullName.split('/')[0].toLowerCase();
  return GSOC_ORGANIZATIONS.includes(orgName);
};

/**
 * Get all GSoC organizations
 * @returns {Array<string>} - Array of GitHub organization names
 */
export const getGSoCOrganizations = () => {
  return [...GSOC_ORGANIZATIONS]; // Return a copy to prevent mutations
};
