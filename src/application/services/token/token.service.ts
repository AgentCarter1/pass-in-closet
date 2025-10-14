import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { EnvironmentConfigService } from 'src/application/environment-config/environment-config.service';

@Injectable()
export class TokenService {
  public constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  public createAccessToken(payload: Record<string, any>): string {
    return this._createToken(
      payload,
      this.environmentConfigService.tokeneEnvironmentConfigService.getAccessTokenSecret() as string,
      this.environmentConfigService.tokeneEnvironmentConfigService.getAccessTokenExpiresIn() as string,
    );
  }

  public createRefreshToken(payload: Record<string, any>): string {
    return this._createToken(
      payload,
      this.environmentConfigService.tokeneEnvironmentConfigService.getRefreshTokenSecret() as string,
      this.environmentConfigService.tokeneEnvironmentConfigService.getRefreshTokenExpiresIn() as string,
    );
  }

  public _createToken(
    payload: Record<string, any>,
    secret: string,
    expiresIn: string,
  ): string {
    const refreshToken: string = jwt.sign(payload, secret, {
      expiresIn,
    });
    return refreshToken;
  }
}
