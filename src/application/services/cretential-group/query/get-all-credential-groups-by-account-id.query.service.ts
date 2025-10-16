import { Injectable, Inject } from '@nestjs/common';
import { ICredentialGroupsRepository } from 'src/domain/repositories/credential-groups.repository.interface';
import { CredentialGroupModel } from 'src/domain/models/credential-group.model';

@Injectable()
export class GetAllCredentialGroupsByAccountIdQueryService {
  public constructor(
    @Inject(ICredentialGroupsRepository)
    public readonly credentialGroupsRepository: ICredentialGroupsRepository,
  ) {}

  public async execute(accountId: string): Promise<CredentialGroupModel[]> {
    // Get credential group IDs that belong to the account
    const query = `
      SELECT cg.* FROM credential_groups cg
      INNER JOIN account_has_credential_groups ahcg ON cg.id = ahcg.credential_group_id
      WHERE ahcg.account_id = $1 AND cg.deleted_at IS NULL
    `;

    const result = await this.credentialGroupsRepository.query(query, [
      accountId,
    ]);

    // Convert to CredentialGroupModel
    return result.map(
      (row: any) =>
        new CredentialGroupModel({
          id: row.id,
          name: row.name,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          deletedAt: row.deleted_at,
        }),
    );
  }
}
