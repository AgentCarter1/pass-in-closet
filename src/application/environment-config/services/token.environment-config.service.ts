import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITokenEnvironmentConfig } from 'src/domain/environment-config/token.environment-config.interface';

@Injectable()
export class TokeneEnvironmentConfigService implements ITokenEnvironmentConfig {
  public constructor(private readonly configService: ConfigService) {}

  public getAccessTokenSecret(): string | undefined {
    return this.configService.get<string>('ACCESS_TOKEN_SECRET');
  }

  public getAccessTokenExpiresIn(): string | undefined {
    return this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN');
  }

  public getRefreshTokenSecret(): string | undefined {
    return this.configService.get<string>('REFRESH_TOKEN_SECRET');
  }

  public getRefreshTokenExpiresIn(): string | undefined {
    return this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN');
  }
}
