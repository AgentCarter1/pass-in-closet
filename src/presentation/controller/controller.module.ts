import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { CredentialGroupController } from './credential-group/credential-group.controller';
import { CredentialController } from './credential/credential.controller';

@Global()
@Module({
  controllers: [
    AuthController,
    CredentialGroupController,
    CredentialController,
  ],
})
export class ControllerModule {}
