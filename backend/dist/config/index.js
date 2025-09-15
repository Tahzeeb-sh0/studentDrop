const defaultDb = process.env.DATABASE_URL || '';
export const config = {
    databaseUrl: defaultDb.trim().length > 0
        ? defaultDb
        : 'sqlite:./dev.sqlite',
    jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
