export default () => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  return {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '8080', 10),
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    backendUrl,
    frontendUrl,
    callbackURL: `${backendUrl}/auth/google/callback`,
  };
};

export const CELLS_AVAILABLE = 10;
export const UPCOMING_CELLS_TIME_OUT = 1000 * 60;
