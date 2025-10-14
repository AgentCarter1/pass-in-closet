import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { AccountHasCredentialGroups } from '../database/postgres/entities/AccountHasCredentialGroups';
import { AccountHasCredentialGroupModel } from 'src/domain/models/account-has-credential-group.model';
import { IAccountHasCredentialGroupsRepository } from 'src/domain/repositories/account-has-credential-groups.repository.interface';
import { AccountHasCredentialGroupMapper } from '../mappers/account-has-credential-group.mapper';

@Injectable()
export class AccountHasCredentialGroupRepository
  extends BaseRepository<
    AccountHasCredentialGroups,
    AccountHasCredentialGroupModel
  >
  implements IAccountHasCredentialGroupsRepository
{
  constructor(dataSource: DataSource) {
    super(
      dataSource,
      AccountHasCredentialGroups,
      new AccountHasCredentialGroupMapper(),
    );
  }
}
