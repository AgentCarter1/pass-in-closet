import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthTokenTypeEnum } from 'src/domain/enums/auth/auth-token-types.enum';
import { SKIP_ACCESS_TOKEN } from 'src/presentation/decorators/skip-access-token.decorator';

@Injectable()
export class AccessTokenGuard extends AuthGuard(
  AuthTokenTypeEnum.ACCESS_TOKEN,
) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isSkipped = this.reflector.getAllAndOverride<boolean>(
      SKIP_ACCESS_TOKEN,
      [context.getHandler(), context.getClass()],
    );

    if (isSkipped) {
      return true;
    }

    return super.canActivate(context);
  }
}
