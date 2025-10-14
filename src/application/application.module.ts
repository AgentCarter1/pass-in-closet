import { Global, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';

@Global()
@Module({
  imports: [EnvironmentConfigModule],
  providers: [EnvironmentConfigModule],
})
export class ApplicationModule {}
