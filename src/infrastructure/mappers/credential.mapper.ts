import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/domain/mappers/mapper.interface';
import { Credentials } from '../database/postgres/entities/Credentials';
import { CredentialModel } from 'src/domain/models/credential.model';

@Injectable()
export class CredentialMapper implements IMapper<Credentials, CredentialModel> {
  toDomain(entity: Credentials): CredentialModel {
    return new CredentialModel({
      id: entity.id,
      credentialGroupId: entity.credentialGroupId,
      name: entity.name,
      link: entity.link,
      email: entity.email,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: CredentialModel): Credentials {
    const entity = new Credentials();
    if (domain.id) {
      entity.id = domain.id;
    }

    ((entity.name = domain.name),
      (entity.credentialGroupId = domain.credentialGroupId),
      (entity.link = domain.link),
      (entity.email = domain.email),
      (entity.password = domain.password),
      (entity.createdAt = domain.createdAt));
    entity.updatedAt = domain.updatedAt;

    return entity;
  }
}
