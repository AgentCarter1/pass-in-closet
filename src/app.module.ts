import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { PresentationModule } from './presentation/presentation.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './presentation/guards/auth/access-token.guard';

@Module({
  imports: [
    InfrastructureModule,
    DomainModule,
    ApplicationModule,
    PresentationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
