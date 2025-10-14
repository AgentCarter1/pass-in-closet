import { Global, Module } from '@nestjs/common';
import { GetOneAccountByFilterBaseQueryService } from './query/get-one-account-by-filter.service';
import { CreateAccountCommandService } from './command/create-account.command.service';

const query = [GetOneAccountByFilterBaseQueryService];
const command = [CreateAccountCommandService];

@Global()
@Module({
  providers: [...command, ...query],
  exports: [...command, ...query],
})
export class AccountServiceModule {}
