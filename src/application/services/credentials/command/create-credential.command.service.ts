import { Injectable, Inject } from '@nestjs/common';
import { ICredentialsRepository } from 'src/domain/repositories/credentials.repository.interface';
import { CredentialModel } from 'src/domain/models/credential.model';

@Injectable()
export class CreateCredentialCommandService {
  public constructor(
    @Inject(ICredentialsRepository)
    public readonly credentialsRepository: ICredentialsRepository,
  ) {}

  public async execute(
    credentialModel: CredentialModel,
    queryRunner?: any,
  ): Promise<CredentialModel> {
    return this.credentialsRepository.save(credentialModel, {}, queryRunner);
  }
}
