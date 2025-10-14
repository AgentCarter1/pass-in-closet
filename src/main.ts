import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './application/environment-config/environment-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environmentConfigService = app.get(EnvironmentConfigService);

  await app.listen(
    environmentConfigService.appEnvironmentConfigService.getAppPort() ?? 3000,
  );
}
bootstrap();
