import { Injectable, Inject } from '@nestjs/common';
import { ICredentialsRepository } from 'src/domain/repositories/credentials.repository.interface';
import { CredentialModel } from 'src/domain/models/credential.model';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class GetOneCredentialByFilterQueryService {
  public constructor(
    @Inject(ICredentialsRepository)
    public readonly credentialsRepository: ICredentialsRepository,
  ) {}

  public async execute(
    filter: Partial<CredentialModel>,
  ): Promise<CredentialModel | null> {
    const options: FindOneOptions = {
      where: filter,
    };

    return this.credentialsRepository.findOne(options);
  }
}
