import { Injectable, Inject } from '@nestjs/common';
import { IAccountHasCredentialGroupsRepository } from 'src/domain/repositories/account-has-credential-groups.repository.interface';
import { AccountHasCredentialGroupModel } from 'src/domain/models/account-has-credential-group.model';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class GetAccountHasCredentialGroupByFilterQueryService {
  public constructor(
    @Inject(IAccountHasCredentialGroupsRepository)
    public readonly accountHasCredentialGroupsRepository: IAccountHasCredentialGroupsRepository,
  ) {}

  public async execute(
    filter: Partial<AccountHasCredentialGroupModel>,
  ): Promise<AccountHasCredentialGroupModel | null> {
    const options: FindOneOptions = {
      where: filter,
    };

    return this.accountHasCredentialGroupsRepository.findOne(options);
  }
}
