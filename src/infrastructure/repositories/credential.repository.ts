import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ICredentialsRepository } from 'src/domain/repositories/credentials.repository.interface';
import { Credentials } from '../database/postgres/entities/Credentials';
import { CredentialModel } from 'src/domain/models/credential.model';
import { CredentialMapper } from '../mappers/credential.mapper';

@Injectable()
export class CredentialRepository
  extends BaseRepository<Credentials, CredentialModel>
  implements ICredentialsRepository
{
  constructor(dataSource: DataSource) {
    super(dataSource, Credentials, new CredentialMapper());
  }
}
