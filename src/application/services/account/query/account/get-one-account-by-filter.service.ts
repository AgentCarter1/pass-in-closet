import { Inject, Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account.model';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';

@Injectable()
export class GetOneAccountByFilterBaseQueryService {
  public constructor(
    @Inject(IAccountRepository)
    public readonly accountRepository: IAccountRepository,
  ) {}

  public async execute(
    filter: object,
    relations?: string[],
    withDeleted?: boolean,
  ): Promise<AccountModel | null> {
    return this.accountRepository.findOne({
      where: filter,
      relations,
      withDeleted: withDeleted ?? false,
    });
  }
}
