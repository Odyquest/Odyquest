
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

export function getApiPort(): number {
  return +getEnv(process.env.ODYQUEST_API_PORT, "8444");
}

export function getAuthIssuesBaseUrl(): string {
  return getEnv(process.env.AUTH_ISSUER_BASE_URL, "https://localhost:8080/auth/realms/master");
}

export function getAuthJwksUrl(): string {
  return getEnv(process.env.AUTH_ISSUER_BASE_URL, "https://localhost:8080/auth/realms/master/protocol/openid-connect/certs");
}
