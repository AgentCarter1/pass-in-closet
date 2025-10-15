import { Global, Module } from '@nestjs/common';
import { GetOneAccountByFilterBaseQueryService } from './query/get-one-account-by-filter.service';
import { CreateAccountCommandService } from './command/create-account.command.service';
import { UpdateAccountCommandService } from './command/update-accont.command.service';

const query = [
  GetOneAccountByFilterBaseQueryService,
  UpdateAccountCommandService,
];
const command = [CreateAccountCommandService];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class AccountServiceModule {}
