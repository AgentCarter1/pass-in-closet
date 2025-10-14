import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from 'src/application/dto/command/request/sign-up.request.body.dto';
import { SignUpResponseDto } from 'src/application/dto/command/response/sign-up.response.dto';
import { CreateAccountCommandService } from 'src/application/services/account/command/create-account.command.service';
import { GetOneAccountByFilterBaseQueryService } from 'src/application/services/account/query/get-one-account-by-filter.service';
import { BcryptHashingService } from 'src/application/services/bcrypt/bcrypt-hashing.service';
import { AccountModel } from 'src/domain/models/account.model';
import { DataSource } from 'typeorm';

@Injectable()
export class SignUpCommandUseCase {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly getOneAccountByFilterBaseQueryService: GetOneAccountByFilterBaseQueryService,
    private readonly createAccountCommandService: CreateAccountCommandService,
    private readonly bcryptHashingService: BcryptHashingService,
  ) {}

  public async execute(body: SignUpRequestDto): Promise<SignUpResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { email, password } = body;

      const account: AccountModel | null =
        await this.getOneAccountByFilterBaseQueryService.execute({ email });

      if (account) {
        throw new Error('Account Already Exist');
      }

      const hashedPassword: string =
        await this.bcryptHashingService.hash(password);

      const createAccountModel: AccountModel = new AccountModel({
        ...body,
        password: hashedPassword,
      });

      await this.createAccountCommandService.execute(
        createAccountModel,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return new SignUpResponseDto({ status: true });
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
