import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/domain/mappers/mapper.interface';
import { CredentialGroups } from '../database/postgres/entities/CredentialGroups';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';

@Injectable()
export class CredentialGroupMapper
  implements IMapper<CredentialGroups, CredentialGroupModel>
{
  toDomain(entity: CredentialGroups): CredentialGroupModel {
    return new CredentialGroupModel({
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: CredentialGroupModel): CredentialGroups {
    const entity = new CredentialGroups();
    if (domain.id) {
      entity.id = domain.id;
    }

    entity.name = domain.name;
    entity.createdAt = domain.createdAt ?? null;
    entity.updatedAt = domain.updatedAt ?? null;
    entity.deletedAt = domain.deletedAt ?? null;

    return entity;
  }
}
