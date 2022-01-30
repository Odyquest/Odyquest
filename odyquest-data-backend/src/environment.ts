
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

export function getUseAuth(): boolean {
  if (getEnv(process.env.ODYQUEST_USE_AUTH, 'true') === 'false') {
    return false;
  } else {
    return true;
  }
}

export function getAuthIssuesBaseUrl(): string {
  return getEnv(process.env.ODYQUEST_AUTH_ISSUER_BASE_URL, "https://localhost:8080/auth/realms/master");
}

export function getAuthJwksUrl(): string {
  return getEnv(process.env.ODYQUEST_AUTH_JWKS_URL, "https://localhost:8080/auth/realms/master/protocol/openid-connect/certs");
}

export function getFilesystemPath(): string {
  return getEnv(process.env.ODYQUEST_FILESYSTEM_PATH, "data");
}
