import { Injectable, Inject } from '@nestjs/common';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { AccountModel } from 'src/domain/models/account.model';

@Injectable()
export class CreateAccountCommandService {
  public constructor(
    @Inject(IAccountRepository)
    public readonly accountRepository: IAccountRepository,
  ) {}

  public async execute(
    account: AccountModel,
    queryRunner?: any,
  ): Promise<AccountModel> {
    return this.accountRepository.save(account, {}, queryRunner);
  }
}
