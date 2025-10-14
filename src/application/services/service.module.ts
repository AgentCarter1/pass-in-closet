import { Global, Module } from '@nestjs/common';
import { AccountServiceModule } from './account/account.service.module';
import { BcrypHashingServiceModule } from './bcrypt/bcrypt-hashing.service.module';
import { TokenServiceModule } from './token/token.service.module';

const modules = [
  BcrypHashingServiceModule,
  TokenServiceModule,
  AccountServiceModule,
];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class ServiceModule {}
