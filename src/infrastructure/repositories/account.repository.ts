import { Injectable } from '@nestjs/common';
import { AccountModel } from 'src/domain/models/account.model';
import { IAccountRepository } from 'src/domain/repositories/account.repository.interface';
import { Accounts } from 'src/infrastructure/database/postgres/entities/Accounts';
import { DataSource } from 'typeorm';
import { AccountMapper } from '../mappers/account.mapper';
import { BaseRepository } from './base.repository';

@Injectable()
export class AccountRepository
  extends BaseRepository<Accounts, AccountModel>
  implements IAccountRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, Accounts, new AccountMapper());
  }
}
