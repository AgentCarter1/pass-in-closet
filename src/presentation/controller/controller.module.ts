import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { CredentialGroupController } from './credential-group/credential-group.controller';

@Global()
@Module({
  controllers: [AuthController, CredentialGroupController],
})
export class ControllerModule {}
