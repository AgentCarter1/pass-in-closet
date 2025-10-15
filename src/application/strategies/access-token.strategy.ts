import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthTokenTypeEnum } from 'src/domain/enums/auth/auth-token-types.enum';
import { GetOneAccountByFilterBaseQueryService } from '../services/account/query/get-one-account-by-filter.service';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { AccessTokenPayloadType } from 'src/domain/types/auth/access-token-payload.type';
import { TokenUtils } from '../utils/token/token.utils';
import { Request } from 'express';
import { AccountModel } from 'src/domain/models/account.model';
import { TokenService } from '../services/token/token.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  AuthTokenTypeEnum.ACCESS_TOKEN,
) {
  constructor(
    private readonly getOneAccountByFilterBaseQueryService: GetOneAccountByFilterBaseQueryService,
    private readonly tokenService: TokenService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey:
        environmentConfigService.tokeneEnvironmentConfigService.getAccessTokenSecret(),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AccessTokenPayloadType) {
    try {
      const token = TokenUtils.ExtractBearerToken(req.headers.authorization);

      if (!token) {
        throw new BadRequestException('Access token not found in header');
      }

      await this.tokenService.verifyAccessToken(token);

      const accountModel: AccountModel | null =
        await this.getOneAccountByFilterBaseQueryService.execute({
          id: payload.accountId,
        });

      if (!accountModel) throw new Error('Account Not Found');

      if (accountModel.accessToken != token) {
        throw new UnauthorizedException();
      }

      return payload;
    } catch (error) {
      throw error;
    }
  }
}
