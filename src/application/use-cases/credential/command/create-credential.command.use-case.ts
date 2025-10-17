import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCredentialRequestBodyDto } from 'src/application/dto/credential/request/create-credential.request.body.dto';
import { CreateCredentialResponseDto } from 'src/application/dto/credential/response/create-credential.response.dto';
import { GetOneCredentialGroupByFilterQueryService } from 'src/application/services/cretential-group/query/get-one-credential-group-by-filter.query.service';
import { GetAccountHasCredentialGroupByFilterQueryService } from 'src/application/services/account/query/account-has-credential-group/get-account-has-credential-group-by-filter.query.service';
import { CreateCredentialCommandService } from 'src/application/services/credentials/command/create-credential.command.service';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';
import { CredentialModel } from 'src/domain/models/credential.model';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateCredentialCommandUseCase {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly getOneCredentialGroupByFilterQueryService: GetOneCredentialGroupByFilterQueryService,
    private readonly getAccountHasCredentialGroupByFilterQueryService: GetAccountHasCredentialGroupByFilterQueryService,
    private readonly createCredentialCommandService: CreateCredentialCommandService,
  ) {}

  public async execute(
    accountId: string,
    body: CreateCredentialRequestBodyDto,
  ): Promise<CreateCredentialResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { credentialGroupId } = body;

      // Check if credential group exists
      const credentialGroup: CredentialGroupModel | null =
        await this.getOneCredentialGroupByFilterQueryService.execute({
          id: credentialGroupId,
        });

      if (!credentialGroup) {
        throw new NotFoundException('Credential group not found');
      }

      // Check if the account has access to this credential group
      const accountHasCredentialGroup =
        await this.getAccountHasCredentialGroupByFilterQueryService.execute({
          accountId: accountId,
          credentialGroupId: credentialGroupId,
        });

      if (!accountHasCredentialGroup) {
        throw new ForbiddenException(
          'You do not have permission to add credentials to this group',
        );
      }

      const createCredentialModel: CredentialModel = new CredentialModel({
        ...body,
        credentialGroupId,
      });

      const createdCredentialModel: CredentialModel =
        await this.createCredentialCommandService.execute(
          createCredentialModel,
          queryRunner,
        );

      await queryRunner.commitTransaction();

      return new CreateCredentialResponseDto({
        id: createdCredentialModel.id!,
        name: createdCredentialModel.name!,
        link: createdCredentialModel.link!,
        email: createdCredentialModel.email!,
        credentialGroupId: createdCredentialModel.credentialGroupId!,
        createdAt: createdCredentialModel.createdAt!,
        updatedAt: createdCredentialModel.updatedAt!,
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
