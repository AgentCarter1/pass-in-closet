import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import {
  GetAllCredentialsResponseDto,
  CredentialItemDto,
} from 'src/application/dto/credential/response/get-all-credentials.response.dto';
import { GetAllCredentialsByCredentialGroupIdQueryService } from 'src/application/services/credentials/query/get-all-credentials-by-credential-group-id.query.service';
import { GetOneCredentialGroupByFilterQueryService } from 'src/application/services/cretential-group/query/get-one-credential-group-by-filter.query.service';
import { GetAccountHasCredentialGroupByFilterQueryService } from 'src/application/services/account/query/account-has-credential-group/get-account-has-credential-group-by-filter.query.service';

@Injectable()
export class GetAllCredentialsQueryUseCase {
  public constructor(
    private readonly getAllCredentialsByCredentialGroupIdQueryService: GetAllCredentialsByCredentialGroupIdQueryService,
    private readonly getOneCredentialGroupByFilterQueryService: GetOneCredentialGroupByFilterQueryService,
    private readonly getAccountHasCredentialGroupByFilterQueryService: GetAccountHasCredentialGroupByFilterQueryService,
  ) {}

  public async execute(
    accountId: string,
    credentialGroupId: string,
  ): Promise<GetAllCredentialsResponseDto> {
    // Check if credential group exists
    const credentialGroup =
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
        'You do not have permission to view credentials in this group',
      );
    }

    const credentials =
      await this.getAllCredentialsByCredentialGroupIdQueryService.execute(
        credentialGroupId,
      );

    const credentialItems: CredentialItemDto[] = credentials.map(
      (credential) =>
        new CredentialItemDto({
          id: credential.id!,
          name: credential.name!,
          link: credential.link!,
          email: credential.email!,
          credentialGroupId: credential.credentialGroupId!,
          createdAt: credential.createdAt!,
          updatedAt: credential.updatedAt!,
        }),
    );

    return new GetAllCredentialsResponseDto({
      credentials: credentialItems,
      count: credentialItems.length,
    });
  }
}
