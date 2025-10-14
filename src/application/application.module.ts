import { Global, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';
import { ServiceModule } from './services/service.module';
import { UseCaseModule } from './use-cases/use-case.module';

@Global()
@Module({
  imports: [EnvironmentConfigModule, ServiceModule, UseCaseModule],
  providers: [EnvironmentConfigModule, ServiceModule, UseCaseModule],
})
export class ApplicationModule {}
