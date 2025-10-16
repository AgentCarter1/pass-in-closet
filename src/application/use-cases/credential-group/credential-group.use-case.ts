import { Global, Module } from '@nestjs/common';
import { CreateCredentialGroupCommandUseCase } from './command/create-credential-group.command.use-case';

const command = [CreateCredentialGroupCommandUseCase];
const query = [];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class CredentialGroupUseCaseModule {}
