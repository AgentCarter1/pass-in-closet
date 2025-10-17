import { Injectable, Inject } from '@nestjs/common';
import { ICredentialsRepository } from 'src/domain/repositories/credentials.repository.interface';
import { CredentialModel } from 'src/domain/models/credential.model';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UpdateCredentialCommandService {
  public constructor(
    @Inject(ICredentialsRepository)
    public readonly credentialsRepository: ICredentialsRepository,
  ) {}

  public async execute(
    criteria: FindOptionsWhere<any>,
    credentialModel: Partial<CredentialModel>,
    queryRunner?: any,
  ): Promise<void> {
    await this.credentialsRepository.update(
      criteria,
      credentialModel,
      queryRunner,
    );
  }
}
