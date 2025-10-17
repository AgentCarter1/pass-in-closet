import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UpdateCredentialRequestBodyDto } from 'src/application/dto/credential/request/update-credential.request.body.dto';
import { UpdateCredentialResponseDto } from 'src/application/dto/credential/response/update-credential.response.dto';
import { GetOneCredentialByFilterQueryService } from 'src/application/services/credentials/query/get-one-credential-by-filter.query.service';
import { UpdateCredentialCommandService } from 'src/application/services/credentials/command/update-credential.command.service';
import { GetOneCredentialGroupByFilterQueryService } from 'src/application/services/cretential-group/query/get-one-credential-group-by-filter.query.service';
import { GetAccountHasCredentialGroupByFilterQueryService } from 'src/application/services/account/query/account-has-credential-group/get-account-has-credential-group-by-filter.query.service';
import { CredentialModel } from 'src/domain/models/credential.model';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateCredentialCommandUseCase {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly getOneCredentialByFilterQueryService: GetOneCredentialByFilterQueryService,
    private readonly updateCredentialCommandService: UpdateCredentialCommandService,
    private readonly getOneCredentialGroupByFilterQueryService: GetOneCredentialGroupByFilterQueryService,
    private readonly getAccountHasCredentialGroupByFilterQueryService: GetAccountHasCredentialGroupByFilterQueryService,
  ) {}

  public async execute(
    credentialId: string,
    accountId: string,
    body: UpdateCredentialRequestBodyDto,
  ): Promise<UpdateCredentialResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if credential exists
      const credential: CredentialModel | null =
        await this.getOneCredentialByFilterQueryService.execute({
          id: credentialId,
        });

      if (!credential) {
        throw new NotFoundException('Credential not found');
      }

      // Check if the credential group exists and belongs to the account
      const credentialGroup =
        await this.getOneCredentialGroupByFilterQueryService.execute({
          id: credential.credentialGroupId!,
        });

      if (!credentialGroup) {
        throw new NotFoundException('Credential group not found');
      }

      // Check if the account has access to this credential group
      const accountHasCredentialGroup =
        await this.getAccountHasCredentialGroupByFilterQueryService.execute({
          accountId: accountId,
          credentialGroupId: credential.credentialGroupId!,
        });

      if (!accountHasCredentialGroup) {
        throw new ForbiddenException(
          'You do not have permission to update this credential',
        );
      }

      // Update the credential
      await this.updateCredentialCommandService.execute(
        { id: credentialId },
        body,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return new UpdateCredentialResponseDto({
        id: credentialId,
        name: body.name || credential.name!,
        link: body.link || credential.link!,
        email: body.email || credential.email!,
        credentialGroupId: credential.credentialGroupId!,
        createdAt: credential.createdAt!,
        updatedAt: new Date(),
      });
    } catch (error) {
      try {
        if (queryRunner.isTransactionActive) {
          await queryRunner.rollbackTransaction();
        }
      } finally {
        throw error;
      }
    } finally {
      await queryRunner.release();
    }
  }
}
