import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EnvironmentConfigService } from 'src/application/environment-config/environment-config.service';

export const PostgresConfig = TypeOrmModule.forRootAsync({
  inject: [EnvironmentConfigService],
  useFactory: async (envConfigService: EnvironmentConfigService) => ({
    type: 'postgres',
    autoLoadEntities: false,
    synchronize: false,
    entities: [join(__dirname, '/../**/entities/*.{ts,js}')],
    host: envConfigService.databaseEnvironmentConfigService.getDatabaseHost(),
    port: envConfigService.databaseEnvironmentConfigService.getDatabasePort(),
    username:
      envConfigService.databaseEnvironmentConfigService.getDatabaseUser(),
    password:
      envConfigService.databaseEnvironmentConfigService.getDatabasePassword(),
    database:
      envConfigService.databaseEnvironmentConfigService.getDatabaseName(),
  }),
});
