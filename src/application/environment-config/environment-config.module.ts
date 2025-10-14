import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppEnvironmentConfigService } from './services/app.environment-config.service';
import { DatabaseEnvironmentConfigService } from './services/database.environment-config.service';
import { EnvironmentConfigService } from './environment-config.service';
import { TokeneEnvironmentConfigService } from './services/token.environment-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    AppEnvironmentConfigService,
    DatabaseEnvironmentConfigService,
    TokeneEnvironmentConfigService,
    EnvironmentConfigService,
  ],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
