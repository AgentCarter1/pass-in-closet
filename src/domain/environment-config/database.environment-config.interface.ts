export interface IDatabaseEnvironmentConfig {
  getDatabaseHost(): string | undefined;
  getDatabasePort(): number | undefined;
  getDatabaseUser(): string | undefined;
  getDatabasePassword(): string | undefined;
  getDatabaseName(): string | undefined;
  getDatabaseSynchronize(): boolean | undefined;
  getDatabaseLogging(): boolean | undefined;
}
