declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        NODE_ENV: 'development' | 'prod' | 'test' | 'production';
        JWT_ACCESS_TOKEN_SECRET: string; // need to be a secret key

        DATABASE_URL: string; // postgres://user:password@localhost:5432/db
        POSTGRES_HOST: string;
        POSTGRES_PORT: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_DB: string;
    }
}
