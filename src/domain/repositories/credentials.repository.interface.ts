import { IBaseRepository } from './base.repository.interface';
import { Credentials } from 'src/infrastructure/database/postgres/entities/Credentials';
import { CredentialModel } from '../models/credential.model';
export interface ICredentialsRepository
  extends IBaseRepository<Credentials, CredentialModel> {}

export const ICredentialsRepository = Symbol('ICredentialsRepository');
