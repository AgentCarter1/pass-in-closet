import { Global, Module } from '@nestjs/common';
import { AccessTokenStrategy } from './access-token.strategy';

const strategies = [AccessTokenStrategy];

@Global()
@Module({
  providers: [...strategies],
  exports: [...strategies],
})
export class StrategiesModule {}
