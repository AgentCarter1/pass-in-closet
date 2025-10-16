import { Injectable, Inject } from '@nestjs/common';
import { ICredentialGroupsRepository } from 'src/domain/repositories/credential-groups.repository.interface';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';

@Injectable()
export class CreateCredentialCroupCommandService {
  public constructor(
    @Inject(ICredentialGroupsRepository)
    public readonly credentialGroupsRepository: ICredentialGroupsRepository,
  ) {}

  public async execute(
    credentialGroupModel: CredentialGroupModel,
    queryRunner?: any,
  ): Promise<CredentialGroupModel> {
    return this.credentialGroupsRepository.save(
      credentialGroupModel,
      {},
      queryRunner,
    );
  }
}
