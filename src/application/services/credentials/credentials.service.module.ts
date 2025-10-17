import { Global, Module } from '@nestjs/common';
import { CreateCredentialCommandService } from './command/create-credential.command.service';
import { UpdateCredentialCommandService } from './command/update-credential.command.service';
import { DeleteCredentialCommandService } from './command/delete-credential.command.service';
import { GetAllCredentialsByCredentialGroupIdQueryService } from './query/get-all-credentials-by-credential-group-id.query.service';
import { GetOneCredentialByFilterQueryService } from './query/get-one-credential-by-filter.query.service';

const query = [
  GetAllCredentialsByCredentialGroupIdQueryService,
  GetOneCredentialByFilterQueryService,
];
const command = [
  CreateCredentialCommandService,
  UpdateCredentialCommandService,
  DeleteCredentialCommandService,
];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class CredentialsServiceModule {}
