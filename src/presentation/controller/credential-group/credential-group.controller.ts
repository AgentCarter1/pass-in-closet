import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCredentialGroupRequestBodyDto } from 'src/application/dto/credential-group/request/create-credential-group.request.body.dto';
import { CreateCredentialGroupResponseDto } from 'src/application/dto/credential-group/response/create-credential-group.response.dto';
import { CreateCredentialGroupCommandUseCase } from 'src/application/use-cases/credential-group/command/create-credential-group.command.use-case';
import { CredentialGroupUseCaseModule } from 'src/application/use-cases/credential-group/credential-group.use-case';
import { AccessTokenPayloadType } from 'src/domain/types/auth/access-token-payload.type';
import { CurrentAccount } from 'src/presentation/decorators/current-account.decorator';
import { SkipAccessToken } from 'src/presentation/decorators/skip-access-token.decorator';

@ApiBearerAuth()
@Controller('credential-groups')
export class CredentialGroupController {
  public constructor(
    private readonly createCredentialGroupCommandUseCase: CreateCredentialGroupCommandUseCase,
  ) {}

  @Post()
  public async create(
    @Body() body: CreateCredentialGroupRequestBodyDto,
    @CurrentAccount() account: AccessTokenPayloadType,
  ): Promise<CreateCredentialGroupResponseDto> {
    return this.createCredentialGroupCommandUseCase.execute(
      account.accountId,
      body,
    );
  }
}
