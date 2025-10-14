import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppEnvironmentConfig } from 'src/domain/environment-config/app.environment-config.interface';

@Injectable()
export class AppEnvironmentConfigService implements IAppEnvironmentConfig {
  public constructor(private readonly configService: ConfigService) {}

  public getAppPort(): number | undefined {
    return this.configService.get<number>('APP_PORT');
  }
}
