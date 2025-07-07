interface DatabaseConfig {
  id: string;
}

interface ContainerConfig {
  id: string;
}

interface Config {
  endpoint: string;
  key: string;
  database: DatabaseConfig;
}

const config: Config = {
  endpoint: process.env.COSMOS_ENDPOINT || 'https://bachelors.documents.azure.com:443/',
  key: process.env.COSMOS_KEY || '0Zd3B6ssDdIa0YkE9NymkNLRB6A6NEYo59Etf7ZvnhQWYEWjJEf4H6i3Q4smPEJJeC0Ygx8tqHqdACDbZGmYXA==',
  database: {
    id: process.env.COSMOS_DATABASE_NAME || 'Bachelors',
  },
};

export default config;

