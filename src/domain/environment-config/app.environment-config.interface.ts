export interface IAppEnvironmentConfig {
  getAppPort(): number | undefined;
  getSaltRound(): number | undefined;
}
