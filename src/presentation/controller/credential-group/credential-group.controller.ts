import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCredentialGroupRequestBodyDto } from 'src/application/dto/credential-group/request/create-credential-group.request.body.dto';
import { UpdateCredentialGroupRequestBodyDto } from 'src/application/dto/credential-group/request/update-credential-group.request.body.dto';
import { CreateCredentialGroupResponseDto } from 'src/application/dto/credential-group/response/create-credential-group.response.dto';
import { UpdateCredentialGroupResponseDto } from 'src/application/dto/credential-group/response/update-credential-group.response.dto';
import { DeleteCredentialGroupResponseDto } from 'src/application/dto/credential-group/response/delete-credential-group.response.dto';
import { GetAllCredentialGroupsResponseDto } from 'src/application/dto/credential-group/response/get-all-credential-groups.response.dto';
import { CreateCredentialGroupCommandUseCase } from 'src/application/use-cases/credential-group/command/create-credential-group.command.use-case';
import { UpdateCredentialGroupCommandUseCase } from 'src/application/use-cases/credential-group/command/update-credential-group.command.use-case';
import { DeleteCredentialGroupCommandUseCase } from 'src/application/use-cases/credential-group/command/delete-credential-group.command.use-case';
import { GetAllCredentialGroupsQueryUseCase } from 'src/application/use-cases/credential-group/query/get-all-credential-groups.query.use-case';
import type { AccessTokenPayloadType } from 'src/domain/types/auth/access-token-payload.type';
import { CurrentAccount } from 'src/presentation/decorators/current-account.decorator';

@ApiBearerAuth()
@Controller('credential-groups')
export class CredentialGroupController {
  public constructor(
    private readonly createCredentialGroupCommandUseCase: CreateCredentialGroupCommandUseCase,
    private readonly updateCredentialGroupCommandUseCase: UpdateCredentialGroupCommandUseCase,
    private readonly deleteCredentialGroupCommandUseCase: DeleteCredentialGroupCommandUseCase,
    private readonly getAllCredentialGroupsQueryUseCase: GetAllCredentialGroupsQueryUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new credential group' })
  @ApiOkResponse({
    description: 'Credential group created successfully',
    type: CreateCredentialGroupResponseDto,
  })
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

  @ApiOperation({ summary: 'Get all credential groups for the current user' })
  @ApiOkResponse({
    description: 'List of credential groups retrieved successfully',
    type: GetAllCredentialGroupsResponseDto,
  })
  @Get()
  public async getAll(
    @CurrentAccount() account: AccessTokenPayloadType,
  ): Promise<GetAllCredentialGroupsResponseDto> {
    return this.getAllCredentialGroupsQueryUseCase.execute(account.accountId);
  }

  @ApiOperation({ summary: 'Update a credential group' })
  @ApiOkResponse({
    description: 'Credential group updated successfully',
    type: UpdateCredentialGroupResponseDto,
  })
  @Put(':id')
  public async update(
    @Param('id') credentialGroupId: string,
    @Body() body: UpdateCredentialGroupRequestBodyDto,
    @CurrentAccount() account: AccessTokenPayloadType,
  ): Promise<UpdateCredentialGroupResponseDto> {
    return this.updateCredentialGroupCommandUseCase.execute(
      credentialGroupId,
      account.accountId,
      body,
    );
  }

  @ApiOperation({ summary: 'Delete a credential group' })
  @ApiOkResponse({
    description: 'Credential group deleted successfully',
    type: DeleteCredentialGroupResponseDto,
  })
  @Delete(':id')
  public async delete(
    @Param('id') credentialGroupId: string,
    @CurrentAccount() account: AccessTokenPayloadType,
  ): Promise<DeleteCredentialGroupResponseDto> {
    return this.deleteCredentialGroupCommandUseCase.execute(
      credentialGroupId,
      account.accountId,
    );
  }
}
