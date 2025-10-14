import { Injectable } from '@nestjs/common';
import { Accounts } from '../database/postgres/entities/Accounts';
import { AccountModel } from 'src/domain/models/account.model';
import { IMapper } from 'src/domain/mappers/mapper.interface';

@Injectable()
export class AccountMapper implements IMapper<Accounts, AccountModel> {
  toDomain(entity: Accounts): AccountModel {
    return new AccountModel({
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      password: entity.password,
      accessToken: entity.accessToken,
      refreshToken: entity.refreshToken,
      verifiedAt: entity.verifiedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  toEntity(domain: AccountModel): Accounts {
    const entity = new Accounts();
    if (domain.id) {
      entity.id = domain.id;
    }

    ((entity.email = domain.email),
      (entity.firstName = domain.firstName),
      (entity.lastName = domain.lastName),
      (entity.password = domain.password),
      (entity.accessToken = domain.accessToken),
      (entity.refreshToken = domain.refreshToken),
      (entity.verifiedAt = domain.verifiedAt),
      (entity.createdAt = domain.createdAt));
    entity.updatedAt = domain.updatedAt;
    entity.deletedAt = domain.deletedAt;

    return entity;
  }
}
