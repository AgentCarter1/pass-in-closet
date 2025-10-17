import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateCredentialRequestBodyDto } from 'src/application/dto/credential/request/create-credential.request.body.dto';
import { UpdateCredentialRequestBodyDto } from 'src/application/dto/credential/request/update-credential.request.body.dto';
import { CreateCredentialResponseDto } from 'src/application/dto/credential/response/create-credential.response.dto';
import { UpdateCredentialResponseDto } from 'src/application/dto/credential/response/update-credential.response.dto';
import { DeleteCredentialResponseDto } from 'src/application/dto/credential/response/delete-credential.response.dto';
import { GetAllCredentialsResponseDto } from 'src/application/dto/credential/response/get-all-credentials.response.dto';
import { CreateCredentialCommandUseCase } from 'src/application/use-cases/credential/command/create-credential.command.use-case';
import { UpdateCredentialCommandUseCase } from 'src/application/use-cases/credential/command/update-credential.command.use-case';
import { DeleteCredentialCommandUseCase } from 'src/application/use-cases/credential/command/delete-credential.command.use-case';
import { GetAllCredentialsQueryUseCase } from 'src/application/use-cases/credential/query/get-all-credentials.query.use-case';
import type { AccessTokenPayloadType } from 'src/domain/types/auth/access-token-payload.type';
import { CurrentAccount } from 'src/presentation/decorators/current-account.decorator';

@ApiBearerAuth()
@Controller('credentials')
export class CredentialController {
  public constructor(
    private readonly createCredentialCommandUseCase: CreateCredentialCommandUseCase,
    private readonly updateCredentialCommandUseCase: UpdateCredentialCommandUseCase,
    private readonly deleteCredentialCommandUseCase: DeleteCredentialCommandUseCase,
    private readonly getAllCredentialsQueryUseCase: GetAllCredentialsQueryUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new credential' })
  @ApiOkResponse({
    description: 'Credential created successfully',
    type: CreateCredentialResponseDto,
  })
  @Post()
  public async create(
    @Body() body: CreateCredentialRequestBodyDto,
    @CurrentAccount() account: AccessTokenPayloadType,
  ): Promise<CreateCredentialResponseDto> {
    return this.createCredentialCommandUseCase.execute(account.accountId, body);
  }

  @ApiOperation({ summary: 'Get all credentials for a credential group' })
  @ApiOkResponse({
    description: 'List of credentials retrieved successfully',
    type: GetAllCredentialsResponseDto,
  })
  @ApiQuery({
    name: 'credentialGroupId',
    description: 'Credential Group ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Get()
  public async getAll(
    @Query('credentialGroupId') credentialGroupId: string,
    @CurrentAccount() account: AccessTokenPayloadType,
  ): Promise<GetAllCredentialsResponseDto> {
    return this.getAllCredentialsQueryUseCase.execute(
      account.accountId,
      credentialGroupId,
    );
  }

  @ApiOperation({ summary: 'Update a credential' })
  @ApiOkResponse({
    description: 'Credential updated successfully',
    type: UpdateCredentialResponseDto,
  })
  @Put(':id')
  public async update(
    @Param('id') credentialId: string,
    @Body() body: UpdateCredentialRequestBodyDto,
    @CurrentAccount() account: AccessTokenPayloadType,
  ): Promise<UpdateCredentialResponseDto> {
    return this.updateCredentialCommandUseCase.execute(
      credentialId,
      account.accountId,
      body,
    );
  }

  @ApiOperation({ summary: 'Delete a credential' })
  @ApiOkResponse({
    description: 'Credential deleted successfully',
    type: DeleteCredentialResponseDto,
  })
  @Delete(':id')
  public async delete(
    @Param('id') credentialId: string,
    @CurrentAccount() account: AccessTokenPayloadType,
  ): Promise<DeleteCredentialResponseDto> {
    return this.deleteCredentialCommandUseCase.execute(
      credentialId,
      account.accountId,
    );
  }
}
