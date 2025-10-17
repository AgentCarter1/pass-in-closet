import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/domain/mappers/mapper.interface';
import { AccountHasCredentialGroups } from '../database/postgres/entities/AccountHasCredentialGroups';
import { AccountHasCredentialGroupModel } from 'src/domain/models/account-has-credential-group.model';

@Injectable()
export class AccountHasCredentialGroupMapper
  implements IMapper<AccountHasCredentialGroups, AccountHasCredentialGroupModel>
{
  toDomain(entity: AccountHasCredentialGroups): AccountHasCredentialGroupModel {
    return new AccountHasCredentialGroupModel({
      id: entity.id,
      accountId: entity.accountId,
      credentialGroupId: entity.credentialGroupId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: AccountHasCredentialGroupModel): AccountHasCredentialGroups {
    const entity = new AccountHasCredentialGroups();
    if (domain.id) {
      entity.id = domain.id;
    }

    entity.accountId = domain.accountId;
    entity.credentialGroupId = domain.credentialGroupId;
    entity.createdAt = domain.createdAt ?? null;
    entity.updatedAt = domain.updatedAt ?? null;

    return entity;
  }
}
