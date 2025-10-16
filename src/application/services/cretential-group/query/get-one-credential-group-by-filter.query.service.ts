import { Injectable, Inject } from '@nestjs/common';
import { ICredentialGroupsRepository } from 'src/domain/repositories/credential-groups.repository.interface';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class GetOneCredentialGroupByFilterQueryService {
  public constructor(
    @Inject(ICredentialGroupsRepository)
    public readonly credentialGroupsRepository: ICredentialGroupsRepository,
  ) {}

  public async execute(
    filter: Partial<CredentialGroupModel>,
  ): Promise<CredentialGroupModel | null> {
    const options: FindOneOptions = {
      where: filter,
    };

    return this.credentialGroupsRepository.findOne(options);
  }
}
