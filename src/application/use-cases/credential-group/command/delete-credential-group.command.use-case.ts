import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DeleteCredentialGroupResponseDto } from 'src/application/dto/credential-group/response/delete-credential-group.response.dto';
import { GetOneCredentialGroupByFilterQueryService } from 'src/application/services/cretential-group/query/get-one-credential-group-by-filter.query.service';
import { DeleteCredentialGroupCommandService } from 'src/application/services/cretential-group/command/delete-credential-group.command.service';
import { DeleteAccountHasCredentialGroupService } from 'src/application/services/account/command/account-has-credential-group/delete-account-has-credential-group.service';
import { GetAccountHasCredentialGroupByFilterQueryService } from 'src/application/services/account/query/account-has-credential-group/get-account-has-credential-group-by-filter.query.service';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';
import { DataSource } from 'typeorm';

@Injectable()
export class DeleteCredentialGroupCommandUseCase {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly getOneCredentialGroupByFilterQueryService: GetOneCredentialGroupByFilterQueryService,
    private readonly deleteCredentialGroupCommandService: DeleteCredentialGroupCommandService,
    private readonly deleteAccountHasCredentialGroupService: DeleteAccountHasCredentialGroupService,
    private readonly getAccountHasCredentialGroupByFilterQueryService: GetAccountHasCredentialGroupByFilterQueryService,
  ) {}

  public async execute(
    credentialGroupId: string,
    accountId: string,
  ): Promise<DeleteCredentialGroupResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check if credential group exists and belongs to the account
      const credentialGroup: CredentialGroupModel | null =
        await this.getOneCredentialGroupByFilterQueryService.execute({
          id: credentialGroupId,
        });

      if (!credentialGroup) {
        throw new NotFoundException('Credential group not found');
      }

      // Check if the credential group belongs to the account
      const accountHasCredentialGroup =
        await this.getAccountHasCredentialGroupByFilterQueryService.execute({
          accountId: accountId,
          credentialGroupId: credentialGroupId,
        });

      if (!accountHasCredentialGroup) {
        throw new ForbiddenException(
          'You do not have permission to delete this credential group',
        );
      }

      // Delete the account-credential group relationship first
      await this.deleteAccountHasCredentialGroupService.execute(
        {
          accountId: accountId,
          credentialGroupId: credentialGroupId,
        },
        queryRunner,
      );

      // Soft delete the credential group
      await this.deleteCredentialGroupCommandService.execute(
        { id: credentialGroupId },
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return new DeleteCredentialGroupResponseDto({
        success: true,
        message: 'Credential group deleted successfully',
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
