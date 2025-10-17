import { Injectable, Inject } from '@nestjs/common';
import { ICredentialsRepository } from 'src/domain/repositories/credentials.repository.interface';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class DeleteCredentialCommandService {
  public constructor(
    @Inject(ICredentialsRepository)
    public readonly credentialsRepository: ICredentialsRepository,
  ) {}

  public async execute(
    criteria: FindOptionsWhere<any>,
    queryRunner?: any,
  ): Promise<void> {
    await this.credentialsRepository.softDelete(criteria, queryRunner);
  }
}
