import { Accounts } from 'src/infrastructure/database/postgres/entities/Accounts';
import { AccountModel } from '../models/account.model';
import { IBaseRepository } from './base.repository.interface';
export interface IAccountRepository
  extends IBaseRepository<Accounts, AccountModel> {}

export const IAccountRepository = Symbol('IAccountRepository');
