import { Injectable } from '@nestjs/common';
import {
  GetAllCredentialGroupsResponseDto,
  CredentialGroupItemDto,
} from 'src/application/dto/credential-group/response/get-all-credential-groups.response.dto';
import { GetAllCredentialGroupsByAccountIdQueryService } from 'src/application/services/cretential-group/query/get-all-credential-groups-by-account-id.query.service';

@Injectable()
export class GetAllCredentialGroupsQueryUseCase {
  public constructor(
    private readonly getAllCredentialGroupsByAccountIdQueryService: GetAllCredentialGroupsByAccountIdQueryService,
  ) {}

  public async execute(
    accountId: string,
  ): Promise<GetAllCredentialGroupsResponseDto> {
    const credentialGroups =
      await this.getAllCredentialGroupsByAccountIdQueryService.execute(
        accountId,
      );

    const credentialGroupItems: CredentialGroupItemDto[] = credentialGroups.map(
      (group) =>
        new CredentialGroupItemDto({
          id: group.id!,
          name: group.name!,
          createdAt: group.createdAt!,
          updatedAt: group.updatedAt!,
        }),
    );

    return new GetAllCredentialGroupsResponseDto({
      credentialGroups: credentialGroupItems,
      count: credentialGroupItems.length,
    });
  }
}
