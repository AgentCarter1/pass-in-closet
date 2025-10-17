import { Injectable, Inject } from '@nestjs/common';
import { ICredentialGroupsRepository } from 'src/domain/repositories/credential-groups.repository.interface';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class DeleteCredentialGroupCommandService {
  public constructor(
    @Inject(ICredentialGroupsRepository)
    public readonly credentialGroupsRepository: ICredentialGroupsRepository,
  ) {}

  public async execute(
    criteria: FindOptionsWhere<any>,
    queryRunner?: any,
  ): Promise<void> {
    await this.credentialGroupsRepository.softDelete(criteria, queryRunner);
  }
}
