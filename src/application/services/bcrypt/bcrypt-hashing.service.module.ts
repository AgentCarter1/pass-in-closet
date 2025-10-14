import { Global, Module } from '@nestjs/common';
import { BcryptHashingService } from './bcrypt-hashing.service';

const service = [BcryptHashingService];

@Global()
@Module({
  providers: [...service],
  exports: [...service],
})
export class BcrypHashingServiceModule {}
