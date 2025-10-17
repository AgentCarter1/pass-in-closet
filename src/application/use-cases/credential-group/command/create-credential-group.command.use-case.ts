import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialGroupRequestBodyDto } from 'src/application/dto/credential-group/request/create-credential-group.request.body.dto';
import { CreateCredentialGroupResponseDto } from 'src/application/dto/credential-group/response/create-credential-group.response.dto';
import { CreateAccountHasCredentialGroupCommandService } from 'src/application/services/account/command/account-has-credential-group/create-account-has-credential-group.service';
import { GetOneAccountByFilterBaseQueryService } from 'src/application/services/account/query/account/get-one-account-by-filter.service';
import { CreateCredentialCroupCommandService } from 'src/application/services/cretential-group/command/create-credential-group.command.service';
import { AccountModel } from 'src/domain/models/account.model';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateCredentialGroupCommandUseCase {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly getOneAccountByFilterBaseQueryService: GetOneAccountByFilterBaseQueryService,
    private readonly createCredentialCroupCommandService: CreateCredentialCroupCommandService,
    private readonly createAccountHasCredentialGroupCommandService: CreateAccountHasCredentialGroupCommandService,
  ) {}

  public async execute(
    accountId: string,
    body: CreateCredentialGroupRequestBodyDto,
  ): Promise<CreateCredentialGroupResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const account: AccountModel | null =
        await this.getOneAccountByFilterBaseQueryService.execute({
          id: accountId,
        });

      if (!account) {
        throw new NotFoundException('Account Not Found');
      }

      const createdCredentialGroupModel: CredentialGroupModel =
        await this.createCredentialCroupCommandService.execute(
          { ...body },
          queryRunner,
        );

      await this.createAccountHasCredentialGroupCommandService.execute(
        {
          accountId: account.id!,
          credentialGroupId: createdCredentialGroupModel.id!,
        },
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return new CreateCredentialGroupResponseDto({
        id: createdCredentialGroupModel.id!,
        name: createdCredentialGroupModel.name!,
        createdAt: createdCredentialGroupModel.createdAt!,
        updatedAt: createdCredentialGroupModel.updatedAt!,
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
