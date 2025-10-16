import { Global, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

const service = [TokenService];

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [JwtService, ...service],
  exports: [...service],
})
export class TokenServiceModule {}
