import { Global, Module } from '@nestjs/common';
import { AuthUseCaseModule } from './auth/auth.use-case.module';
import { CredentialGroupUseCaseModule } from './credential-group/credential-group.use-case';
import { CredentialUseCaseModule } from './credential/credential.use-case.module';

const modules = [
  AuthUseCaseModule,
  CredentialGroupUseCaseModule,
  CredentialUseCaseModule,
];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class UseCaseModule {}
