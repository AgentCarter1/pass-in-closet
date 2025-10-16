import { Global, Module } from '@nestjs/common';
import { GetOneAccountByFilterBaseQueryService } from './query/account/get-one-account-by-filter.service';
import { CreateAccountCommandService } from './command/account/create-account.command.service';
import { UpdateAccountCommandService } from './command/account/update-accont.command.service';
import { CreateAccountHasCredentialGroupCommandService } from './command/account-has-credential-group/create-account-has-credential-group.service';

const query = [
  GetOneAccountByFilterBaseQueryService,
  UpdateAccountCommandService,
  CreateAccountHasCredentialGroupCommandService,
];
const command = [CreateAccountCommandService];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class AccountServiceModule {}
