import { Injectable, Inject } from '@nestjs/common';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { AccountModel } from 'src/domain/models/account.model';

@Injectable()
export class UpdateAccountCommandService {
  public constructor(
    @Inject(IAccountRepository)
    public readonly accountRepository: IAccountRepository,
  ) {}

  public async execute(
    filter: any,
    account: AccountModel,
    queryRunner?: any,
  ): Promise<void> {
    await this.accountRepository.update(filter, account, queryRunner);
  }
}
