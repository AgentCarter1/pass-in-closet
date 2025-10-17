import { Injectable, Inject } from '@nestjs/common';
import { ICredentialGroupsRepository } from 'src/domain/repositories/credential-groups.repository.interface';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UpdateCredentialGroupCommandService {
  public constructor(
    @Inject(ICredentialGroupsRepository)
    public readonly credentialGroupsRepository: ICredentialGroupsRepository,
  ) {}

  public async execute(
    criteria: FindOptionsWhere<any>,
    credentialGroupModel: Partial<CredentialGroupModel>,
    queryRunner?: any,
  ): Promise<void> {
    await this.credentialGroupsRepository.update(
      criteria,
      credentialGroupModel,
      queryRunner,
    );
  }
}
