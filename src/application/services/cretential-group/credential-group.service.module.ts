import { Global, Module } from '@nestjs/common';
import { CreateCredentialCroupCommandService } from './command/create-credential-group.command.service';
import { UpdateCredentialGroupCommandService } from './command/update-credential-group.command.service';
import { DeleteCredentialGroupCommandService } from './command/delete-credential-group.command.service';
import { GetAllCredentialGroupsByAccountIdQueryService } from './query/get-all-credential-groups-by-account-id.query.service';
import { GetOneCredentialGroupByFilterQueryService } from './query/get-one-credential-group-by-filter.query.service';

const query = [
  GetAllCredentialGroupsByAccountIdQueryService,
  GetOneCredentialGroupByFilterQueryService,
];
const command = [
  CreateCredentialCroupCommandService,
  UpdateCredentialGroupCommandService,
  DeleteCredentialGroupCommandService,
];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class CredentialGroupServiceModule {}
