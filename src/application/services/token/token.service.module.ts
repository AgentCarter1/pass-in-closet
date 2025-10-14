import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';

const service = [TokenService];

@Global()
@Module({
  providers: [...service],
  exports: [...service],
})
export class TokenServiceModule {}
