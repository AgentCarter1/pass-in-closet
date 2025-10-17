import { Global, Module } from '@nestjs/common';
import { CreateCredentialCommandUseCase } from './command/create-credential.command.use-case';
import { UpdateCredentialCommandUseCase } from './command/update-credential.command.use-case';
import { DeleteCredentialCommandUseCase } from './command/delete-credential.command.use-case';
import { GetAllCredentialsQueryUseCase } from './query/get-all-credentials.query.use-case';

const command = [
  CreateCredentialCommandUseCase,
  UpdateCredentialCommandUseCase,
  DeleteCredentialCommandUseCase,
];
const query = [GetAllCredentialsQueryUseCase];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class CredentialUseCaseModule {}
