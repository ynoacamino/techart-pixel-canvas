export default () => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
  return {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || "8080", 10),
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    callbackURL: `${backendUrl}/auth/google/callback`,
  }
};