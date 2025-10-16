import { Global, Module } from '@nestjs/common';
import { CreateCredentialGroupCommandUseCase } from './command/create-credential-group.command.use-case';
import { UpdateCredentialGroupCommandUseCase } from './command/update-credential-group.command.use-case';
import { DeleteCredentialGroupCommandUseCase } from './command/delete-credential-group.command.use-case';
import { GetAllCredentialGroupsQueryUseCase } from './query/get-all-credential-groups.query.use-case';

const command = [
  CreateCredentialGroupCommandUseCase,
  UpdateCredentialGroupCommandUseCase,
  DeleteCredentialGroupCommandUseCase,
];
const query = [GetAllCredentialGroupsQueryUseCase];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class CredentialGroupUseCaseModule {}
