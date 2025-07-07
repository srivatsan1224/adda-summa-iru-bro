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
  endpoint: 'https://bachelors.documents.azure.com:443/',
  key: '0Zd3B6ssDdIa0YkE9NymkNLRB6A6NEYo59Etf7ZvnhQWYEWjJEf4H6i3Q4smPEJJeC0Ygx8tqHqdACDbZGmYXA==',
  database: {
    id: 'Bachelors',
  },
};


export default config;
