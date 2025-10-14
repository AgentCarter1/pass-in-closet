export interface ITokenEnvironmentConfig {
  getAccessTokenSecret(): string | undefined;
  getAccessTokenExpiresIn(): string | undefined;
  getRefreshTokenSecret(): string | undefined;
  getRefreshTokenExpiresIn(): string | undefined;
}
