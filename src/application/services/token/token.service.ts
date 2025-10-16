import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { EnvironmentConfigService } from 'src/application/environment-config/environment-config.service';

@Injectable()
export class TokenService {
  public constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
    private readonly jwtService: JwtService,
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

  public verifyAccessToken<T = any>(token: string): T {
    try {
      return this.jwtService.verify(token, {
        secret:
          this.environmentConfigService.tokeneEnvironmentConfigService.getAccessTokenSecret(),
      }) as T;
    } catch (error) {
      throw new Error('INVALID TOKEN');
    }
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
