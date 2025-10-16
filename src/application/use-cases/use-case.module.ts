import { Global, Module } from '@nestjs/common';
import { AuthUseCaseModule } from './auth/auth.use-case.module';
import { CredentialGroupUseCaseModule } from './credential-group/credential-group.use-case';

const modules = [AuthUseCaseModule, CredentialGroupUseCaseModule];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class UseCaseModule {}
