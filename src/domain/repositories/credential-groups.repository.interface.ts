import { IBaseRepository } from './base.repository.interface';
import { CredentialGroups } from 'src/infrastructure/database/postgres/entities/CredentialGroups';
import { CredentialGroupModel } from '../models/credential-group.model';
export interface ICredentialGroupsRepository
  extends IBaseRepository<CredentialGroups, CredentialGroupModel> {}

export const ICredentialGroupsRepository = Symbol(
  'ICredentialGroupsRepository',
);
