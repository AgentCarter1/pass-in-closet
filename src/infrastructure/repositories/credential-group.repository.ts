import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { CredentialGroups } from '../database/postgres/entities/CredentialGroups';
import { CredentialGroupMapper } from '../mappers/credential-group.mapper';
import { ICredentialGroupsRepository } from 'src/domain/repositories/credential-groups.repository.interface';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';

@Injectable()
export class CredentialGroupRepository
  extends BaseRepository<CredentialGroups, CredentialGroupModel>
  implements ICredentialGroupsRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, CredentialGroups, new CredentialGroupMapper());
  }
}
