import { Injectable, Inject } from '@nestjs/common';
import { IAccountHasCredentialGroupsRepository } from 'src/domain/repositories/account-has-credential-groups.repository.interface';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class DeleteAccountHasCredentialGroupService {
  public constructor(
    @Inject(IAccountHasCredentialGroupsRepository)
    public readonly accountHasCredentialGroupsRepository: IAccountHasCredentialGroupsRepository,
  ) {}

  public async execute(
    criteria: FindOptionsWhere<any>,
    queryRunner?: any,
  ): Promise<void> {
    await this.accountHasCredentialGroupsRepository.delete(
      criteria,
      queryRunner,
    );
  }
}
