import { IBaseRepository } from './base.repository.interface';
import { AccountHasCredentialGroups } from 'src/infrastructure/database/postgres/entities/AccountHasCredentialGroups';
import { AccountHasCredentialGroupModel } from '../models/account-has-credential-group.model';
export interface IAccountHasCredentialGroupsRepository
  extends IBaseRepository<
    AccountHasCredentialGroups,
    AccountHasCredentialGroupModel
  > {}

export const IAccountHasCredentialGroupsRepository = Symbol(
  'IAccountHasCredentialGroupsRepository',
);
