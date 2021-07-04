
function getEnv(env: string|undefined, defaultValue: string): string {
  if (env) {
    return env;
  }
  return defaultValue;
};

export function getCorsOrigin(): string {
  return getEnv(process.env.ODYQUEST_CORS_ORIGIN, 'http://localhost:4200');
}

export function getMongoDbUrl(): string {
  return getEnv(process.env.ODYQUEST_MONGODB_URL, 'mongodb://localhost:27017/test');
}

export function getApiSecret(): string {
  return getEnv(process.env.ODYQUEST_API_SECRET, 'secret');
}

export function getApiPort(): number {
  return +getEnv(process.env.ODYQUEST_API_PORT, "8444");
}
