import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentConfigService } from './application/environment-config/environment-config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environmentConfigService = app.get(EnvironmentConfigService);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    exposedHeaders: '*',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Pass In Closet')
    .setDescription('Keep Your Pass In Closet')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(
    environmentConfigService.appEnvironmentConfigService.getAppPort() ?? 3000,
  );
}
bootstrap();
