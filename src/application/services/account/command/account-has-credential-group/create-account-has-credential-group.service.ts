import { Injectable, Inject } from '@nestjs/common';
import { IAccountHasCredentialGroupsRepository } from 'src/domain/repositories/account-has-credential-groups.repository.interface';
import { AccountHasCredentialGroupModel } from 'src/domain/models/account-has-credential-group.model';

@Injectable()
export class CreateAccountHasCredentialGroupCommandService {
  public constructor(
    @Inject(IAccountHasCredentialGroupsRepository)
    public readonly accountHasCredentialGroupsRepository: IAccountHasCredentialGroupsRepository,
  ) {}

  public async execute(
    accountHasCredentialGroupModel: AccountHasCredentialGroupModel,
    queryRunner?: any,
  ): Promise<AccountHasCredentialGroupModel> {
    return this.accountHasCredentialGroupsRepository.save(
      accountHasCredentialGroupModel,
      {},
      queryRunner,
    );
  }
}
