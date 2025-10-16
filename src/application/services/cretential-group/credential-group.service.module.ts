import { Global, Module } from '@nestjs/common';
import { CreateCredentialCroupCommandService } from './command/create-credential-group.command.service';

const query = [CreateCredentialCroupCommandService];
const command = [];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class CredentialGroupServiceModule {}
