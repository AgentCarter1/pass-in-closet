import { Global, Module } from '@nestjs/common';
import { AccessTokenGuard } from './access-token.guard';

const guards = [AccessTokenGuard];

@Global()
@Module({
  providers: [...guards],
  exports: [...guards],
})
export class AuthGuardModule {}
