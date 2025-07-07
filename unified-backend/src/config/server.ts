export const serverConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS 
    ? process.env.CORS_ALLOWED_ORIGINS.split(',')
    : [
        'http://localhost:5174',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://localhost:5000',
        'https://bachelors-web.vercel.app',
        'https://bachelors-preview.vercel.app'
      ],
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
};

export default serverConfig;

