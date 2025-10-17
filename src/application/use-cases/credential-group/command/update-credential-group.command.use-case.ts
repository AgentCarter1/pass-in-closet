import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UpdateCredentialGroupRequestBodyDto } from 'src/application/dto/credential-group/request/update-credential-group.request.body.dto';
import { UpdateCredentialGroupResponseDto } from 'src/application/dto/credential-group/response/update-credential-group.response.dto';
import { GetOneCredentialGroupByFilterQueryService } from 'src/application/services/cretential-group/query/get-one-credential-group-by-filter.query.service';
import { UpdateCredentialGroupCommandService } from 'src/application/services/cretential-group/command/update-credential-group.command.service';
import { GetAccountHasCredentialGroupByFilterQueryService } from 'src/application/services/account/query/account-has-credential-group/get-account-has-credential-group-by-filter.query.service';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateCredentialGroupCommandUseCase {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly getOneCredentialGroupByFilterQueryService: GetOneCredentialGroupByFilterQueryService,
    private readonly updateCredentialGroupCommandService: UpdateCredentialGroupCommandService,
    private readonly getAccountHasCredentialGroupByFilterQueryService: GetAccountHasCredentialGroupByFilterQueryService,
  ) {}

  public async execute(
    credentialGroupId: string,
    accountId: string,
    body: UpdateCredentialGroupRequestBodyDto,
  ): Promise<UpdateCredentialGroupResponseDto> {
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
          'You do not have permission to update this credential group',
        );
      }

      // Update the credential group
      await this.updateCredentialGroupCommandService.execute(
        { id: credentialGroupId },
        body,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return new UpdateCredentialGroupResponseDto({
        id: credentialGroupId,
        name: body.name || credentialGroup.name!,
        createdAt: credentialGroup.createdAt!,
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
