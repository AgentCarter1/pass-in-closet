import { Global, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';
import { ServiceModule } from './services/service.module';
import { UseCaseModule } from './use-cases/use-case.module';
import { StrategiesModule } from './strategies/strategies.module';

@Global()
@Module({
  imports: [
    EnvironmentConfigModule,
    ServiceModule,
    StrategiesModule,
    UseCaseModule,
  ],
  providers: [
    EnvironmentConfigModule,
    ServiceModule,
    StrategiesModule,
    UseCaseModule,
  ],
})
export class ApplicationModule {}
