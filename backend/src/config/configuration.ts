export default () => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const CELLS_AVAILABLE = Number(process.env.CELLS_AVAILABLE ?? 10);
  const SECONDS_TIME_OUT = Number(process.env.SECONDS_TIME_OUT ?? 60);
  const UPCOMING_CELLS_TIME_OUT = SECONDS_TIME_OUT * 1000;
  const BOARD_SIZE = Number(process.env.BOARD_SIZE ?? 100);

  return {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '8080', 10),
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    backendUrl,
    frontendUrl,
    callbackURL: `${backendUrl}/auth/google/callback`,
    CELLS_AVAILABLE,
    UPCOMING_CELLS_TIME_OUT,
    BOARD_SIZE,
  };
};
